import { notFound } from "next/navigation";
import Link from "next/link";
import { getLink } from "@/lib/links";
import { formatDate, fromNow } from "@/lib/format";

export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ code: string }>;
}

export default async function CodeStatsPage({ params }: Params) {
  const { code } = await params;
  const link = await getLink(code);

  if (!link) {
    notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? process.env.BASE_URL ?? "";
  const shortUrl = baseUrl ? `${baseUrl}/${link.code}` : `/${link.code}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">
              TinyLink
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              Link Insights
            </h1>
          </div>
          <Link
            href="/"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
          >
            Back to dashboard
          </Link>
        </div>
      </header>
      <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Short link
            </span>
            <a
              href={shortUrl}
              className="text-3xl font-semibold text-slate-900"
              target="_blank"
              rel="noreferrer"
            >
              {shortUrl}
            </a>
            <p className="truncate text-sm text-slate-500">{link.url}</p>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total clicks</p>
            <p className="mt-2 text-4xl font-semibold text-slate-900">
              {link.clicks}
            </p>
            <p className="text-xs text-slate-400">
              Updated {fromNow(link.lastClicked)}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Last clicked</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {formatDate(link.lastClicked)}
            </p>
            <p className="text-xs text-slate-400">
              Created {formatDate(link.createdAt)}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

