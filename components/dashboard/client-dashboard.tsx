"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import CreateLinkCard from "./create-link-card";
import SnapshotCard from "./snapshot-card";
import LinksTable from "./links-table";
import QrModal from "./qr-modal";
import type { LinkRecord } from "@/lib/types";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import UseCasesSection from "./UseCasesSection";
import TestimonialsSection from "./TestimonialsSection";
import StatsSection from "./StatsSection";
import AdUnit from "../ads/AdUnit";
import InFeedAd from "../ads/InFeedAd";

// Updated AdUnit component with env vars
const AD_SLOTS = {
  TOP_BANNER: process.env.NEXT_PUBLIC_ADSENSE_TOP_SLOT || "1234567890",
  BETWEEN_SECTIONS: process.env.NEXT_PUBLIC_ADSENSE_MIDDLE_SLOT || "1234567891",
  BOTTOM_BANNER: process.env.NEXT_PUBLIC_ADSENSE_BOTTOM_SLOT || "1234567892",
  IN_FEED: process.env.NEXT_PUBLIC_ADSENSE_FEED_SLOT || "1234567893",
};

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to load links");
    return res.json();
  });

export default function ClientDashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const [qrCode, setQrCode] = useState<string | null>(null);
  const { data, error, isLoading, mutate } = useSWR<{ links: LinkRecord[] }>(
    "/api/links",
    fetcher
  );

  const links = useMemo(() => data?.links ?? [], [data]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdUnit
          adSlot={AD_SLOTS.TOP_BANNER} 
          adFormat="horizontal"
          className="my-6"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr] mb-8">
          <CreateLinkCard mutate={mutate} />
          <SnapshotCard links={links} />
        </div>

        <div className="my-6">
          <InFeedAd adSlot={AD_SLOTS.IN_FEED} />
        </div>

        <LinksTable
          links={links}
          baseUrl={baseUrl}
          isLoading={isLoading}
          error={error}
          mutate={mutate}
          setQrCode={setQrCode}
        />
      </div>

      {/* Middle Banner Ad */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdUnit 
          adSlot={AD_SLOTS.BETWEEN_SECTIONS} 
          adFormat="rectangle"
          className="my-8"
        />
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Bottom Banner Ad */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdUnit 
          adSlot={AD_SLOTS.BOTTOM_BANNER} 
          adFormat="horizontal"
          className="my-8"
        />
      </div>

      {/* Footer with ads */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">TinyLink</h4>
              <p className="text-gray-400 text-sm">
                Shorten URLs, track clicks, and manage your links easily.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">support@tinylink.com</p>
            </div>
          </div>
        </div>
      </footer>

      <QrModal
        qrCode={qrCode}
        baseUrl={baseUrl}
        onClose={() => setQrCode(null)}
      />
    </div>
  );
}