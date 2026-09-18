# TaxPower CRM navigation and lead-detail redesign

## What will change
- Replace the current single CRM screen with a fixed left menu containing **Dashboard**, **Leads**, and **Clients**.
- Keep the CRM fully separate from the public TaxPower website and retain the existing protected login.
- Remove the **Open** button. Clicking anywhere on a lead/client row will open its full details.
- Rework the detail panel into a clear form-style view matching the structure and visual character of the existing enquiry form, while retaining status, follow-up, notes, purchase details, save, and conversion actions.

## Pages
- **Dashboard:** consolidated totals for today's leads, total leads, pending follow-ups, and converted clients; simple visual bars for lead status and conversion summary; recent leads and due follow-ups.
- **Leads:** all leads with search, status filter, follow-up filter, CSV export, inline status update, and a separate Convert action beside each row.
- **Clients:** only converted/purchased clients, with purchase product, amount, invoice, search, export, and clickable rows.

## Responsive behavior
- Desktop uses a collapsible left sidebar and full-width data area.
- Mobile uses a compact menu trigger, stacked summary blocks, and horizontally scrollable tables without overlapping content.

## Security and scope
- All three pages stay behind the existing authenticated admin check and server-side role verification.
- No menu or link will be added to the public website.
- Existing static HTML, CSS, and JavaScript website files will not be changed.

## Technical details
- Use separate protected routes for `/crm`, `/crm/leads`, and `/crm/clients` under the existing authenticated layout.
- Share one CRM shell, lead table, and form-style detail panel to avoid inconsistent behavior.
- Continue using the existing leads database and secured server functions; no data migration is required.
