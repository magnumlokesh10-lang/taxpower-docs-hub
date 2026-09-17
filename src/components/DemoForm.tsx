import { useState, type FormEvent } from "react";

const gstStates = [
  "01 - Jammu & Kashmir", "02 - Himachal Pradesh", "03 - Punjab", "04 - Chandigarh",
  "05 - Uttarakhand", "06 - Haryana", "07 - Delhi", "08 - Rajasthan",
  "09 - Uttar Pradesh", "10 - Bihar", "11 - Sikkim", "12 - Arunachal Pradesh",
  "13 - Nagaland", "14 - Manipur", "15 - Mizoram", "16 - Tripura",
  "17 - Meghalaya", "18 - Assam", "19 - West Bengal", "20 - Jharkhand",
  "21 - Odisha", "22 - Chhattisgarh", "23 - Madhya Pradesh", "24 - Gujarat",
  "26 - Dadra & Nagar Haveli and Daman & Diu", "27 - Maharashtra", "29 - Karnataka",
  "30 - Goa", "31 - Lakshadweep", "32 - Kerala", "33 - Tamil Nadu",
  "34 - Puducherry", "35 - Andaman & Nicobar Islands", "36 - Telangana",
  "37 - Andhra Pradesh", "38 - Ladakh", "97 - Other Territory", "99 - Other Country",
];

const products = [
  { value: "TaxPower GST Return", badge: "GST Return Module" },
  { value: "TaxPower E-Invoice & E-Way Bill", badge: "Billing Generation Module" },
  { value: "TaxPower TDS Return", badge: "TDS Return Module" },
];

const purposes = [
  "Free Trial / Demo",
  "Want to Purchase",
  "Pricing or Quotation",
  "Renewal of License",
  "Technical Support",
  "Other",
];

const inputCls =
  "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export function DemoForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("success");
    e.currentTarget.reset();
  }

  return (
    <section id="demo-enquiry" aria-labelledby="demo-form-title" className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border bg-card p-6 shadow-lg shadow-primary/5 sm:p-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
            <img src="/images/swt_icon/taxpower_icon.png" alt="" className="h-4 w-4" />
            Live Demo
          </span>
          <h2 id="demo-form-title" className="mt-4 font-display text-3xl font-bold text-ink">
            Book <span className="text-primary">TaxPower GST</span> &amp;{" "}
            <span className="text-sky-brand">TaxPower TDS</span> Demo
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill in your details and select the product modules you want to discuss.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Full Name <span className="text-destructive">*</span></span>
              <input name="name" type="text" autoComplete="name" placeholder="Enter your full name" required className={inputCls} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Company Name <span className="text-destructive">*</span></span>
              <input name="company" type="text" autoComplete="organization" placeholder="Enter company name" required className={inputCls} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Mobile Number <span className="text-destructive">*</span></span>
              <input
                name="mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="10 digit mobile number"
                required
                className={inputCls}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                }}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Email ID <span className="text-destructive">*</span></span>
              <input name="email" type="email" autoComplete="email" placeholder="Enter your email address" required className={inputCls} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">GSTIN Number <span className="text-muted-foreground">(Optional)</span></span>
              <input name="gstin" type="text" placeholder="e.g. 27AAAAA0000A1Z5" maxLength={15} className={`${inputCls} uppercase`} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Address <span className="text-muted-foreground">(Optional)</span></span>
              <input name="address" type="text" autoComplete="street-address" placeholder="Enter your address" className={inputCls} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">City Name <span className="text-destructive">*</span></span>
              <input name="city" type="text" autoComplete="address-level2" placeholder="Enter your city" required className={inputCls} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">State (GST State Code) <span className="text-destructive">*</span></span>
              <input name="state" list="gstStateCodes" placeholder="Search state or code" required className={inputCls} />
              <datalist id="gstStateCodes">
                {gstStates.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </label>
          </div>

          <fieldset>
            <legend className="text-sm font-medium">
              Interested Product <span className="text-destructive">*</span>{" "}
              <span className="text-muted-foreground">(Select one or more)</span>
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {products.map((p) => (
                <label key={p.value} className="cursor-pointer">
                  <input type="checkbox" name="product" value={p.value} className="peer sr-only" />
                  <div className="rounded-xl border bg-background p-4 transition-colors peer-checked:border-primary peer-checked:bg-brand-soft">
                    <span className="block text-sm font-semibold text-ink">{p.value}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{p.badge}</span>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Purpose of Enquiry <span className="text-destructive">*</span></span>
            <select name="purpose" required defaultValue="" className={inputCls}>
              <option value="" disabled>
                Select purpose of enquiry
              </option>
              {purposes.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <img src="/images/swt_icon/taxpower_icon.png" alt="" className="h-4 w-4" />
              Submit
            </button>
          </div>

          {status === "success" && (
            <p role="status" className="text-center text-sm font-medium text-green-700">
              Thank you! Your enquiry has been noted. Our team will reach out to schedule your demo.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
