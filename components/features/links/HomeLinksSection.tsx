"use client";

import { useState } from "react";
import useSWR from "swr";
import CreateLinkCard from "./CreateLinkCard";
import LinksTable from "./LinksTable";
import QrModal from "./QrModal";
import type { LinkRecord } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";

export default function HomeLinksSection() {
  const { token, isLoading: isAuthLoading } = useAuth();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const [qrCode, setQrCode] = useState<string | null>(null);

  const fetcher = ([url, authToken]: [string, string]) => {
    const headers: HeadersInit = {
      Authorization: `Bearer ${authToken}`,
    };
    return fetch(url, { headers }).then((res) => {
      if (!res.ok) {
        throw new Error(
          res.status === 401 ? "Please sign in" : "Failed to load links",
        );
      }
      return res.json();
    });
  };

  const { data, error, isLoading, mutate } = useSWR<{ links: LinkRecord[] }>(
    !isAuthLoading && token ? ["/api/links", token] : null,
    fetcher,
  );

  const links = data?.links ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-14 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-medium text-blue-700">
          🚀 TinyLink Platform
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Create short links
          <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            and track them instantly
          </span>
        </h1>

        {/* Description */}
        <p className="mt-5 mx-auto max-w-2xl text-base leading-7 text-slate-600">
          Shorten long URLs, generate QR codes, and monitor click analytics from
          one clean dashboard.
        </p>
      </div>

      <div className="w-full">
        <CreateLinkCard
          mutate={mutate}
          onCreated={(link) => setQrCode(link.code)}
        />
      </div>

      {!token && !isAuthLoading && (
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Sign in to load your created links table and private analytics.
        </div>
      )}

      {token && (
        <div className="mt-8">
          <LinksTable
            links={links}
            baseUrl={baseUrl}
            isLoading={isLoading}
            error={error}
            mutate={mutate}
            setQrCode={setQrCode}
          />
        </div>
      )}

      <QrModal
        qrCode={qrCode}
        baseUrl={baseUrl}
        onClose={() => setQrCode(null)}
      />
    </section>
  );
}
