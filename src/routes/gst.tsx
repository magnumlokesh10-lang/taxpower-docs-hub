import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/gst")({
  head: () => ({
    meta: [
      { title: "TaxPower GST — Return, E-Invoice & E-Way Bill Software" },
      {
        name: "description",
        content:
          "TaxPower GST software for GST return preparation, ITC reconciliation, e-invoicing, and e-way bill workflows.",
      },
      { property: "og:title", content: "TaxPower GST — Return, E-Invoice & E-Way Bill Software" },
      {
        property: "og:description",
        content: "GST return preparation, ITC reconciliation, e-invoicing, and e-way bill workflows in one dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GstPage,
});

const recoCards = [
  {
    title: "GSTR-1 & E-Invoice Reconciliation",
    desc: "Instantly compare GSTR-1 return data with generated E-Invoices — quickly spot missing invoices, tax differences, and mismatches.",
    img: "/images/gst_ss/taxpowergst_e-invoice_reco.png",
    tone: "border-primary/40 bg-brand-soft/40",
  },
  {
    title: "GSTR-2 & 2B ITC Reconciliation",
    desc: "Effortlessly reconcile GSTR-2 purchase book data with auto-drafted GSTR-2B to maximize ITC claim and avoid compliance loss.",
    img: "/images/gst_ss/taxpowergst_itc_reco.png",
    tone: "border-sky-brand/40 bg-sky-soft/50",
  },
];

const featureRows = [
  {
    title: "Returns Dashboard",
    desc: "A smart, all-in-one dashboard to manage, track, and file all your GST Returns effortlessly.",
    img: "/images/gst_ss/taxpowergst_return_dashboard.png",
    points: [
      "Access all GST Return forms in a single view",
      "Direct GST Portal integration",
      "Most online GST services in one place",
      "Upload all major GST returns directly from the software",
      "One-click auto download of GSTR-1, 2A, 2B & other return data",
    ],
  },
  {
    title: "Reports Dashboard",
    desc: "The TaxPower GST report engine simplifies GST audit, reconciliation, and compliance analysis effortlessly.",
    img: "/images/gst_ss/taxpowergst_reports_dashboard.png",
    points: [
      "GSTR form-wise instant preview & audit-ready Excel exports",
      "Compare GSTR-3B with GSTR-1 in one preview",
      "Detailed section-wise, party-wise, and rate-wise summaries",
      "Annual, monthly, and quarterly period-wise summaries",
      "TDS/TCS, ITC reconciliation & liability reports",
    ],
  },
  {
    title: "Return Filing Dashboard",
    desc: "Get return status, filter and monitor return filing status in one place.",
    img: "/images/gst_ss/taxpowergst_return_filling_dashboard.png",
    points: [
      "Track GST returns & filing status easily",
      "Quick search & advanced filters",
      "Return filing status for all dealers within minutes",
      "Filing date & ARN tracking",
      "Export data to Excel or PDF",
    ],
  },
];

function GstPage() {
  return (
    <main>
      <section className="blueprint-bg border-b">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
          <span className="text-xs font-semibold tracking-wide text-primary uppercase">TaxPower GST Software</span>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink text-balance sm:text-5xl">
            Your complete GST workflow, in one dashboard
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Track inward supplies, reconcile ITC, and keep every GST action moving from one clear workspace.
          </p>
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-xl shadow-primary/10">
            <img
              src="/images/gst_ss/taxpowergst_client_dashboard.png"
              alt="TaxPower GST Invoice Management System dashboard showing inward supplies"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-label="GST reconciliation features">
        <div className="grid gap-8 md:grid-cols-2">
          {recoCards.map((c) => (
            <article key={c.title} className={`overflow-hidden rounded-2xl border ${c.tone}`}>
              <div className="p-6 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-ink">
                  TaxPower GST <br /> {c.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
              </div>
              <img src={c.img} alt={`TaxPower GST ${c.title} preview`} loading="lazy" className="w-full border-t object-cover object-top" />
            </article>
          ))}
        </div>
      </section>

      <section className="border-t bg-card" aria-labelledby="gst-more-title">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 id="gst-more-title" className="text-center font-display text-3xl font-bold text-ink">
            Explore the features our customers love
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Discover the tools that make GST compliance simpler, faster, and easier to manage.
          </p>

          <div className="mt-14 space-y-16">
            {featureRows.map((row, i) => (
              <article
                key={row.title}
                className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="overflow-hidden rounded-2xl border shadow-lg shadow-primary/5">
                  <img src={row.img} alt={`TaxPower GST ${row.title} preview`} loading="lazy" className="w-full object-cover object-top" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-ink">
                    TaxPower GST <br /> {row.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">{row.desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {row.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm text-foreground">
                        <span className="mt-0.5 text-primary">✦</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/support"
              className="inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              Book a Live GST Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
