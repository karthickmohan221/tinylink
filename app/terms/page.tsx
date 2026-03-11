import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for TinyLink link creation, redirects, analytics, and dashboard access.",
  alternates: {
    canonical: "/terms",
  },
};

const sections = [
  {
    title: "Use of the service",
    body: "TinyLink is provided for creating short links, viewing dashboard analytics, and managing QR-ready URLs. You are responsible for the destination URLs and content you publish through the service.",
  },
  {
    title: "Account responsibility",
    body: "If you create an account, you are responsible for keeping your login credentials secure and for activity performed through your account. Do not attempt to access dashboard data that does not belong to you.",
  },
  {
    title: "Acceptable use",
    body: "You agree not to use TinyLink for malicious redirects, unlawful content, abuse of third-party services, or activity that interferes with the normal operation of the application.",
  },
  {
    title: "Availability and changes",
    body: "TinyLink may change features, route behavior, or storage details over time. The application may also become temporarily unavailable during maintenance, deployment, or infrastructure issues.",
  },
  {
    title: "Analytics and redirects",
    body: "Redirect and analytics features depend on destination URLs remaining valid and reachable. TinyLink is not responsible for third-party destination content or downtime outside this application.",
  },
  {
    title: "Limitation",
    body: "This application is provided on an as-is basis for its intended URL shortening workflow. If you deploy TinyLink in production, you should replace these terms with terms reviewed for your actual business and compliance requirements.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-[80px]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Legal
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">
              Terms of Use
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              These terms describe the basic rules for using TinyLink and its
              link management features.
            </p>

            <div className="mt-10 space-y-8">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
