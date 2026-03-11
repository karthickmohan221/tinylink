import { QRCodeCanvas } from "qrcode.react";
import { X, Download } from "lucide-react";

interface Props {
  qrCode: string | null;
  baseUrl: string;
  onClose: () => void;
}

export default function QrModal({ qrCode, baseUrl, onClose }: Props) {
  if (!qrCode) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-semibold text-gray-900 mb-4">QR Code</h3>
        
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl flex justify-center mb-6">
          <QRCodeCanvas
            value={`${baseUrl}/${qrCode}`}
            size={200}
            level="H"
            includeMargin
            className="rounded-lg shadow-lg"
          />
        </div>

        <p className="text-center text-sm text-gray-600 mb-4 break-all">
          {baseUrl}/{qrCode}
        </p>

        <button
          onClick={() => {
            const canvas = document.querySelector("canvas");
            const url = canvas?.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = url!;
            a.download = `${qrCode}-qr.png`;
            a.click();
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download QR Code
        </button>
      </div>
    </div>
  );
}

