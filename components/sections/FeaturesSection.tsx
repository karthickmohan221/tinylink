import {
  BarChart3,
  Clock3,
  Link2,
  QrCode,
  ShieldCheck,
  Trash2,
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Short Links That Stay Simple",
    description:
      "Create clean short URLs in one step and manage them from a single dashboard.",
  },
  {
    icon: BarChart3,
    title: "Click Tracking",
    description:
      "See clicks, last activity, and recent performance without leaving the app.",
  },
  {
    icon: QrCode,
    title: "QR Code Ready",
    description:
      "Generate QR codes for every short link so they can be shared online or offline.",
  },
  {
    icon: ShieldCheck,
    title: "User-Owned Data",
    description:
      "Signed-in users only see, create, and delete the links that belong to their account.",
  },
];

const featureDetails = [
  {
    icon: Clock3,
    title: "Fast daily workflow",
    body: "Home page link creation, saved-link visibility, and quick copy actions are optimized for repeat use instead of one-time campaigns.",
  },
  {
    icon: Trash2,
    title: "Link cleanup control",
    body: "Users can delete short links from their own table, keeping their dashboard focused on active links only.",
  },
  {
    icon: ShieldCheck,
    title: "Private dashboard boundaries",
    body: "Authenticated routes read and mutate link data by account, so the dashboard is scoped to the current signed-in user.",
  },
];

const workflow = [
  {
    step: "1",
    title: "Create",
    body: "Paste a destination URL, sign in if needed, and generate a short link from the home workflow.",
  },
  {
    step: "2",
    title: "Manage",
    body: "Review your saved links table, open QR codes, copy links, and remove links you no longer need.",
  },
  {
    step: "3",
    title: "Measure",
    body: "Use the snapshot and link table metrics to see clicks, recent activity, and performance trends.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-16 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Features built for a fast link workflow
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            TinyLink focuses on shortening, tracking, organizing, and sharing
            links without extra product clutter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {featureDetails.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <item.icon className="h-6 w-6 text-slate-900" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Workflow
            </p>
            <h3 className="mt-3 text-3xl font-semibold">
              From creation to analytics in three steps
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              TinyLink keeps the product surface small: make links, monitor results,
              and keep user-owned history in one place.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {workflow.map((item) => (
              <div key={item.step} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold text-cyan-300">Step {item.step}</div>
                <h4 className="mt-3 text-xl font-semibold">{item.title}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
