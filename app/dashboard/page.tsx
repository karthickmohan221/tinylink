import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardSnapshotView from "@/components/features/analytics/DashboardSnapshotView";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View your TinyLink dashboard snapshot with saved link totals, click performance, and recent activity.",
  alternates: {
    canonical: "/dashboard",
  },
  openGraph: {
    title: "TinyLink Dashboard | Snapshot and Link Analytics",
    description:
      "Review your TinyLink snapshot, saved links, click totals, and most recent activity.",
    url: "/dashboard",
  },
  robots: {
    index: false,
    follow: false,
  },
};

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
