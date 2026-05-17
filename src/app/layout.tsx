import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AtomGoals AI | Organizational Intelligence",
  description: "From Goal Tracking to Organizational Intelligence. Built for AtomQuest 1.0.",
};

import { SmoothScroll } from "@/components/layout/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground bg-[url('/grain.png')] bg-blend-overlay">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
