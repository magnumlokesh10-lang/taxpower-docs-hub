import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type Slide = {
  module: string;
  title: string;
  titleClass: string;
  sub: string;
  desc: string;
  tags: string[];
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
  image: string;
  imageAlt: string;
};

const slides: Slide[] = [
  {
    module: "Module 01",
    title: "TaxPower GST",
    titleClass: "text-primary",
    sub: "Smart GST Filing & ITC Reconciliation",
    desc: "India's leading one-stop solution for seamless GST return filing, smart ITC reconciliation, and automated challan generation. Designed specially for CAs and corporate tax teams.",
    tags: [
      "Automate Challan Generation",
      "Direct Portal Upload",
      "Smart ITC Reconciliation",
      "Return Filing Dashboard",
      "Audit-Ready GST Reports",
      "Bulk Data Download",
    ],
    primary: { label: "Get Started Now", to: "/support" },
    secondary: { label: "Explore GST Features", to: "/gst" },
    image: "/images/promo/gstpromo.png",
    imageAlt: "TaxPower GST promo",
  },
  {
    module: "Module 02",
    title: "TaxPower GST Billing",
    titleClass: "text-primary",
    sub: "E-Invoicing & E-Way Bill Generation",
    desc: "Generate e-invoices instantly from your billing system. Smooth integration with the government portal, automated IRN printing, and parallel e-way bill generation in a single click.",
    tags: [
      "All-in-One Platform",
      "Bulk E-Inv & E-Way Bill Generation",
      "Excel Integration",
      "E-Way Bill Downloads",
      "Generate E-Inv & E-Way Bills in a Click",
      "Audit-Ready Reports",
    ],
    primary: { label: "Learn E-Invoicing", to: "/support" },
    secondary: { label: "Explore System", to: "/gst" },
    image: "/images/promo/billingpromo.png",
    imageAlt: "TaxPower E-Invoicing module illustration",
  },
  {
    module: "Module 03",
    title: "TaxPower TDS",
    titleClass: "text-sky-brand",
    sub: "Accurate TDS Validation & Return Filing",
    desc: "Automate your corporate deduction workflows. Fast validation, error checks, data logs generation, and smooth quarterly return generation directly from desktop.",
    tags: [
      "Bulk PAN Verification",
      "FVU File Validation",
      "Automate Challan Generation",
      "Direct Portal Upload",
      "Auto-Gen & Mail TDS Forms",
      "Audit-Ready TDS Reports",
    ],
    primary: { label: "Try TDS Engine", to: "/support" },
    secondary: { label: "Explore TDS Features", to: "/tds" },
    image: "/images/promo/tdspromo.png",
    imageAlt: "TaxPower TDS promo",
  },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const slide = slides[active];

  return (
    <section aria-roledescription="carousel" aria-label="TaxPower products" className="blueprint-bg border-b">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div key={active} className="grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold tracking-wide text-secondary-foreground uppercase">
              {slide.module}
            </span>
            <h2 className={`mt-4 font-display text-4xl font-bold sm:text-5xl ${slide.titleClass}`}>
              {slide.title}
            </h2>
            <p className="mt-2 text-lg font-semibold text-ink">{slide.sub}</p>
            <p className="mt-3 max-w-xl text-muted-foreground">{slide.desc}</p>

            <ul className="mt-6 flex max-w-xl flex-wrap gap-2">
              {slide.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
                >
                  ✦ {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={slide.primary.to}
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                {slide.primary.label}
              </Link>
              <Link
                to={slide.secondary.to}
                className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {slide.secondary.label}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="animate-hero-fade">
            <div className="overflow-hidden rounded-2xl border bg-card shadow-xl shadow-primary/10">
              <img src={slide.image} alt={slide.imageAlt} className="w-full object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="flex gap-2" aria-label="Choose slide">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Slide ${i + 1}: ${s.title}`}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === active ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume auto-rotation" : "Pause auto-rotation"}
            aria-pressed={paused}
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border bg-card text-xs text-muted-foreground hover:bg-muted"
          >
            {paused ? "▶" : "❚❚"}
          </button>
        </div>
      </div>
    </section>
  );
}
