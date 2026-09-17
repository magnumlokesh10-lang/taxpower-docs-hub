import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "TaxPower GST & TDS Software Pricing Plans" },
      {
        name: "description",
        content:
          "Compare TaxPower GST, billing, TDS, and combo software license plans for businesses and tax professionals.",
      },
      { property: "og:title", content: "TaxPower GST & TDS Software Pricing Plans" },
      {
        property: "og:description",
        content: "Compare TaxPower GST, billing, TDS, and combo software license plans.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PricingPage,
});

type Tier = { label: string; install: string; installOld?: string; amc: string; amcOld?: string; save?: string };

const suites = [
  {
    badge: "Recommended for Professionals",
    pill: "Best for GST & Tax Consultants",
    name: "Professional Complete Suite",
    priceOld: "₹17,000",
    price: "₹15,000",
    amc: "₹8,000 / F.Y",
    points: [
      "GST Return + GST Billing + TDS Module",
      "Optimized for CAs, tax practitioners, and compliance firms",
      "F.Y-wise subscription & license renewal",
    ],
    desc: "Ideal for tax practitioners managing multi-client compliance workflows with structured reporting and accuracy.",
  },
  {
    badge: "Recommended for Enterprises",
    pill: "Best for Businesses & Corporate Entities",
    name: "Enterprise Complete Suite",
    priceOld: "₹26,000",
    price: "₹20,000",
    amc: "₹10,000 / F.Y",
    points: [
      "GST Return + GST Billing + TDS Module",
      "Designed for corporate finance teams, firms, and enterprise users",
      "F.Y-wise subscription & license renewal",
    ],
    desc: "Comprehensive software suite for internal operations, bulk e-invoicing, e-way bill generation, and compliance management.",
  },
];

const modules: { badge?: string; popular?: boolean; name: string; tiers: Tier[]; desc: string }[] = [
  {
    name: "TaxPower Billing",
    tiers: [
      { label: "For Professionals", install: "₹5,000", amc: "₹3,000 / F.Y" },
      { label: "For Businesses", install: "₹7,000", amc: "₹4,000 / F.Y" },
    ],
    desc: "Tailored for businesses needing quick sales invoicing, automated E-Way bills, and E-Invoicing integration.",
  },
  {
    name: "GST Return",
    badge: "Most Popular",
    popular: true,
    tiers: [
      { label: "For Professionals", install: "₹7,000", amc: "₹5,000 / F.Y" },
      { label: "For Businesses", install: "₹12,000", amc: "₹6,000 / F.Y" },
    ],
    desc: "Designed for tax consultants & firms managing monthly GST return filings and automated 2A/2B reconciliations.",
  },
  {
    name: "TaxPower TDS",
    tiers: [
      { label: "For Professionals", install: "₹5,000", amc: "₹2,500 / F.Y" },
      { label: "For Businesses", install: "₹7,000", amc: "₹3,500 / F.Y" },
    ],
    desc: "Built for finance teams handling quarterly TDS returns, Form 16/16A generation, and correction filings.",
  },
  {
    name: "GST Return + Billing",
    badge: "Combo Offer",
    tiers: [
      { label: "For Professionals", install: "₹11,000", installOld: "₹12,000", amc: "₹7,000 / F.Y", amcOld: "₹8,000", save: "SAVE ₹1,000" },
      { label: "For Businesses", install: "₹15,000", installOld: "₹19,000", amc: "₹8,000 / F.Y", amcOld: "₹10,000", save: "SAVE ₹4,000" },
    ],
    desc: "Complete integration of sales invoicing with direct GST compliance and return processing.",
  },
  {
    name: "GST Return + TDS",
    badge: "Combo Offer",
    tiers: [
      { label: "For Professionals", install: "₹11,000", installOld: "₹12,000", amc: "₹7,000 / F.Y", amcOld: "₹7,500", save: "SAVE ₹1,000" },
      { label: "For Businesses", install: "₹16,000", installOld: "₹19,000", amc: "₹8,500 / F.Y", amcOld: "₹9,500", save: "SAVE ₹3,000" },
    ],
    desc: "Unified compliance solution covering end-to-end GST filings and corporate TDS requirements.",
  },
  {
    name: "Billing + TDS",
    badge: "Combo Offer",
    tiers: [
      { label: "For Professionals", install: "₹9,000", installOld: "₹10,000", amc: "₹5,000 / F.Y", amcOld: "₹5,500", save: "SAVE ₹1,000" },
      { label: "For Businesses", install: "₹12,000", installOld: "₹14,000", amc: "₹6,500 / F.Y", amcOld: "₹7,500", save: "SAVE ₹2,000" },
    ],
    desc: "Ideal setup for managing day-to-day invoicing alongside vendor and payroll TDS deductions.",
  },
];

function TierBlock({ tier }: { tier: Tier }) {
  return (
    <div className="rounded-xl border bg-background p-4">
      {tier.save && (
        <span className="mb-2 inline-block rounded-full bg-sky-soft px-2.5 py-0.5 text-[11px] font-bold text-sky-brand">
          {tier.save}
        </span>
      )}
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{tier.label}</p>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Installation <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold">License Fee</span>
        </span>
        <span className="font-semibold text-ink">
          {tier.installOld && <del className="mr-1.5 font-normal text-muted-foreground">{tier.installOld}</del>}
          {tier.install}
        </span>
      </div>
      <div className="mt-1.5 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Annual Renewal <span className="rounded bg-brand-soft px-1.5 py-0.5 text-[10px] font-semibold text-primary">AMC</span>
        </span>
        <span className="font-semibold text-ink">
          {tier.amcOld && <del className="mr-1.5 font-normal text-muted-foreground">{tier.amcOld}</del>}
          {tier.amc}
        </span>
      </div>
    </div>
  );
}

function PricingPage() {
  return (
    <main>
      <section className="blueprint-bg border-b">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
            TaxPower <span className="text-primary">GST</span> &amp; TaxPower <span className="text-sky-brand">TDS</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Pricing plans for businesses and professionals
          </p>
        </div>
      </section>

      <section aria-labelledby="suite-heading" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 id="suite-heading" className="text-center font-display text-2xl font-bold text-ink sm:text-3xl">
          Recommended All-In-One License Suites
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {suites.map((s) => (
            <article key={s.name} className="relative flex flex-col rounded-2xl border-2 border-primary/50 bg-card p-8 shadow-lg shadow-primary/10">
              <span className="absolute -top-3.5 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                {s.badge}
              </span>
              <span className="inline-block w-fit rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-primary">
                {s.pill}
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink">{s.name}</h3>
              <p className="mt-3 font-display text-4xl font-bold text-primary">
                <del className="mr-2 text-lg font-normal text-muted-foreground">{s.priceOld}</del>
                {s.price}
              </p>
              <p className="text-xs text-muted-foreground">Initial License Fee (One-Time Setup)</p>
              <p className="mt-4 rounded-xl bg-brand-soft px-4 py-3 text-sm text-ink">
                <strong>
                  Annual Renewal <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">AMC</span>:
                </strong>{" "}
                {s.amc}
              </p>
              <ul className="mt-5 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm text-foreground">
                    <span className="mt-0.5 text-primary">✦</span>
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">{s.desc}</p>
              <Link
                to="/support"
                className="mt-6 inline-flex justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Request Trial License
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="modules-heading" className="border-t bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 id="modules-heading" className="text-center font-display text-2xl font-bold text-ink sm:text-3xl">
            Individual &amp; Dual Combo Modules
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <article
                key={m.name}
                className={`relative flex flex-col rounded-2xl border bg-background p-6 shadow-sm ${
                  m.popular ? "border-2 border-primary/60 shadow-primary/10" : ""
                }`}
              >
                {m.badge && (
                  <span
                    className={`absolute -top-3 left-5 rounded-full px-3 py-1 text-xs font-bold ${
                      m.popular ? "bg-primary text-primary-foreground" : "bg-sky-brand text-primary-foreground"
                    }`}
                  >
                    {m.badge}
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-ink">{m.name}</h3>
                <div className="mt-4 space-y-3">
                  {m.tiers.map((t) => (
                    <TierBlock key={t.label} tier={t} />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm text-muted-foreground">{m.desc}</p>
                <Link
                  to="/support"
                  className={`mt-5 inline-flex justify-center rounded-lg px-6 py-2.5 text-sm font-semibold ${
                    m.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-sky-brand text-primary-foreground hover:opacity-90"
                  }`}
                >
                  Get Started
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="terms-heading" className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 id="terms-heading" className="font-display text-2xl font-bold text-ink">Terms and Conditions</h2>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Taxes would be applicable, i.e. 18% GST (chargeable on installation of the software).</li>
          <li>LAN (Multi User) charges Rs. 1000 + 18% GST per computer for Business.</li>
          <li>LAN (Multi User) charges Rs. 500 + 18% GST per computer for Professional.</li>
          <li>Product key will be delivered through email after confirmed payment.</li>
          <li>
            Customer support and software updates are free for one year from the date of purchase; after that AMC
            would be applicable.
          </li>
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Note: Magnum Infosystem reserves the right to change the price of installation, LAN, or AMC of software
          without prior notice.
        </p>
      </section>
    </main>
  );
}
