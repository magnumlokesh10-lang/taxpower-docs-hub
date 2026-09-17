import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tds")({
  head: () => ({
    meta: [
      { title: "TaxPower TDS — TDS Return Filing & Validation Software" },
      {
        name: "description",
        content:
          "TaxPower TDS software for TDS return filing, challan management, validation, error checks, and practical reporting.",
      },
      { property: "og:title", content: "TaxPower TDS — TDS Return Filing & Validation Software" },
      {
        property: "og:description",
        content: "TDS return filing, challan management, FVU validation, and audit-ready reporting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TdsPage,
});

const features = [
  {
    title: "Bulk PAN Verification",
    desc: "Verify deductee PANs in bulk before filing to avoid defaults and notices.",
  },
  {
    title: "FVU File Validation",
    desc: "Generate and validate FVU files with built-in error checks and data logs.",
  },
  {
    title: "Automated Challan Generation",
    desc: "Create TDS challans automatically and map them to deductee records.",
  },
  {
    title: "Direct Portal Upload",
    desc: "Upload quarterly returns directly from the desktop software.",
  },
  {
    title: "Auto-Generate & Mail TDS Forms",
    desc: "Generate Form 16 / 16A and mail them to deductees in one flow.",
  },
  {
    title: "Audit-Ready TDS Reports",
    desc: "Practical, exportable reports for audits, reviews, and corrections.",
  },
];

function TdsPage() {
  return (
    <main>
      <section className="blueprint-bg border-b">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="text-xs font-semibold tracking-wide text-sky-brand uppercase">TDS Suite</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-sky-brand sm:text-5xl">TaxPower TDS</h1>
            <p className="mt-2 text-lg font-semibold text-ink">
              Accurate TDS Validation &amp; Return Filing
            </p>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Automate your corporate deduction workflows. Fast validation, error checks, data log generation, and
              smooth quarterly return generation directly from your desktop.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/support"
                className="rounded-lg bg-sky-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"
              >
                Try TDS Engine
              </Link>
              <Link
                to="/pricing"
                className="rounded-lg border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
              >
                View Pricing
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border bg-card shadow-xl shadow-sky-brand/10">
            <img
              src="/images/tds_ss/taxpowergst_biiling_dashboard.png"
              alt="TaxPower TDS dashboard preview"
              className="w-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="tds-features-title">
        <h2 id="tds-features-title" className="text-center font-display text-3xl font-bold text-ink">
          TDS Compliance, End to End
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Everything finance teams need for quarterly TDS returns, correction filings, and Form 16/16A generation.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border bg-sky-soft p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-bold text-ink text-balance">
            See TaxPower TDS running on your own data
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Book a live demo and our team will walk you through returns, challans, and reports.
          </p>
          <Link
            to="/support"
            className="mt-6 inline-flex rounded-lg bg-sky-brand px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Book Live Demo
          </Link>
        </div>
      </section>
    </main>
  );
}
