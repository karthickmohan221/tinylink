import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeLinksSection from "@/components/features/links/HomeLinksSection";
import StatsSection from "@/components/sections/StatsSection";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Create short links from the TinyLink home page and manage saved links with user-based access and click tracking.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TinyLink Home | Create Short Links and Manage URLs",
    description:
      "Use TinyLink to create short links, manage saved URLs, and access link analytics.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-slate-50 pt-[80px]">
        <HomeLinksSection />
        <StatsSection />
      </main>
      <Footer />
    </>
  );
}
