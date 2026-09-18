import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";

import { listLeads, updateLead } from "@/lib/crm.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/crm")({
  head: () => ({
    meta: [
      { title: "TaxPower CRM — Leads" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Internal leads dashboard." },
    ],
  }),
  component: CrmDashboard,
});

type Status = "new" | "contacted" | "converted" | "closed";

type Lead = {
  id: string;
  submitted_at: string;
  submitted_at_text: string;
  name: string;
  company: string;
  mobile: string;
  email: string;
  gstin: string;
  address: string;
  city: string;
  state: string;
  product: string;
  purpose: string;
  page: string;
  status: Status;
  notes: string;
  followup_date: string | null;
  followup_note: string;
  converted_at: string | null;
  purchase_product: string;
  purchase_amount: number | string | null;
  invoice_no: string;
};

type Patch = {
  id: string;
  status?: Status;
  notes?: string;
  followup_date?: string | null;
  followup_note?: string;
  purchase_product?: string;
  purchase_amount?: number | null;
  invoice_no?: string;
  mark_converted?: boolean;
};

const STATUSES: Status[] = ["new", "contacted", "converted", "closed"];

const STATUS_CLASS: Record<Status, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-amber-100 text-amber-900",
  converted: "bg-emerald-100 text-emerald-800",
  closed: "bg-slate-200 text-slate-700",
};

type Tab = "all" | "followup" | "converted";

const TAB_LABEL: Record<Tab, string> = {
  all: "All leads",
  followup: "Follow-ups",
  converted: "Converted / Purchased",
};

function fmtDate(lead: Lead) {
  return lead.submitted_at_text || new Date(lead.submitted_at).toLocaleString("en-IN");
}

function CrmDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchLeads = useServerFn(listLeads);
  const saveLead = useServerFn(updateLead);

  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["crm-leads"],
    queryFn: () => fetchLeads(),
  });

  const mutation = useMutation({
    mutationFn: (vars: Patch) => saveLead({ data: vars }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["crm-leads"] }),
  });

  const leads = (data?.leads ?? []) as Lead[];

  const todayIso = new Date().toISOString().slice(0, 10);

  const scoped = useMemo(() => {
    if (tab === "converted") return leads.filter((l) => l.status === "converted");
    if (tab === "followup") return leads.filter((l) => !!l.followup_date && l.status !== "converted");
    return leads;
  }, [leads, tab]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = scoped.filter((lead) => {
      if (tab === "all" && statusFilter !== "all" && lead.status !== statusFilter) return false;
      if (!q) return true;
      return [
        lead.name,
        lead.company,
        lead.mobile,
        lead.email,
        lead.city,
        lead.state,
        lead.product,
        lead.purpose,
        lead.notes,
        lead.followup_note,
        lead.purchase_product,
        lead.invoice_no,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    if (tab === "followup") {
      return [...list].sort((a, b) => (a.followup_date ?? "").localeCompare(b.followup_date ?? ""));
    }
    return list;
  }, [scoped, search, statusFilter, tab]);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: leads.length };
    for (const s of STATUSES) base[s] = leads.filter((l) => l.status === s).length;
    base["followup"] = leads.filter((l) => !!l.followup_date && l.status !== "converted").length;
    base["dueToday"] = leads.filter(
      (l) => !!l.followup_date && l.status !== "converted" && l.followup_date! <= todayIso,
    ).length;
    return base;
  }, [leads, todayIso]);

  const openLead = leads.find((l) => l.id === openId) ?? null;

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/crm/login", replace: true });
  }

  function exportCsv() {
    const headers = [
      "Submitted At",
      "Name",
      "Company",
      "Mobile",
      "Email",
      "GSTIN",
      "Address",
      "City",
      "State",
      "Product",
      "Purpose",
      "Status",
      "Follow-up date",
      "Follow-up note",
      "Converted at",
      "Purchased product",
      "Amount",
      "Invoice no",
      "Notes",
    ];
    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = filtered.map((l) =>
      [
        fmtDate(l),
        l.name,
        l.company,
        l.mobile,
        l.email,
        l.gstin,
        l.address,
        l.city,
        l.state,
        l.product,
        l.purpose,
        l.status,
        l.followup_date ?? "",
        l.followup_note,
        l.converted_at ? new Date(l.converted_at).toLocaleString("en-IN") : "",
        l.purchase_product,
        l.purchase_amount ?? "",
        l.invoice_no,
        l.notes,
      ]
        .map(escape)
        .join(","),
    );
    const csv = [headers.map(escape).join(","), ...rows].join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `taxpower-${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-foreground">TaxPower CRM</h1>
            <p className="text-sm text-muted-foreground">
              {counts["all"]} leads · New {counts["new"]} · Contacted {counts["contacted"]} ·
              Converted {counts["converted"]} · Closed {counts["closed"]} · Follow-ups{" "}
              {counts["followup"]}
              {counts["dueToday"] ? ` (${counts["dueToday"]} due)` : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportCsv}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
            >
              Export CSV
            </button>
            <button
              onClick={signOut}
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Sign out
            </button>
          </div>
        </header>

        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.keys(TAB_LABEL) as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "border border-input bg-background text-foreground hover:bg-accent"
              }`}
            >
              {TAB_LABEL[t]}
              {t !== "all" ? ` (${counts[t] ?? 0})` : ""}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, mobile, email, product, invoice…"
            className="min-w-[220px] flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          />
          {tab === "all" ? (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | Status)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            >
              <option value="all">All status</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          ) : null}
        </div>

        {isLoading ? (
          <p className="mt-6 text-sm text-muted-foreground">Loading leads…</p>
        ) : error ? (
          <p className="mt-6 text-sm text-destructive">
            Could not load leads. You may not have access.
          </p>
        ) : filtered.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">No leads found.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[980px] text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Contact</th>
                  <th className="px-3 py-2">Product</th>
                  {tab === "converted" ? (
                    <>
                      <th className="px-3 py-2">Purchased</th>
                      <th className="px-3 py-2">Amount</th>
                      <th className="px-3 py-2">Invoice</th>
                    </>
                  ) : (
                    <>
                      <th className="px-3 py-2">Purpose</th>
                      <th className="px-3 py-2">Follow-up</th>
                      <th className="px-3 py-2">Status</th>
                    </>
                  )}
                  <th className="px-3 py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id} className="border-t border-border align-top">
                    <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">
                      {fmtDate(lead)}
                    </td>
                    <td className="px-3 py-2">
                      <div className="font-medium text-foreground">{lead.name || "—"}</div>
                      <div className="text-xs text-muted-foreground">{lead.company}</div>
                    </td>
                    <td className="px-3 py-2">
                      <div>{lead.mobile}</div>
                      <div className="text-xs text-muted-foreground">{lead.email}</div>
                    </td>
                    <td className="px-3 py-2">{lead.product || "—"}</td>
                    {tab === "converted" ? (
                      <>
                        <td className="px-3 py-2">{lead.purchase_product || "—"}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {lead.purchase_amount ? `₹${lead.purchase_amount}` : "—"}
                        </td>
                        <td className="px-3 py-2">{lead.invoice_no || "—"}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-3 py-2">{lead.purpose || "—"}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {lead.followup_date ? (
                            <span
                              className={
                                lead.followup_date <= todayIso
                                  ? "font-medium text-destructive"
                                  : "text-foreground"
                              }
                            >
                              {lead.followup_date}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              mutation.mutate({ id: lead.id, status: e.target.value as Status })
                            }
                            className={`rounded-md px-2 py-1 text-xs font-medium ${STATUS_CLASS[lead.status]}`}
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                      </>
                    )}
                    <td className="px-3 py-2">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setOpenId(lead.id)}
                          className="rounded-md border border-input px-2 py-1 text-xs text-foreground hover:bg-accent"
                        >
                          Open
                        </button>
                        {lead.status === "converted" ? (
                          <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
                            Converted
                          </span>
                        ) : (
                          <button
                            onClick={() => mutation.mutate({ id: lead.id, mark_converted: true })}
                            className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                          >
                            Convert
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {openLead ? (
        <LeadDrawer
          lead={openLead}
          saving={mutation.isPending}
          onClose={() => setOpenId(null)}
          onSave={(patch) => mutation.mutate(patch)}
        />
      ) : null}
    </div>
  );
}

function LeadDrawer({
  lead,
  saving,
  onClose,
  onSave,
}: {
  lead: Lead;
  saving: boolean;
  onClose: () => void;
  onSave: (patch: Patch) => void;
}) {
  const [form, setForm] = useState({
    status: lead.status as Status,
    followup_date: lead.followup_date ?? "",
    followup_note: lead.followup_note ?? "",
    notes: lead.notes ?? "",
    purchase_product: lead.purchase_product ?? "",
    purchase_amount: lead.purchase_amount != null ? String(lead.purchase_amount) : "",
    invoice_no: lead.invoice_no ?? "",
  });

  useEffect(() => {
    setForm({
      status: lead.status,
      followup_date: lead.followup_date ?? "",
      followup_note: lead.followup_note ?? "",
      notes: lead.notes ?? "",
      purchase_product: lead.purchase_product ?? "",
      purchase_amount: lead.purchase_amount != null ? String(lead.purchase_amount) : "",
      invoice_no: lead.invoice_no ?? "",
    });
  }, [lead]);

  function submit(markConverted: boolean) {
    const amount = form.purchase_amount.trim();
    onSave({
      id: lead.id,
      status: form.status,
      followup_date: form.followup_date ? form.followup_date : null,
      followup_note: form.followup_note,
      notes: form.notes,
      purchase_product: form.purchase_product,
      purchase_amount: amount === "" ? null : Number(amount),
      invoice_no: form.invoice_no,
      ...(markConverted ? { mark_converted: true } : {}),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div
        className="h-full w-full max-w-xl overflow-y-auto bg-background p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{lead.name || "Lead"}</h2>
            <p className="text-sm text-muted-foreground">{fmtDate(lead)}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-input px-2 py-1 text-sm text-foreground hover:bg-accent"
          >
            Close
          </button>
        </div>

        <section className="mt-5 rounded-lg border border-border p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Enquiry details
          </h3>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <Field label="Name" value={lead.name} />
            <Field label="Company" value={lead.company} />
            <Field label="Mobile" value={lead.mobile} />
            <Field label="Email" value={lead.email} />
            <Field label="GSTIN" value={lead.gstin} />
            <Field label="City" value={lead.city} />
            <Field label="State" value={lead.state} />
            <Field label="Product interested" value={lead.product} />
            <Field label="Purpose" value={lead.purpose} />
            <Field label="Page" value={lead.page} />
            <div className="sm:col-span-2">
              <Field label="Address" value={lead.address} />
            </div>
          </dl>
        </section>

        <section className="mt-4 rounded-lg border border-border p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Follow-up
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="text-muted-foreground">Status</span>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="text-muted-foreground">Next follow-up date</span>
              <input
                type="date"
                value={form.followup_date}
                onChange={(e) => setForm({ ...form, followup_date: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
          </div>
          <label className="mt-3 block text-sm">
            <span className="text-muted-foreground">Follow-up remark</span>
            <textarea
              rows={3}
              value={form.followup_note}
              onChange={(e) => setForm({ ...form, followup_note: e.target.value })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="mt-3 block text-sm">
            <span className="text-muted-foreground">Internal notes</span>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
        </section>

        <section className="mt-4 rounded-lg border border-border p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Purchase / conversion
          </h3>
          {lead.converted_at ? (
            <p className="mt-2 text-sm text-emerald-700">
              Converted on {new Date(lead.converted_at).toLocaleString("en-IN")}
            </p>
          ) : null}
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="text-muted-foreground">Purchased product</span>
              <input
                value={form.purchase_product}
                onChange={(e) => setForm({ ...form, purchase_product: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="text-muted-foreground">Amount (₹)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.purchase_amount}
                onChange={(e) => setForm({ ...form, purchase_amount: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm sm:col-span-2">
              <span className="text-muted-foreground">Invoice number</span>
              <input
                value={form.invoice_no}
                onChange={(e) => setForm({ ...form, invoice_no: e.target.value })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
          </div>
        </section>

        <div className="mt-5 flex flex-wrap gap-2 pb-6">
          <button
            onClick={() => submit(false)}
            disabled={saving}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          {lead.status === "converted" ? null : (
            <button
              onClick={() => submit(true)}
              disabled={saving}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              Save &amp; mark converted
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-foreground break-words">{value || "—"}</dd>
    </div>
  );
}
