import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for TinyLink users and link dashboard data handling.",
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    title: "Information TinyLink stores",
    body: "TinyLink stores the account details submitted during signup, including your email address and a hashed password. It also stores the links you create, short codes, click counts, and the latest click timestamp for those links.",
  },
  {
    title: "How link activity is used",
    body: "When someone opens a TinyLink short URL, the application increments the click counter for that link and may update the last-clicked time. This information is used to display analytics inside the dashboard.",
  },
  {
    title: "Authentication and access",
    body: "TinyLink uses token-based authentication so signed-in users can access only their own dashboard data. Link creation, listing, and deletion for private dashboard data are scoped to the authenticated account.",
  },
  {
    title: "Data sharing",
    body: "TinyLink does not expose private dashboard data to other signed-in users through the application interface. Public short links still redirect visitors to the destination URL chosen by the link owner.",
  },
  {
    title: "Third-party services",
    body: "This application uses a PostgreSQL database for storage. Depending on deployment, advertising scripts or hosting providers may also process technical request data needed to deliver the service.",
  },
  {
    title: "Your choices",
    body: "You can stop using the service at any time. Deleting links from your dashboard removes them from the application. If you deploy TinyLink in production, update this policy to match your actual support and deletion process.",
  },
];

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              This policy describes how TinyLink handles account information,
              link data, and dashboard activity for this application.
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
