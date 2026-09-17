import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/gst", label: "TaxPower GST" },
  { to: "/tds", label: "TaxPower TDS" },
  { to: "/pricing", label: "Pricing" },
  { to: "/downloads", label: "Downloads" },
  { to: "/about", label: "About us" },
  { to: "/support", label: "Support" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6" aria-label="Primary navigation">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/images/swt_icon/taxpower_icon.png" alt="" className="h-9 w-9" />
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold text-ink">
              TaxPower<sup className="text-[0.55em]">®</sup>
            </span>
            <span className="hidden text-[11px] text-muted-foreground sm:block">
              Software that Solves your Taxation Puzzle
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-brand-soft text-ink" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/support"
            className="ml-2 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Book Live Demo
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
          </span>
        </button>
      </nav>

      {open && (
        <div className="border-t bg-background px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                activeProps={{ className: "bg-brand-soft" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/support"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Book Live Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
