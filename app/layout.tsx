// app/layout.tsx
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html
      lang="en"
      className={cn("scroll-smooth", "font-sans", geist.variable)}
    >
      <Analytics />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "4px",
            fontSize: 12,
          },
        }}
      />

      <body className={poppins.className}>{children}</body>
    </html>
  );
}
