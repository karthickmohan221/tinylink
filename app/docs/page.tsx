import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DocsSection from "@/components/sections/DocsSection";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Read TinyLink documentation covering auth, link creation, dashboard access, API routes, and QR code workflows.",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "TinyLink Docs | Setup, Auth, and API Guide",
    description:
      "Documentation for using TinyLink, including account access, link management, and API endpoints.",
    url: "/docs",
  },
};

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-[80px]">
        <DocsSection />
      </main>
      <Footer />
    </>
  );
}
