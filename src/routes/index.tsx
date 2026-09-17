import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlider } from "@/components/HeroSlider";
import { LogoMarquee } from "@/components/LogoMarquee";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TaxPower GST & TaxPower TDS Software" },
      {
        name: "description",
        content:
          "TaxPower GST & TaxPower TDS — India's trusted tax compliance software. Automate GST returns, TDS filing, and e-invoicing. 10,000+ businesses.",
      },
      { property: "og:title", content: "TaxPower GST & TaxPower TDS Software" },
      {
        property: "og:description",
        content:
          "Automate GST returns, TDS filing, and e-invoicing with TaxPower — trusted by 10,000+ businesses across India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const modules = [
  {
    name: "TaxPower GST",
    desc: "GST return filing, ITC reconciliation, e-invoicing and e-way bills from one dashboard.",
    to: "/gst",
    img: "/images/gst_ss/taxpowergst_client_dashboard.png",
    accent: "text-primary",
  },
  {
    name: "TaxPower TDS",
    desc: "Quarterly TDS returns, challan management, FVU validation and Form 16/16A generation.",
    to: "/tds",
    img: "/images/tds_ss/taxpowergst_biiling_dashboard.png",
    accent: "text-sky-brand",
  },
] as const;

function HomePage() {
  return (
    <main id="home">
      <h1 className="sr-only">TaxPower GST and TaxPower TDS compliance software</h1>
      <HeroSlider />
      <LogoMarquee />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="modules-title">
        <h2 id="modules-title" className="text-center font-display text-3xl font-bold text-ink">
          One Suite for Every Tax Workflow
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          From GST returns to TDS filings, TaxPower keeps your compliance fast, accurate, and audit-ready.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {modules.map((m) => (
            <article key={m.name} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <img src={m.img} alt={`${m.name} dashboard preview`} loading="lazy" className="aspect-video w-full object-cover object-top" />
              <div className="p-6">
                <h3 className={`font-display text-xl font-bold ${m.accent}`}>{m.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
                <Link
                  to={m.to}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Explore {m.name}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="blueprint-bg border-t">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-ink text-balance">
            Ready to simplify your tax compliance?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Book a live demo and see TaxPower GST &amp; TDS in action with your own workflows.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/support"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              Book Live Demo
            </Link>
            <Link
              to="/pricing"
              className="rounded-lg border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
