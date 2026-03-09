import { useMemo } from "react";
import { fromNow } from "@/lib/format";
import type { LinkRecord } from "@/lib/types";
import { BarChart3, Link2, Clock, TrendingUp } from "lucide-react";

export default function SnapshotCard({ links }: { links: LinkRecord[] }) {
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const averageClicks = links.length ? Math.round(totalClicks / links.length) : 0;

  const recent = useMemo(() => {
    if (!links.length) return undefined;
    return [...links].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  }, [links]);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 shadow-xl">
      <h3 className="text-lg font-medium text-white/80 mb-4">Dashboard Snapshot</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-white/60 mb-1">
            <Link2 className="w-4 h-4" />
            <span className="text-sm">Total Links</span>
          </div>
          <p className="text-3xl font-bold">{links.length}</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-white/60 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">Total Clicks</span>
          </div>
          <p className="text-3xl font-bold">{totalClicks}</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-white/60 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Avg. Clicks</span>
          </div>
          <p className="text-3xl font-bold">{averageClicks}</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-white/60 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Click Rate</span>
          </div>
          <p className="text-3xl font-bold">
            {links.length ? Math.round((totalClicks / links.length) * 100) : 0}%
          </p>
        </div>
      </div>

      {recent && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-white/60 mb-2">Most recent link</p>
          <div className="bg-blue-600/30 rounded-lg p-3">
            <p className="font-mono text-sm truncate">{recent.code}</p>
            <p className="text-xs text-white/60 mt-1">
              {recent.lastClicked ? `Last clicked ${fromNow(recent.lastClicked)}` : "No clicks yet"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}