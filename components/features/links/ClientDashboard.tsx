"use client";

import { useState } from "react";
import useSWR from "swr";
import CreateLinkCard from "./CreateLinkCard";
import SnapshotCard from "../analytics/SnapshotCard";
import LinksTable from "./LinksTable";
import QrModal from "./QrModal";
import type { LinkRecord } from "@/lib/types";
import AdUnit from "../ads/AdUnit";
import InFeedAd from "../ads/InFeedAd";
import { useAuth } from "@/hooks/useAuth";

const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

const AD_SLOTS = {
  TOP_BANNER: process.env.NEXT_PUBLIC_ADSENSE_TOP_SLOT,
  BETWEEN_SECTIONS: process.env.NEXT_PUBLIC_ADSENSE_MIDDLE_SLOT,
  BOTTOM_BANNER: process.env.NEXT_PUBLIC_ADSENSE_BOTTOM_SLOT,
  IN_FEED: process.env.NEXT_PUBLIC_ADSENSE_FEED_SLOT,
};

export default function ClientDashboard() {
  const { token, isLoading: isAuthLoading } = useAuth();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const [qrCode, setQrCode] = useState<string | null>(null);

  const fetcher = ([url, authToken]: [string, string]) => {
    const headers: HeadersInit = {
      Authorization: `Bearer ${authToken}`,
    };
    return fetch(url, { headers }).then((res) => {
      if (!res.ok) throw new Error(res.status === 401 ? "Please sign in" : "Failed to load links");
      return res.json();
    });
  };

  const { data, error, isLoading, mutate } = useSWR<{ links: LinkRecord[] }>(
    !isAuthLoading && token ? ["/api/links", token] : null,
    fetcher
  );

  const links = data?.links ?? [];

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
            <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
            <div className="mt-4 h-4 w-72 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {ADS_ENABLED && AD_SLOTS.TOP_BANNER && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdUnit
            adSlot={AD_SLOTS.TOP_BANNER}
            adFormat="horizontal"
            className="my-6"
          />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr] mb-8">
          <CreateLinkCard mutate={mutate} />

          {ADS_ENABLED && AD_SLOTS.IN_FEED && (
            <InFeedAd adSlot={AD_SLOTS.IN_FEED} />
          )}
        </div>

        <LinksTable
          links={links}
          baseUrl={baseUrl}
          isLoading={isLoading}
          error={error}
          mutate={mutate}
          setQrCode={setQrCode}
        />

        <div className="my-6">
          <SnapshotCard links={links} />
        </div>

        {ADS_ENABLED && AD_SLOTS.BETWEEN_SECTIONS && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AdUnit
              adSlot={AD_SLOTS.BETWEEN_SECTIONS}
              adFormat="rectangle"
              className="my-8"
            />
          </div>
        )}
        {ADS_ENABLED && AD_SLOTS.BOTTOM_BANNER && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AdUnit
              adSlot={AD_SLOTS.BOTTOM_BANNER}
              adFormat="horizontal"
              className="my-8"
            />
          </div>
        )}
      </div>

      <QrModal
        qrCode={qrCode}
        baseUrl={baseUrl}
        onClose={() => setQrCode(null)}
      />
    </div>
  );
}
