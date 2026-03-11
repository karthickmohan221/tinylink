"use client";

import useSWR from "swr";
import SnapshotCard from "./SnapshotCard";
import type { LinkRecord } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardSnapshotView() {
  const { token, isLoading: isAuthLoading } = useAuth();

  const fetcher = ([url, authToken]: [string, string]) => {
    const headers: HeadersInit = {
      Authorization: `Bearer ${authToken}`,
    };
    return fetch(url, { headers }).then((res) => {
      if (!res.ok) {
        throw new Error(res.status === 401 ? "Please sign in" : "Failed to load snapshot");
      }
      return res.json();
    });
  };

  const { data, error, isLoading } = useSWR<{ links: LinkRecord[] }>(
    !isAuthLoading && token ? ["/api/links", token] : null,
    fetcher
  );
  const links = data?.links ?? [];
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const latestLink = links.length
    ? [...links].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0]
    : null;
  const topLink = links.length
    ? [...links].sort((a, b) => b.clicks - a.clicks)[0]
    : null;

  if (isAuthLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
          <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-4 w-72 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Dashboard
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950">
            Sign in to view your snapshot.
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Your dashboard summary is available after login and only includes your own links.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Latest activity</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {latestLink ? `Newest link: ${latestLink.code}` : "No links created yet"}
            </p>
          </div>
          <div className="rounded-2xl bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700">
            {links.length} saved
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
              Total clicks
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {totalClicks} tracked clicks across your saved links.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
              Top performer
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {topLink ? `${topLink.code} leads with ${topLink.clicks} clicks.` : "Create a link to start measuring performance."}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
              Last click
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {latestLink?.lastClicked ? new Date(latestLink.lastClicked).toLocaleString() : "No click activity recorded yet."}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          Dashboard
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">
          Snapshot
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          A quick view of your links, clicks, and most recent activity.
        </p>
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          Failed to load your dashboard snapshot.
        </div>
      ) : isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
          <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-4 w-72 animate-pulse rounded bg-slate-100" />
        </div>
      ) : (
        <SnapshotCard links={links} />
      )}
    </div>
  );
}
