import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeLinksSection from "@/components/features/links/HomeLinksSection";
import StatsSection from "@/components/sections/StatsSection";

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
