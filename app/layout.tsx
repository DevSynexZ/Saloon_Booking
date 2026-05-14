import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers"; // We will create this file

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});

export const metadata: Metadata = {
  title: "Signature Salon | High-End Grooming in Bashundhara",
  description: "Book your premium haircut and body care at Signature Salon. Specialized grooming for the modern man.",
  keywords: ["Salon Bashundhara", "Haircut Dhaka", "Signature Salon Booking"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#f5efe0] text-zinc-900 antialiased`}>
       
       <Providers>{children}</Providers> 
        {/* Sonner Toaster for "Booking Confirmed" or "Error" messages */}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}