import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roamwise — Adaptive AI Travel Agent",
  description: "An AI travel agent that plans your journey and adapts when real-world plans change.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-background text-foreground antialiased selection:bg-teal-500/20 selection:text-teal-900`}>
        {children}
      </body>
    </html>
  );
}
