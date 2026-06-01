import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "INTERA - Internship & Research Program",
  description: "Gain real industry experience and build your future career",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className={`
          ${inter.className}
          min-h-screen flex flex-col
          bg-white text-black
          dark:bg-zinc-950 dark:text-white
          transition-colors duration-300
        `}
      >
        {/* 💡 Cukup biarkan children berdiri sendiri seperti ini! */}
        {children}
      </body>
    </html>
  );
}