import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TaxPower — GST & TDS Compliance Software" },
      {
        name: "description",
        content:
          "Learn about TaxPower — practical GST and TDS compliance software for Indian businesses, chartered accountants, and tax teams.",
      },
      { property: "og:title", content: "About TaxPower — GST & TDS Compliance Software" },
      {
        property: "og:description",
        content: "Practical GST and TDS compliance software for Indian businesses, CAs, and tax teams.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <section className="blueprint-bg border-b">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <span className="text-xs font-semibold tracking-wide text-primary uppercase">Company</span>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">About Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            TaxPower focuses on practical taxation software for Indian businesses, chartered accountants, and
            compliance teams.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 text-center shadow-sm">
            <p className="font-display text-3xl font-bold text-primary">10,000+</p>
            <p className="mt-1 text-sm text-muted-foreground">Businesses trust TaxPower every day</p>
          </div>
          <div className="rounded-2xl border bg-card p-6 text-center shadow-sm">
            <p className="font-display text-3xl font-bold text-primary">GST · TDS · MVAT</p>
            <p className="mt-1 text-sm text-muted-foreground">Complete compliance coverage</p>
          </div>
          <div className="rounded-2xl border bg-card p-6 text-center shadow-sm">
            <p className="font-display text-3xl font-bold text-primary">Pan-India</p>
            <p className="mt-1 text-sm text-muted-foreground">CAs &amp; enterprises across the country</p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border bg-card p-8 shadow-sm sm:p-10">
          <h2 className="font-display text-2xl font-bold text-ink">Software that Solves your Taxation Puzzle</h2>
          <p className="mt-4 text-muted-foreground">
            TaxPower, by Magnum Infosystem, builds desktop software that takes the friction out of Indian tax
            compliance. From GST return filing and ITC reconciliation to e-invoicing, e-way bills, and TDS returns,
            our tools are designed with and for working professionals — chartered accountants, tax consultants, and
            corporate finance teams.
          </p>
          <p className="mt-4 text-muted-foreground">
            Leading enterprises including Godrej Properties, Raymond, Parle, RailTel, and thousands of growing
            businesses rely on TaxPower for accurate, audit-ready compliance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/support"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Book Live Demo
            </Link>
            <Link
              to="/gst"
              className="rounded-lg border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
            >
              Explore TaxPower GST
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
