// app/layout.tsx
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// const poppins = Poppins({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Wonderhub | Web & Mobile Design Studio",
  description:
    "Premium web and mobile design agency crafting exceptional digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <Analytics />
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
