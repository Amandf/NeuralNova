#  AI Career Coach – Full Stack SaaS Application

An AI-powered career development platform built using modern full-stack technologies.  
This application helps users generate industry insights, mock interviews, and ATS-optimized resumes using AI.

---

## 🌟 Features

### 🔐 Authentication
- Secure login/signup using Clerk
- Session management
- Protected routes

### 📊 Industry Insights
- AI-generated industry trends
- Salary range analysis
- Skill demand tracking
- Weekly automated updates using background jobs

### 📄 AI Resume Builder
- Structured resume form
- AI-powered content enhancement
- ATS-friendly bullet points
- Live preview
- PDF export

### 🎤 Mock Interview Generator
- Dynamic AI-generated interview questions
- Role & experience-based difficulty
- Auto scoring
- Personalized AI feedback
- Performance history tracking

---

## 🏗️ Architecture Overview

User → Next.js Frontend → API Routes →  
Gemini AI + Inngest (Background Jobs) → Prisma ORM → PostgreSQL Database  

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Zod
- Recharts

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL

### AI Integration
- Google Gemini API

### Background Processing
- Inngest (Event-driven workflows & cron jobs)

### Authentication
- Clerk

---

## ⚙️ Key Concepts Implemented

- AI-powered dynamic content generation
- Event-driven architecture
- Background job scheduling
- Database caching for performance optimization
- Serverless-compatible design
- Modular system design

---

## 📂 Project Structure
