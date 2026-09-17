import { createFileRoute } from "@tanstack/react-router";
import { DemoForm } from "@/components/DemoForm";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support & Contact — TaxPower" },
      {
        name: "description",
        content: "Contact TaxPower for demos, licensing, and technical support for GST and TDS software.",
      },
      { property: "og:title", content: "Support & Contact — TaxPower" },
      {
        property: "og:description",
        content: "Reach out for demos, licensing, or technical support for TaxPower GST and TDS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <main>
      <section className="blueprint-bg border-b">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="text-xs font-semibold tracking-wide text-primary uppercase">Support</span>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">Support &amp; Contact</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Need help with TaxPower? Reach out for demos, licensing, or technical support.
          </p>
          <div className="mx-auto mt-8 grid max-w-md gap-4 text-left">
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Email</h2>
              <a href="mailto:support@taxpower.org" className="mt-1 block text-sm text-sky-brand hover:underline">
                support@taxpower.org
              </a>
            </div>
          </div>
        </div>
      </section>

      <DemoForm />
    </main>
  );
}
