---
title: "How to Export Deals From HubSpot With Their Associated Contacts"
excerpt: "A HubSpot deal export gives you the contact as a 'Name (email)' label, not real fields. Here's how to export both objects and join them on Record ID."
tag: guides
author: sikandar
date: "2026-08-25"
readingTime: 8
featured: false
thumbnail: swap
---

<figure style="margin:0 0 2.5rem">
<svg viewBox="0 0 1200 462" width="100%" style="height:auto;display:block" role="img" aria-label="A HubSpot deals export row shows the contact as a single label, Sam Lee (sam@acme.com), plus Contact ID 8842 — but no phone, company, or stage. A separate contacts export has Record ID 8842 with those fields. Joining the two on Record ID produces one row with the deal and the contact's full details.">
<defs>
<filter id="hx" x="-20%" y="-40%" width="140%" height="180%"><feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.10"/></filter>
<pattern id="hxdots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="var(--ink)" opacity="0.04"/></pattern>
<marker id="hxa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--ink-4)"/></marker>
<style>.he{font:600 13px system-ui,-apple-system,Segoe UI,sans-serif;letter-spacing:2px}.bl{font:600 11px system-ui,-apple-system,Segoe UI,sans-serif;letter-spacing:1.5px}.chip{font:500 13.5px system-ui,-apple-system,Segoe UI,sans-serif}.jn{font:500 12.5px system-ui,-apple-system,Segoe UI,sans-serif}</style>
</defs>
<rect x="1" y="1" width="1198" height="460" rx="28" fill="var(--surface-2)" stroke="var(--line)" stroke-width="1.5"/>
<rect x="1" y="1" width="1198" height="460" rx="28" fill="url(#hxdots)"/>
<text class="he" x="600" y="54" text-anchor="middle" fill="var(--accent-ink)">A DEAL EXPORT GIVES YOU A LABEL — NOT THE CONTACT'S FIELDS</text>

<!-- Band 1: Deals export -->
<rect x="60" y="82" width="1080" height="96" rx="16" fill="var(--surface)" stroke="var(--line-2)" stroke-width="1.5" filter="url(#hx)"/>
<text class="bl" x="84" y="112" fill="var(--ink-3)">DEALS EXPORT</text>
<rect x="84" y="130" width="190" height="34" rx="17" fill="var(--surface-2)" stroke="var(--line-2)" stroke-width="1.5"/><text class="chip" x="179" y="152" text-anchor="middle" fill="var(--ink-2)">Deal · Acme renewal</text>
<rect x="294" y="130" width="292" height="34" rx="17" fill="var(--surface-2)" stroke="var(--line-2)" stroke-width="1.5"/><text class="chip" x="440" y="152" text-anchor="middle" fill="var(--ink-2)">Contact · Sam Lee (sam@acme.com)</text>
<rect x="606" y="130" width="176" height="34" rx="17" fill="var(--accent-soft)" stroke="var(--accent-line)" stroke-width="1.5"/><text class="chip" x="694" y="152" text-anchor="middle" fill="var(--accent-ink)">Contact ID · 8842</text>
<rect x="802" y="130" width="300" height="34" rx="17" fill="var(--warn-soft)"/><text class="chip" x="952" y="152" text-anchor="middle" fill="var(--warn-ink)">Phone · Company · Stage — missing</text>

<line x1="600" y1="182" x2="600" y2="210" stroke="var(--ink-4)" stroke-width="1.5" marker-end="url(#hxa)"/>
<text class="jn" x="616" y="201" fill="var(--ink-3)">match on Record ID 8842</text>

<!-- Band 2: Contacts export -->
<rect x="60" y="214" width="1080" height="96" rx="16" fill="var(--surface)" stroke="var(--line-2)" stroke-width="1.5" filter="url(#hx)"/>
<text class="bl" x="84" y="244" fill="var(--ink-3)">CONTACTS EXPORT</text>
<rect x="84" y="262" width="188" height="34" rx="17" fill="var(--accent-soft)" stroke="var(--accent-line)" stroke-width="1.5"/><text class="chip" x="178" y="284" text-anchor="middle" fill="var(--accent-ink)">Record ID · 8842</text>
<rect x="284" y="262" width="250" height="34" rx="17" fill="var(--surface-2)" stroke="var(--line-2)" stroke-width="1.5"/><text class="chip" x="409" y="284" text-anchor="middle" fill="var(--ink-2)">Email · sam@acme.com</text>
<rect x="546" y="262" width="236" height="34" rx="17" fill="var(--surface-2)" stroke="var(--line-2)" stroke-width="1.5"/><text class="chip" x="664" y="284" text-anchor="middle" fill="var(--ink-2)">Phone · (555) 010-2843</text>
<rect x="794" y="262" width="168" height="34" rx="17" fill="var(--surface-2)" stroke="var(--line-2)" stroke-width="1.5"/><text class="chip" x="878" y="284" text-anchor="middle" fill="var(--ink-2)">Company · Acme Inc</text>
<rect x="972" y="262" width="132" height="34" rx="17" fill="var(--surface-2)" stroke="var(--line-2)" stroke-width="1.5"/><text class="chip" x="1038" y="284" text-anchor="middle" fill="var(--ink-2)">Stage · Lead</text>

<line x1="600" y1="314" x2="600" y2="342" stroke="var(--ink-4)" stroke-width="1.5" marker-end="url(#hxa)"/>
<text class="jn" x="616" y="333" fill="var(--ink-3)">join contacts onto deals</text>

<!-- Band 3: Joined -->
<rect x="60" y="346" width="1080" height="98" rx="16" fill="var(--accent-soft)" stroke="var(--accent-line)" stroke-width="1.5"/>
<text class="bl" x="84" y="376" fill="var(--accent-ink)">JOINED — ONE CLEAN ROW</text>
<rect x="84" y="394" width="176" height="34" rx="17" fill="var(--surface)" stroke="var(--accent-line)" stroke-width="1.5"/><text class="chip" x="172" y="416" text-anchor="middle" fill="var(--ink)">Acme renewal</text>
<rect x="272" y="394" width="110" height="34" rx="17" fill="var(--surface)" stroke="var(--accent-line)" stroke-width="1.5"/><text class="chip" x="327" y="416" text-anchor="middle" fill="var(--ink)">$4,000</text>
<rect x="394" y="394" width="140" height="34" rx="17" fill="var(--surface)" stroke="var(--accent-line)" stroke-width="1.5"/><text class="chip" x="464" y="416" text-anchor="middle" fill="var(--ink)">Sam Lee</text>
<rect x="546" y="394" width="220" height="34" rx="17" fill="var(--surface)" stroke="var(--accent-line)" stroke-width="1.5"/><text class="chip" x="656" y="416" text-anchor="middle" fill="var(--ink)">sam@acme.com</text>
<rect x="778" y="394" width="200" height="34" rx="17" fill="var(--surface)" stroke="var(--accent-line)" stroke-width="1.5"/><text class="chip" x="878" y="416" text-anchor="middle" fill="var(--ink)">Acme Inc · Lead</text>
</svg>
</figure>

You exported your deals to move them somewhere else. You opened the file, went looking for each deal's contact — and found a single cell: `Kimberly Rogers (erichahn@example.net)`. A name and an email, mashed together, and nothing else. No phone, no company, no lifecycle stage — none of the fields you'd actually migrate.

Here's the short answer, up front: **in HubSpot, deals and contacts are separate objects. A deals export gives you the associated contact as a label — its name, usually with the email in parentheses — plus the contact's Record ID. It does not give you the contact's properties.** It looks like contact data; it isn't. To get clean, complete contact details lined up with each deal, you export *both* objects and join them on Record ID — the whole job, laid out below.

## Why you get a label, not the contact's fields

HubSpot doesn't store a contact as a field on a deal. It stores them as two different record types — two objects — with an *association* linking them. A deal points at a contact; it doesn't contain one.

When you export deals, HubSpot gives you the deal's own properties plus a column for each association. An association column can *name* the record on the other end — its label and its ID — but it can't reach inside that record and pull the fields that live there: phone, company, lifecycle stage, job title, anything custom. For contacts, that label happens to include the email in parentheses, which is why the column looks more useful than it is. You get a name and an email in one cell, and none of the rest.

This isn't a setting you missed or a permission you need. It's the [data model](/blog/guides/leads-vs-contacts-vs-deals/) working exactly as designed. Most guides skip straight to the workaround without explaining it — which is why the fix feels like a hack instead of the intended path.

## Method 1 — Export deals with their association columns

Start here. This gets you every deal and the link to its contact.

Open **CRM → Deals** and select the deals you want (or keep the whole view). Click **Export** to open the **Export view** dialog, then expand **Customize**. HubSpot's defaults are set to give you the *least* data, so three things need changing:

- **File format** → **CSV**. Set this first — including *all* associated records (below) requires CSV, and CSV has no column limit.
- **Properties included in export** → **All properties and all associations on records**. The default, *Properties and associations in your view*, only exports the columns you happen to have on screen.
- **Associations included in export** → **Include all associated records in each association column**, and leave **Include associated record name** ticked. The default, *up to 1,000 associated records*, silently truncates any deal with more than 1,000 of one association type.

<figure style="margin:2rem 0">
<img src="/blog/hs-export-customize-dialog.png" alt="HubSpot's Export view dialog with Customize expanded: file format CSV, 'Properties included in export' set to 'All properties and all associations on records', and 'Associations included in export' set to 'Include all associated records in each association column'." style="width:100%;display:block;margin:0;border-radius:12px;border:1px solid var(--line);box-shadow:0 8px 30px -12px var(--scrim)" />
<figcaption style="margin-top:0.7rem;font-size:0.85rem;line-height:1.5;color:var(--ink-4);text-align:center">HubSpot's Export view dialog in my own account — the settings that decide whether contact data comes through, and its own note that associations carry only the record's name and ID.</figcaption>
</figure>

HubSpot spells out the catch right there in the dialog. Under "Data included in export," it says the association columns hold the **associated record name and associated record ID** — a label and a number, nothing else about that contact. Open the file: one row per deal, the deal's own properties, then — far to the right, after a long run of association columns for every object type, most of them empty — the two that matter. **Associated Contact** holds the contact's label: `Kimberly Rogers (erichahn@example.net)`, name and email in one cell. **Associated Contact IDs** holds the Record ID, like `533497883354`. What you *don't* get is a clean email, phone, company, lifecycle stage, or any other field — and some deals have no contact at all, so those cells are blank. Method 1 gets you a label and a link, not the contact's details.

<figure style="margin:2rem 0">
<img src="/blog/hs-deal-export-columns.png" alt="A HubSpot deals export in a spreadsheet, showing the Associated Contact column holding a name-and-email label in one cell and the Associated Contact IDs column holding the contact's Record ID, with none of the contact's other fields on the deal row." style="width:100%;display:block;margin:0;border-radius:12px;border:1px solid var(--line);box-shadow:0 8px 30px -12px var(--scrim)" />
<figcaption style="margin-top:0.7rem;font-size:0.85rem;line-height:1.5;color:var(--ink-4);text-align:center">The actual export: the contact reduced to a <code>Name (email)</code> label plus a separate ID column — and none of the contact's other fields.</figcaption>
</figure>

## Method 2 — Export contacts filtered by deal properties

Sometimes you don't want deals at all — you want the *people*, filtered by something about their deals. "Everyone with an open deal over $5,000," say, for an outreach list.

For that, build an **active list** with a **deal-property filter** and export the list. You get full contact properties — email, phone, lifecycle stage — for that segment, but no deal values on the row; a contact export is contact data.

Right tool when you're pulling a segment to *contact*; wrong tool when you're *migrating* and need the deal and contact on one line. For that, you need both exports and a join.

## Method 3 — Export both and join on Record ID

This is where every forum thread ends up, usually with someone saying "just VLOOKUP it." Here's the actual procedure.

1. **Export your deals** (Method 1). Keep the column with the associated contact's Record ID.
2. **Export your contacts**, making sure **Record ID** is included along with the properties you want — email, phone, whatever you're migrating.
3. **Join them in your spreadsheet**, matching the deal's contact ID against the contact's Record ID.

The formula, in Google Sheets or Excel. Say the deal's contact ID sits in column `F`, and your contacts export has Record ID in column `A` and Email in column `D`:

```
=XLOOKUP(F2, Contacts!$A:$A, Contacts!$D:$D)
```

Or the classic, if you're on older Excel — the `FALSE` is not optional, because Record IDs aren't sorted:

```
=VLOOKUP(F2, Contacts!$A:$D, 4, FALSE)
```

Then the three things that will bite you:

- **One deal with several contacts.** The association cell holds multiple IDs, semicolon-separated (`8842; 8843`). A plain lookup only reads the first. Split the cell into columns first (**Data → Split text to columns**, on `;`), or run the join from the contact side instead.
- **One contact on several deals.** Joining contacts onto deals means that contact repeats — once per deal. That's correct for a deal-level file. Don't "remove duplicates" by contact, or you'll delete real deals.
- **Why Record ID, and not the email in the label.** The deal's *Associated Contact* cell shows an email, but don't join on it — it's fused to the name, missing on contacts that have none, and shared across several contacts when a deal has more than one. Emails also get reused (`info@`), changed, and shared. The **Associated Contact IDs** column is the clean, unique, permanent key. Join on that.

## What never comes out, no matter which method

Notes, logged emails, calls, meetings, tasks — HubSpot's *engagements* — are not in a deal or contact export at all. A record export is properties and associations. That's the whole scope.

If you need the activity history too, that's a separate route: an individual record's data export, an engagement/activity report, or the engagements API. Check this before you cancel — the missing activity timeline is what people discover the week *after* they've moved everything else and turned HubSpot off.

## Limits worth knowing before you start

- **300 exports per rolling 24 hours, three at a time** in the UI. (The export API is stricter — 30 per 24 hours, one at a time.) Batch accordingly.
- **A CSV auto-zips once it's over 2MB.** Expect a `.zip`, not a raw `.csv`, on any real dataset.
- **Column caps are a format problem, not a HubSpot one.** XLS tops out at 256 columns, XLSX at 16,384. CSV has no column limit — which, with "all properties and associations," is exactly why you pick CSV.
- **Download links expire after 30 days.** Miss the window and you re-export. (The export log itself stays visible far longer.)
- **Export has to be enabled on your user role.** If you don't see the Export button, that's why — an admin has to grant it.

## A clean export, and where to send it

Done right, the file that lands in your next CRM has one row per deal with the contact's name, email, and phone already attached — no orphaned IDs, no VLOOKUP graveyard in a side tab. That's the finish line, and it's very reachable once you know deals and contacts come out separately and join on Record ID.

### Moving off HubSpot? We'll do this part for you.

This is exactly the cleanup our **free migration help** handles. Tell us what you're moving and we'll pull your deals, contacts, and the associations between them into one clean file — Record IDs matched, contact details on every deal row — or load it straight into nrtur. No forum threads, no orphaned IDs.

Email **hello@nrtur.io** with a sentence or two about your setup, and we'll take it from there. If you're weighing where to land, our rundown of the [best HubSpot alternatives for small teams](/blog/alternatives/best-hubspot-alternatives/) is a good place to start.

## FAQ

**Does a HubSpot deal export include the contact's email?**
Only as part of a label. The **Associated Contact** column shows the contact as `Name (email)` — so the email is technically there, but fused to the name in one cell, not a clean field, and with none of the contact's other properties (phone, company, lifecycle stage). For usable contact data, export contacts separately and join on Record ID.

**Can I export deals with contact details in a single file?**
Not in one native export. You export deals and contacts separately, then join them in a spreadsheet on Record ID. There's no HubSpot setting that flattens a contact's properties onto a deal row for you.

**What's the difference between exporting a list and exporting from the Deals index?**
The Deals index export is deal-centric — one row per deal, with contact links as association columns. A list export (Method 2) is contact-centric — one row per contact, filtered however you like, but with no deal values on the row.

**Do HubSpot exports include notes, emails, and activities?**
No. Record exports contain properties and associations, not engagements. Activity history needs a separate export route or the API.

**Which contact ID do I join on — Record ID or email?**
Record ID. It's unique and permanent. Emails repeat across shared inboxes, change over time, and are sometimes blank, so they make an unreliable key.

---

*Settings and limits here were checked against HubSpot's export documentation and a live export run in August 2026. HubSpot changes this UI periodically — if a label or cap looks different on your screen, trust your screen.*
