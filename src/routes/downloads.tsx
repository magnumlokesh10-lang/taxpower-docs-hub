import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "TaxPower Downloads — GST & TDS Web Setup" },
      {
        name: "description",
        content:
          "Download the latest TaxPower GST and TaxPower TDS web setup files for GST return filing, e-invoicing, e-way bill, and TDS compliance.",
      },
      { property: "og:title", content: "TaxPower Downloads — GST & TDS Web Setup" },
      {
        property: "og:description",
        content: "Download the latest TaxPower GST and TaxPower TDS setup files and utilities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DownloadsPage,
});

type Row = { name: string; version: string; date: string; size: string; url: string; tone: "gst" | "tds" };

const products: Row[] = [
  { name: "TaxPower GST (Web Setup)", version: "11.9.3.0", date: "14/08/2026", size: "150 MB", url: "https://www.magnuminfosystem.com/Downloads/GST/TaxPowerGSTWebSetup.exe", tone: "gst" },
  { name: "TaxPower TDS (Web Setup)", version: "1.22.2.0", date: "09/07/2026", size: "154 MB", url: "https://www.magnuminfosystem.com/Downloads/TDS/TaxPowerTDSWebSetup.exe", tone: "tds" },
  { name: "TaxPower MVAT (Web Setup)", version: "9.3.5.0", date: "11/05/2026", size: "101 MB", url: "https://www.magnuminfosystem.com/Downloads/TaxPowerMVATWebSetup.exe", tone: "gst" },
];

const utilities: Row[] = [
  { name: "Microsoft SQL Server 2019 Express for Windows 10 & Above", version: "15.0", date: "NA", size: "249 MB", url: "https://download.microsoft.com/download/7/c/1/7c14e92e-bdcb-4f89-b7cf-93543e7112d1/SQLEXPR_x64_ENU.exe", tone: "gst" },
  { name: "PostgreSQL 17.5", version: "17.5", date: "NA", size: "340 MB", url: "https://get.enterprisedb.com/postgresql/postgresql-17.5-1-windows-x64.exe", tone: "gst" },
  { name: "Microsoft .NET 9", version: "9.0", date: "NA", size: "57.8 MB", url: "https://builds.dotnet.microsoft.com/dotnet/WindowsDesktop/9.0.6/windowsdesktop-runtime-9.0.6-win-x64.exe", tone: "gst" },
  { name: "Microsoft .NET Framework 4.8", version: "4.8", date: "NA", size: "115 MB", url: "https://download.visualstudio.microsoft.com/download/pr/2d6bb6b2-226a-4baa-bdec-798822606ff1/8494001c276a4b96804cde7829c04d7f/ndp48-x86-x64-allos-enu.exe", tone: "gst" },
  { name: "TaxPower Reporting Engine", version: "1.0.0.0", date: "NA", size: "47.2 MB", url: "https://www.magnuminfosystem.com/Downloads/TaxPowerReportingEngine.msi", tone: "gst" },
  { name: "Java Runtime Environment 64 bit", version: "68.5", date: "NA", size: "13.1 MB", url: "https://www.magnuminfosystem.com/Downloads/Java_Runtime_Environment_(64bit)_v8_Update_171.exe", tone: "gst" },
  { name: "Java Runtime Environment 32 bit", version: "68.5", date: "NA", size: "13.1 MB", url: "https://www.magnuminfosystem.com/Downloads/Java_Runtime_Environment_(32bit)_v8_Update_171.exe", tone: "gst" },
  { name: "GST Signer", version: "2.8", date: "NA", size: "5.81 MB", url: "https://www.magnuminfosystem.com/Downloads/GSTSigner-v2.8.msi", tone: "gst" },
];

function DownloadTable({ rows, label }: { rows: Row[]; label: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border bg-card" role="region" aria-label={label}>
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b bg-muted/60 text-left text-xs tracking-wide text-muted-foreground uppercase">
            <th scope="col" className="px-5 py-3.5">Product Name</th>
            <th scope="col" className="px-5 py-3.5">Version</th>
            <th scope="col" className="px-5 py-3.5">Published</th>
            <th scope="col" className="px-5 py-3.5">Size</th>
            <th scope="col" className="px-5 py-3.5">Download</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b last:border-0 hover:bg-muted/40">
              <td className="px-5 py-4 font-medium text-foreground">{r.name}</td>
              <td className="px-5 py-4 text-muted-foreground">{r.version}</td>
              <td className="px-5 py-4 text-muted-foreground">{r.date}</td>
              <td className="px-5 py-4 text-muted-foreground">{r.size}</td>
              <td className="px-5 py-4">
                <a
                  href={r.url}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-primary-foreground ${
                    r.tone === "gst" ? "bg-primary hover:bg-primary/90" : "bg-sky-brand hover:opacity-90"
                  }`}
                >
                  <span aria-hidden="true">↓</span> Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DownloadsPage() {
  return (
    <main>
      <section className="blueprint-bg border-b">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold text-ink text-balance">
            Download TaxPower Software
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Get the latest version of TaxPower GST and TaxPower TDS software
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-4 py-16 sm:px-6">
        <DownloadTable rows={products} label="Product download files" />

        <div>
          <h2 className="mb-5 font-display text-2xl font-bold text-ink">TaxPower Utilities Download</h2>
          <DownloadTable rows={utilities} label="TaxPower utility download files" />
        </div>
      </section>
    </main>
  );
}
