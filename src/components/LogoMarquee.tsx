const logos = [
  { src: "/images/clietns_logo/cnrbank.jpg", alt: "CNR Bank" },
  { src: "/images/clietns_logo/godrej_properties_logo.svg", alt: "Godrej Properties" },
  { src: "/images/clietns_logo/raymond-logo.png", alt: "Raymond" },
  { src: "/images/clietns_logo/balaji_logo.png", alt: "Balaji" },
  { src: "/images/clietns_logo/rokde_lg.png", alt: "Rokde" },
  { src: "/images/clietns_logo/Londe-Jeweller-Logo.webp", alt: "Londe Jewellers" },
  { src: "/images/clietns_logo/ramsons-logo.png", alt: "Ramsons" },
  { src: "/images/clietns_logo/suruchi_logo.png", alt: "Suruchi" },
  { src: "/images/clietns_logo/cmss-logo.jpg", alt: "CMSS" },
  { src: "/images/clietns_logo/Lloyds_Logo.png", alt: "Lloyds" },
  { src: "/images/clietns_logo/railtel-logo.png", alt: "RailTel" },
  { src: "/images/clietns_logo/Parle-logo.png", alt: "Parle" },
  { src: "/images/clietns_logo/milkganga_logo.png", alt: "Milkganga" },
  { src: "/images/clietns_logo/bericap-logo.png", alt: "Bericap" },
  { src: "/images/clietns_logo/oraipl-logo.png", alt: "OraiPL" },
  { src: "/images/clietns_logo/zodiac_logo.svg", alt: "Zodiac" },
  { src: "/images/clietns_logo/bergner-logo.avif", alt: "Bergner" },
  { src: "/images/clietns_logo/Gazon-Communications-Logo.png", alt: "Gazon Communications" },
  { src: "/images/clietns_logo/Accops_Logo.svg", alt: "Accops" },
  { src: "/images/clietns_logo/orra-logo.png", alt: "Orra" },
];

export function LogoMarquee() {
  const row = [...logos, ...logos];
  return (
    <section aria-labelledby="trusted-title" className="border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 id="trusted-title" className="text-center font-display text-2xl font-bold text-ink sm:text-3xl">
          Trusted by Leading Enterprises, CAs &amp; Tax Experts
        </h2>
        <p className="mt-2 text-center text-muted-foreground">
          10,000+ businesses across India rely on TaxPower every day
        </p>

        <div className="relative mt-10 overflow-hidden" aria-label="Client companies logo marquee">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-card to-transparent" />
          <div className="animate-marquee flex w-max items-center gap-4 hover:[animation-play-state:paused]">
            {row.map((logo, i) => (
              <div
                key={`${logo.alt}-${i}`}
                aria-hidden={i >= logos.length}
                className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border bg-background px-6"
              >
                <img
                  src={logo.src}
                  alt={i >= logos.length ? "" : logo.alt}
                  loading="lazy"
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
