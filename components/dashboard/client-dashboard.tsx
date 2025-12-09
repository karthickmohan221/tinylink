"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { CODE_REGEX } from "@/lib/validation";
import type { LinkRecord } from "@/lib/types";
import { fromNow } from "@/lib/format";

type Sort = "recent" | "clicks";

interface CreatePayload {
  url: string;
  code?: string;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to load links");
    return res.json();
  });

export default function ClientDashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("recent");
  const [flash, setFlash] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  const { data, error, isLoading, mutate } = useSWR<{ links: LinkRecord[] }>(
    "/api/links",
    fetcher
  );

  const links = useMemo(() => data?.links ?? [], [data]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let next = links;

    if (term) {
      next = links.filter(
        (link) =>
          link.code.toLowerCase().includes(term) ||
          link.url.toLowerCase().includes(term)
      );
    }

    if (sort === "clicks") {
      return [...next].sort((a, b) => b.clicks - a.clicks);
    }

    return [...next].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [links, search, sort]);

  async function handleCreate(payload: CreatePayload) {
    setFlash(null);

    const response = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.json();
      setFlash({
        type: "error",
        text: body?.error ?? "Unable to create link",
      });
      throw new Error(body?.error ?? "Unable to create link");
    }

    setFlash({ type: "success", text: "Link created successfully" });
    await mutate();
  }

  async function handleDelete(code: string) {
    if (!confirm(`Delete short link "${code}"?`)) return;

    setFlash(null);

    const response = await fetch(`/api/links/${code}`, { method: "DELETE" });
    if (!response.ok) {
      const body = await response.json();
      setFlash({
        type: "error",
        text: body?.error ?? "Unable to delete link",
      });
      return;
    }
    setFlash({ type: "success", text: `Deleted ${code}` });
    await mutate();
  }

  function copyLink(shortCode: string) {
    const value = baseUrl ? `${baseUrl}/${shortCode}` : `/${shortCode}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).then(
        () => {
          setFlash({ type: "success", text: "Copied to clipboard" });
        },
        () => {
          setFlash({ type: "error", text: "Unable to copy right now" });
        }
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              TinyLink
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900">
              Smarter short links
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-500">
              Generate branded short URLs, keep track of engagement, and stay on
              top of link health — all from a single dashboard.
            </p>
          </div>
          <Link
            href="https://github.com/karthickmohan221/tinylink"
            target="_blank"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-slate-400 hover:text-slate-900"
          >
            View repo
          </Link>
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
        <section className="grid gap-6 lg:grid-cols-[1fr,1.2fr]">
          <CreateLinkCard onCreate={handleCreate} />
          <SnapshotCard links={links} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by shortcode or target URL"
                  className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus:border-slate-400 focus:bg-white focus:outline-none"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex rounded-full border border-slate-200 p-1 text-xs font-medium text-slate-500">
                <button
                  type="button"
                  onClick={() => setSort("recent")}
                  className={`rounded-full px-3 py-1 ${
                    sort === "recent"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500"
                  }`}
                >
                  Newest
                </button>
                <button
                  type="button"
                  onClick={() => setSort("clicks")}
                  className={`rounded-full px-3 py-1 ${
                    sort === "clicks"
                      ? "bg-slate-900 text-white"
                      : "text-slate-500"
                  }`}
                >
                  Top clicks
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => mutate()}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Refresh
              </button>
              {/* <Link
                href="/healthz"
                className="text-sm font-medium text-slate-500 hover:text-slate-900"
                target="_blank"
              >
                Health check
              </Link> */}
            </div>
          </div>

          <div className="p-6">
            {flash && flash.text && (
              <div
                className={`mb-4 rounded-xl border px-4 py-3 text-sm ${
                  flash.type === "error"
                    ? "border-rose-200 bg-rose-50 text-rose-600"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {flash.text}
              </div>
            )}

            {error && (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-600">
                {error.message}
              </p>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-2 font-semibold">Short code</th>
                    <th className="px-4 py-2 font-semibold">Target URL</th>
                    <th className="px-4 py-2 font-semibold">Clicks</th>
                    <th className="px-4 py-2 font-semibold">Last clicked</th>
                    <th className="px-4 py-2 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && <TableMessage message="Loading links..." />}
                  {!isLoading && filtered.length === 0 && (
                    <TableMessage
                      message={`No links ${search ? "match" : "yet"}`}
                    />
                  )}
                  {filtered.map((link) => (
                    <tr
                      key={link.code}
                      className="border-t border-slate-100 text-slate-900"
                    >
                      <td className="px-4 py-4 font-mono text-sm">
                        {link.code}
                      </td>
                      <td className="px-4 py-4 text-slate-500">
                        <span className="line-clamp-2">{link.url}</span>
                      </td>
                      <td className="px-4 py-4 font-semibold">
                        {link.clicks}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-500">
                        {link.lastClicked
                          ? fromNow(link.lastClicked)
                          : "Never"}
                      </td>
                      <td className="px-4 py-4 text-right text-xs font-medium text-slate-500">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => copyLink(link.code)}
                            className="rounded-full border border-slate-200 px-3 py-1 text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                          >
                            Copy
                          </button>
                          <Link
                            href={`/code/${link.code}`}
                            className="rounded-full border border-slate-200 px-3 py-1 text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                          >
                            Stats
                          </Link>
                          <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/${link.code}`}
                            className="rounded-full border border-slate-200 px-3 py-1 text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                          >
                            Test
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(link.code)}
                            className="rounded-full border border-rose-200 px-3 py-1 text-rose-600 transition hover:border-rose-400"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

interface CreateCardProps {
  onCreate: (payload: CreatePayload) => Promise<void>;
}

function CreateLinkCard({ onCreate }: CreateCardProps) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!url) {
      setError("URL is required");
      return;
    }

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    if (code && !CODE_REGEX.test(code)) {
      setError("Codes must be 6-8 letters or numbers");
      return;
    }

    setLoading(true);
    try {
      await onCreate({ url, code: code || undefined });
      setUrl("");
      setCode("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Create link
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Shorten a URL
          </h2>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <label className="text-sm font-medium text-slate-600">
          Destination URL
          <input
            type="url"
            required
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com/docs"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-slate-400 focus:bg-white focus:outline-none"
          />
        </label>
        <label className="text-sm font-medium text-slate-600">
          Custom code (optional)
          <input
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="6-8 letters or numbers"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-slate-400 focus:bg-white focus:outline-none"
          />
        </label>
        {error && <p className="text-sm text-rose-600">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create short link"}
      </button>
    </form>
  );
}

function SnapshotCard({ links }: { links: LinkRecord[] }) {
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  const recent = useMemo(() => {
    if (!links.length) return undefined;
    return [...links].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  }, [links]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-900 px-6 py-8 text-white shadow-lg">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
        Overview
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-300">Total links</p>
          <p className="mt-2 text-4xl font-semibold">{links.length}</p>
        </div>
        <div>
          <p className="text-sm text-slate-300">Total clicks</p>
          <p className="mt-2 text-4xl font-semibold">{totalClicks}</p>
        </div>
      </div>
      {recent ? (
        <div className="mt-8 rounded-2xl bg-white/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-200">
            Most recent
          </p>
          <p className="mt-2 font-mono text-lg">{recent.code}</p>
          <p className="line-clamp-2 text-sm text-slate-200">{recent.url}</p>
          <p className="mt-2 text-xs text-slate-300">
            Last clicked{" "}
            {recent.lastClicked ? fromNow(recent.lastClicked) : "Never"}
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-300">
          Create your first link to populate analytics.
        </p>
      )}
    </div>
  );
}

function TableMessage({ message }: { message: string }) {
  return (
    <tr>
      <td
        colSpan={5}
        className="px-4 py-10 text-center text-sm text-slate-500"
      >
        {message}
      </td>
    </tr>
  );
}
