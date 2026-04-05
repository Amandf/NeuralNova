import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Career Coach",
  description: "Generated to develop student career",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
     appearance={{
       basetheme: "dark",
     }}
    >
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

          {/*header */}
          <Header/>
          <main className="min-h-screen">{children}</main>
          {/* Footer */}
          <footer className="bg-muted/50 py-12">
            <div>
              <p>Made with ❤️ </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
