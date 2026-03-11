"use client";

import { useState } from "react";
import { Link, QrCode, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { LinkRecord } from "@/lib/types";

interface Props {
  mutate?: () => void;
  onCreated?: (link: LinkRecord) => void;
}

export default function CreateLinkCard({ mutate, onCreated }: Props) {
  const { token } = useAuth();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitMode, setSubmitMode] = useState<"link" | "qr">("link");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!token) {
      window.dispatchEvent(new Event("auth:open-login"));
      return;
    }

    if (!url) {
      setError("URL is required");
      return;
    }

    try {
      new URL(url);
    } catch {
      setError("Invalid URL");
      return;
    }

    setLoading(true);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await fetch("/api/links", {
      method: "POST",
      headers,
      body: JSON.stringify({ url }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Unable to create link");
      return;
    }

    const data = await res.json();
    setUrl("");
    mutate?.();
    if (submitMode === "qr" && data.link) {
      onCreated?.(data.link);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Link className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          Create Short Link
        </h2>
        <span className="ml-auto bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
          Free
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Long URL
          </label>
          <input
            type="url"
            placeholder="https://example.com/your-long-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="submit"
            disabled={loading}
            onClick={() => setSubmitMode("link")}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && submitMode === "link" ? (
              "Creating..."
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Create short link
              </>
            )}
          </button>

          <button
            type="submit"
            disabled={loading}
            onClick={() => setSubmitMode("qr")}
            className="w-full border border-slate-300 bg-white text-slate-900 font-semibold py-3 rounded-xl hover:border-slate-950 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && submitMode === "qr" ? (
              "Creating..."
            ) : (
              <>
                <QrCode className="w-5 h-5" />
                Create as QR
              </>
            )}
          </button>
        </div>

        {!token && (
          <p className="text-center text-xs text-slate-500">
            Sign in when you create a link to save it to your dashboard.
          </p>
        )}

        <div className="text-xs text-gray-500 text-center">
          Your free plan includes:
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1 text-gray-600">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Shorten links
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            QR Code generation
          </div>
      </div>
         </div>
    </form>
  );
}
