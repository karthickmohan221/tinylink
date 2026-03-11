import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeaturesSection from "@/components/sections/FeaturesSection";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore TinyLink features including short link creation, QR code generation, click tracking, and user-owned dashboard data.",
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "TinyLink Features | Short Links, QR Codes, and Analytics",
    description:
      "Learn how TinyLink handles short URLs, QR codes, click tracking, and private dashboard workflows.",
    url: "/features",
  },
};

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-[80px]">
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}
