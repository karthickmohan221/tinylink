import { fromNow } from "@/lib/format";
import type { LinkRecord } from "@/lib/types";
import TableMessage from "./table-message";
import { Copy, QrCode, Trash2, ExternalLink, BarChart2 } from "lucide-react";

interface Props {
  links: LinkRecord[];
  baseUrl: string;
  isLoading: boolean;
  error: Error | undefined;
  mutate: () => void;
  setQrCode: (code: string) => void;
}

export default function LinksTable({
  links,
  baseUrl,
  isLoading,
  error,
  mutate,
  setQrCode,
}: Props) {
  async function deleteLink(code: string) {
    if (confirm("Are you sure you want to delete this link?")) {
      await fetch(`/api/links/${code}`, { method: "DELETE" });
      mutate();
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Your Links</h3>
        <span className="text-sm text-gray-500">{links.length} total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Short Link</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Target URL</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Clicks</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Last Click</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && <TableMessage message="Loading your links..." />}
            {error && <TableMessage message="Failed to load links" />}
            
            {links.map((link) => (
              <tr key={link.code} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium text-blue-600">
                      {baseUrl}/{link.code}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 max-w-xs">
                    <span className="text-sm text-gray-600 truncate">{link.url}</span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <BarChart2 className="w-3 h-3 text-gray-400" />
                    <span className="text-sm font-medium">{link.clicks}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-500">
                    {link.lastClicked ? fromNow(link.lastClicked) : "Never"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(`${baseUrl}/${link.code}`)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                      title="Copy link"
                    >
                      <Copy className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                    </button>
                    <button
                      onClick={() => setQrCode(link.code)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                      title="Generate QR code"
                    >
                      <QrCode className="w-4 h-4 text-gray-500 group-hover:text-purple-600" />
                    </button>
                    <button
                      onClick={() => deleteLink(link.code)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                      title="Delete link"
                    >
                      <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}