"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  usePathname();

  return (
    <footer className="bg-[#081B3A] text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-2xl font-bold text-white tracking-wide">
              TinyLink
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Short links, QR codes, and user-based analytics from one focused dashboard.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Explore</h4>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <Link href="/features" className="hover:text-white transition">Features</Link>
              <Link href="/docs" className="hover:text-white transition">Docs</Link>
              <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Legal</h4>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition">Terms of Use</Link>
              <Link href="/api/healthz" className="hover:text-white transition">Status</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-slate-500">
          &copy; 2026 TinyLink. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
