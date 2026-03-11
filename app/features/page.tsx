import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeaturesSection from "@/components/sections/FeaturesSection";

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
