// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AdBlockerDetector from "@/components/features/ads/AdBlockerDetector";
import { AuthProvider } from "@/hooks/useAuth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TinyLink | URL Shortener, QR Codes, and Link Analytics",
    template: "%s | TinyLink",
  },
  description:
    "TinyLink helps you create short links, generate QR codes, and track click analytics with a user-based dashboard.",
  keywords: [
    "URL shortener",
    "short links",
    "QR code generator",
    "link analytics",
    "click tracking",
    "TinyLink",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "TinyLink | URL Shortener, QR Codes, and Link Analytics",
    description:
      "Create short links, generate QR codes, and track click activity from a focused TinyLink dashboard.",
    siteName: "TinyLink",
  },
  twitter: {
    card: "summary_large_image",
    title: "TinyLink | URL Shortener, QR Codes, and Link Analytics",
    description:
      "Create short links, generate QR codes, and track click activity from a focused TinyLink dashboard.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TinyLink",
    url: siteUrl,
    description:
      "TinyLink is a URL shortener with QR code generation, click tracking, and user-based dashboard analytics.",
  };

  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <AdBlockerDetector />
        </AuthProvider>
      </body>
    </html>
  );
}
