import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "THREADLY — Your Perfect Fit, Without Leaving Home",
  description:
    "Book a professional tailor, schedule a doorstep measurement, hand over your fabric and track every stitch until your finished garment reaches your door.",
  keywords: [
    "tailoring",
    "doorstep tailor",
    "custom stitch",
    "on-demand tailoring",
    "kurta stitching",
    "shirt tailoring",
    "Threadly",
  ],
  authors: [{ name: "Mohammad Sakib Ahmad" }],
  openGraph: {
    title: "THREADLY — Your Perfect Fit, Without Leaving Home",
    description:
      "Premium on-demand tailoring. Doorstep measurement. Real-time tracking. AI style recommendation.",
    type: "website",
    siteName: "Threadly",
  },
  twitter: {
    card: "summary_large_image",
    title: "THREADLY — Your Perfect Fit, Without Leaving Home",
    description: "Premium on-demand tailoring platform",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0E0C0A" },
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[var(--primary)] selection:text-white" suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
