import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartFarmGH - Intelligent Farming Solutions for Ghana",
  description: "AI-powered farming assistant and knowledge platform for Ghanaian farmers",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#2e7d32",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased soil-texture"
      >
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
