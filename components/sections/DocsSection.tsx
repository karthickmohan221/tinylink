"use client";

import {
  BookOpen,
  ExternalLink,
  Link2,
  Shield,
  Sparkles,
  TerminalSquare,
} from "lucide-react";

const docs = [
  {
    icon: Link2,
    title: "Create a short link",
    body: "Paste a valid URL into the create form and submit. Signed-in users save the link directly to their dashboard.",
  },
  {
    icon: Sparkles,
    title: "Manage your dashboard",
    body: "Review your links table, copy a short URL, open a QR code, and track total clicks from the snapshot cards.",
  },
  {
    icon: Shield,
    title: "User-based access",
    body: "Link data is scoped to the authenticated user. Guests can browse the page, but creating links prompts login.",
  },
];

const setupSteps = [
  "Create an account with email and password, then sign in to unlock private dashboard data.",
  "Use the home page create form to submit a long URL and save the generated short link.",
  "Open the links table to copy, inspect, or delete links that belong to your account.",
  "Visit the dashboard page for a condensed snapshot of totals, clicks, and most recent link activity.",
];

const endpointRows = [
  { method: "POST", path: "/api/auth/signup", use: "Create an account and return an auth token." },
  { method: "POST", path: "/api/auth/login", use: "Authenticate an existing user and return an auth token." },
  { method: "GET", path: "/api/links", use: "Load the signed-in user's saved links." },
  { method: "POST", path: "/api/links", use: "Create a new short link for the authenticated user." },
  { method: "DELETE", path: "/api/links/:code", use: "Delete a saved short link owned by the authenticated user." },
  { method: "GET", path: "/api/healthz", use: "Basic uptime and app health check." },
];

export default function DocsSection() {
  return (
    <section id="docs" className="bg-slate-50 py-16 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Documentation
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              How TinyLink works
            </h2>
            <p className="mt-3 max-w-3xl text-base text-slate-600">
              TinyLink is a focused URL shortener with authentication, click tracking,
              QR code support, and per-user dashboards.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
            <BookOpen className="h-4 w-4 text-blue-600" />
            App guide
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {docs.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                <item.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <TerminalSquare className="h-5 w-5 text-slate-900" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Quick start</h3>
                <p className="text-sm text-slate-500">Typical app flow</p>
              </div>
            </div>

            <ol className="mt-6 space-y-4">
              {setupSteps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-6 text-slate-600">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Auth and access notes</h3>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
              <p>
                TinyLink uses token-based authentication for user-specific link APIs.
                The token is stored client-side after signup or login.
              </p>
              <p>
                Guest users can browse public pages and interact with the create form,
                but protected link actions require login and return unauthorized responses otherwise.
              </p>
              <p>
                The dashboard snapshot and links table both use the authenticated token to
                load only the current user's saved link records.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">API endpoints in this app</h3>
              <p className="mt-2 text-sm text-slate-600">
                Core routes exposed by TinyLink for auth, links, and health monitoring.
              </p>
            </div>
            <a
              href="/api/healthz"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Check health
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-3 pr-4 font-medium">Method</th>
                  <th className="py-3 pr-4 font-medium">Path</th>
                  <th className="py-3 font-medium">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {endpointRows.map((row) => (
                  <tr key={`${row.method}-${row.path}`}>
                    <td className="py-4 pr-4 font-semibold text-slate-900">{row.method}</td>
                    <td className="py-4 pr-4 font-mono text-blue-700">{row.path}</td>
                    <td className="py-4 text-slate-600">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
