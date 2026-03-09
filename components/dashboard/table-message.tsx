import { Loader2 } from "lucide-react";

export default function TableMessage({ message }: { message: string }) {
  return (
    <tr>
      <td colSpan={5} className="text-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-gray-500">{message}</p>
        </div>
      </td>
    </tr>
  );
}