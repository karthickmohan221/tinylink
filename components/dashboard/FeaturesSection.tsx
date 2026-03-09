import { QrCode, Link2, Layout, Share2 } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "URL Shortener",
    description: "Create concise, memorable links that drive engagement and track performance."
  },
  {
    icon: QrCode,
    title: "QR Codes",
    description: "Generate dynamic QR codes that bridge physical and digital experiences."
  },
  {
    icon: Layout,
    title: "Landing Pages",
    description: "Build beautiful landing pages that convert visitors into customers."
  },
  {
    icon: Share2,
    title: "Social Integration",
    description: "Connect with fans and followers across all social platforms."
  }
];

export default function FeaturesSection() {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Great connections start with a click OR scan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            All the products you need to build brand connections, manage links and QR Codes, 
            and connect with audiences everywhere, in a single unified platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}