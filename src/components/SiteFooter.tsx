import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/swt_icon/taxpower_icon.png" alt="" className="h-8 w-8" />
            <span className="font-display text-lg font-bold text-ink">
              TaxPower<sup className="text-[0.55em]">®</sup>
            </span>
          </Link>
          <p className="mt-3 text-sm font-medium text-foreground">
            Software that Solves your Taxation Puzzle
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Practical GST, TDS, e-invoice, and e-way bill software for Indian businesses, CAs, and compliance teams.
          </p>
        </div>

        <nav aria-label="Products">
          <h2 className="text-sm font-semibold text-foreground">Products</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/gst" className="hover:text-foreground">TaxPower GST</Link></li>
            <li><Link to="/gst" className="hover:text-foreground">E-Invoice &amp; E-Way Bill</Link></li>
            <li><Link to="/tds" className="hover:text-foreground">TaxPower TDS</Link></li>
            <li><Link to="/downloads" className="hover:text-foreground">Downloads</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-sm font-semibold text-foreground">Company</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/support" className="hover:text-foreground">Support</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About us</Link></li>
            <li><Link to="/support" className="hover:text-foreground">Book Live Demo</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Get in Touch</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Email: <a href="mailto:support@taxpower.org" className="text-sky-brand hover:underline">support@taxpower.org</a>
          </p>
          <Link
            to="/support"
            className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Book Live Demo
          </Link>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} TaxPower. All rights reserved.</p>
          <p>TaxPower GST and TaxPower TDS — return filing software for India.</p>
        </div>
      </div>
    </footer>
  );
}
