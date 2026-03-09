"use client";

import { useState } from "react";
import { CODE_REGEX } from "@/lib/validation";
import { QrCode, Link, Sparkles } from "lucide-react";

interface Props {
  mutate: () => void;
}

export default function CreateLinkCard({ mutate }: Props) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

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

    if (code && !CODE_REGEX.test(code)) {
      setError("Codes must be 6-8 letters or numbers");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, code: code || undefined }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Unable to create link");
      return;
    }

    setUrl("");
    setCode("");
    mutate();
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
        <h2 className="text-xl font-semibold text-gray-900">Create Short Link</h2>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom back-half (optional)
          </label>
          <div className="flex items-center">
            <span className="bg-gray-100 text-gray-600 px-3 py-3 border border-r-0 border-gray-300 rounded-l-xl">
              {process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, '')}/
            </span>
            <input
              type="text"
              placeholder="custom-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            "Creating..."
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Create short link
            </>
          )}
        </button>

        <div className="text-xs text-gray-500 text-center">
          Sign up for free. Your free plan includes:
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