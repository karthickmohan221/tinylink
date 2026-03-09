export default function StatsSection() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-2xl font-medium text-white/90 mb-12">
          Adopted and loved by millions of users for over a decade
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">600K+</div>
            <div className="text-white/80">Global paying customers</div>
            <div className="text-sm text-white/60">Links & QR Codes created monthly</div>
          </div>
          
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">256M</div>
            <div className="text-white/80">Likes & 800+</div>
            <div className="text-sm text-white/60">App integrations</div>
          </div>
          
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">10B+</div>
            <div className="text-white/80">Users</div>
            <div className="text-sm text-white/60">Connections (clicks & shares monthly)</div>
          </div>
        </div>
      </div>
    </div>
  );
}