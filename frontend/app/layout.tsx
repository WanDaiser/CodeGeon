import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "CodeQuest",
  description: "A pixel art Python learning adventure.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pressStart.variable} font-sans`}>{children}</body>
    </html>
  );
}
