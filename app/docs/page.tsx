import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DocsSection from "@/components/sections/DocsSection";

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
