import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";

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
  status: "new" | "contacted" | "converted" | "closed";
  notes: string;
};

const STATUSES = ["new", "contacted", "converted", "closed"] as const;

const STATUS_CLASS: Record<Lead["status"], string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-amber-100 text-amber-900",
  converted: "bg-emerald-100 text-emerald-800",
  closed: "bg-slate-200 text-slate-700",
};

function CrmDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchLeads = useServerFn(listLeads);
  const saveLead = useServerFn(updateLead);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Lead["status"]>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["crm-leads"],
    queryFn: () => fetchLeads(),
  });

  const mutation = useMutation({
    mutationFn: (vars: { id: string; status?: Lead["status"]; notes?: string }) =>
      saveLead({ data: vars }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["crm-leads"] }),
  });

  const leads = (data?.leads ?? []) as Lead[];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((lead) => {
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
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
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [leads, search, statusFilter]);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: leads.length };
    for (const s of STATUSES) base[s] = leads.filter((l) => l.status === s).length;
    return base;
  }, [leads]);

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
      "Notes",
    ];
    const escape = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = filtered.map((l) =>
      [
        l.submitted_at_text || new Date(l.submitted_at).toLocaleString("en-IN"),
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
        l.notes,
      ]
        .map(escape)
        .join(","),
    );
    const csv = [headers.map(escape).join(","), ...rows].join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `taxpower-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-foreground">TaxPower CRM</h1>
            <p className="text-sm text-muted-foreground">
              {counts["all"]} leads · New {counts["new"]} · Contacted {counts["contacted"]} ·
              Converted {counts["converted"]} · Closed {counts["closed"]}
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
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, mobile, email, product…"
            className="min-w-[220px] flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          >
            <option value="all">All status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
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
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Contact</th>
                  <th className="px-3 py-2">Product</th>
                  <th className="px-3 py-2">Purpose</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <>
                    <tr key={lead.id} className="border-t border-border align-top">
                      <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">
                        {lead.submitted_at_text ||
                          new Date(lead.submitted_at).toLocaleString("en-IN")}
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
                      <td className="px-3 py-2">{lead.purpose || "—"}</td>
                      <td className="px-3 py-2">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            mutation.mutate({
                              id: lead.id,
                              status: e.target.value as Lead["status"],
                            })
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
                      <td className="px-3 py-2 text-right">
                        <button
                          onClick={() => setOpenId(openId === lead.id ? null : lead.id)}
                          className="rounded-md border border-input px-2 py-1 text-xs text-foreground hover:bg-accent"
                        >
                          {openId === lead.id ? "Hide" : "Details"}
                        </button>
                      </td>
                    </tr>
                    {openId === lead.id ? (
                      <tr key={`${lead.id}-details`} className="border-t border-border bg-muted/30">
                        <td colSpan={7} className="px-3 py-3">
                          <div className="grid gap-2 text-sm sm:grid-cols-2">
                            <div>
                              <span className="text-muted-foreground">GSTIN: </span>
                              {lead.gstin || "—"}
                            </div>
                            <div>
                              <span className="text-muted-foreground">City / State: </span>
                              {[lead.city, lead.state].filter(Boolean).join(", ") || "—"}
                            </div>
                            <div className="sm:col-span-2">
                              <span className="text-muted-foreground">Address: </span>
                              {lead.address || "—"}
                            </div>
                            <div className="sm:col-span-2">
                              <span className="text-muted-foreground">Page: </span>
                              {lead.page || "—"}
                            </div>
                          </div>
                          <NotesEditor
                            initial={lead.notes}
                            saving={mutation.isPending}
                            onSave={(notes) => mutation.mutate({ id: lead.id, notes })}
                          />
                        </td>
                      </tr>
                    ) : null}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function NotesEditor({
  initial,
  saving,
  onSave,
}: {
  initial: string;
  saving: boolean;
  onSave: (notes: string) => void;
}) {
  const [value, setValue] = useState(initial);
  return (
    <div className="mt-3">
      <label className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Notes
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
      />
      <button
        onClick={() => onSave(value)}
        disabled={saving || value === initial}
        className="mt-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save note"}
      </button>
    </div>
  );
}
