"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId, sessionClaims } = await auth(); // ✅ Single auth() call
  if (!userId) throw new Error("Unauthorized");

  try {
    // ✅ Step 1: Check if industry exists BEFORE opening transaction
    let industryInsight = await db.industryInsight.findUnique({
      where: { industry: data.industry },
    });

    // ✅ Step 2: Call AI BEFORE opening transaction (slow operation)
    if (!industryInsight) {
      const insights = await generateAIInsights(data.industry);

      // ✅ Step 3: Now open transaction — only fast DB ops inside
      industryInsight = await db.industryInsight.create({
        data: {
          industry: data.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // ✅ Step 4: Update user (no transaction needed, single operation)
    const updatedUser = await db.user.upsert({
      where: { clerkUserId: userId },
      update: {
        industry: data.industry,
        experience: data.experience,
        bio: data.bio,
        skills: data.skills,
      },
      create: {
        clerkUserId: userId,
        email: sessionClaims?.email ?? "",
        name: sessionClaims?.fullName ?? "",
        industry: data.industry,
        experience: data.experience,
        bio: data.bio,
        skills: data.skills,
      },
    });

    revalidatePath("/");
    return updatedUser;

  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { industry: true },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}