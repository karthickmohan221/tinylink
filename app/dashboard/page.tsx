import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardSnapshotView from "@/components/features/analytics/DashboardSnapshotView";

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-[80px]">
        <DashboardSnapshotView />
      </main>
      <Footer />
    </>
  );
}
