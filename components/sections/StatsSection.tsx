export default function StatsSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-2xl font-medium text-white/90 mb-12">
          Built for the core TinyLink workflow
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">1</div>
            <div className="text-white/80">Create links fast</div>
            <div className="text-sm text-white/60">Paste a URL and generate a short code in one action</div>
          </div>

          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">2</div>
            <div className="text-white/80">Track link performance</div>
            <div className="text-sm text-white/60">Monitor clicks and latest activity from the dashboard</div>
          </div>

          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">3</div>
            <div className="text-white/80">Share anywhere</div>
            <div className="text-sm text-white/60">Copy the short URL or open its QR code instantly</div>
          </div>
        </div>
      </div>
    </section>
  );
}
