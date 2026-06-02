# Nrtur CRM — Product Requirements Document

> **Audience:** Backend & Frontend engineers
> **Status:** MVP build spec
> **Last updated:** 2026-06-02

This document describes everything needed to build the Nrtur CRM. It is organised so a
frontend engineer can build screens against a known contract, and a backend engineer can
build APIs and data models against the same contract. The visual prototype lives in
`/prototype` (open `prototype/index.html` over HTTP, not `file://`).

---

## 1. Product Overview

**Nrtur** is a lightweight CRM for small businesses and teams of **1–5 people**. It combines
contact management, a visual sales pipeline, two-way SMS + email, drip sequences, and simple
automations in one place. The goal is "the CRM a 2-person agency actually uses" — fast,
opinionated, and not bloated like enterprise tools.

### Core value props
- Manage contacts and deals without spreadsheets
- Two-way SMS and email from inside the CRM
- Automate repetitive follow-ups (sequences + workflow automations)
- See pipeline health and team activity at a glance

### Target user
Owner/operator or small sales team. Not technical. Needs setup in minutes, not days.

---

## 2. Users, Roles & Permissions

| Role | Description | Key permissions |
|------|-------------|-----------------|
| **Owner** | Created the workspace, billing holder | Everything incl. billing, delete workspace, manage team |
| **Admin** | Trusted team member | Manage contacts/deals/automations, invite users, settings (not billing) |
| **Member** | Standard sales user | Manage own + shared contacts/deals, send messages, run sequences |
| **Viewer** *(V1)* | Read-only stakeholder | View dashboards, contacts, reports — no edits |

- A user belongs to exactly **one workspace** in MVP (multi-workspace is post-V1).
- All data is **scoped to a workspace** (multi-tenant). Every query MUST filter by `workspace_id`.
- Record ownership: contacts/deals have an `owner_id`. Members see their own + shared records;
  Admins/Owners see all.

---

## 3. Tech Stack

### Frontend (existing)
- React 18 + TypeScript
- Vite (build), Tailwind CSS (styling)
- `lucide-react` (icons), `framer-motion` (animation)
- State: local React state for MVP; introduce a data layer (React Query / TanStack Query)
  for server state. No Redux needed.
- Routing: the prototype uses state-based routing. Production should use **React Router**.

### Backend (to decide — recommendation)
- **Node.js + TypeScript** (NestJS or Express) OR **Python (FastAPI/Django)** — pick one.
- **PostgreSQL** as primary DB (relational data, multi-tenant).
- **Redis** for job queues + rate limiting + caching.
- **Background workers** for sending sequences/automations on a schedule (BullMQ / Celery).
- **Object storage** (S3-compatible) for attachments/avatars.
- Auth: JWT access + refresh tokens, or a managed provider (Auth0/Clerk/Supabase Auth).

### Third-party services
| Service | Purpose |
|---------|---------|
| **Twilio** (and/or **Vonage**) | SMS/MMS send + receive (webhooks) |
| **SendGrid / Postmark / SES** | Transactional + sequence email send + delivery/open/click webhooks |
| **Stripe** | Billing & subscriptions |
| **Calendly** *(V1)* | Meeting scheduling embed |
| **Slack** *(optional)* | Automation notifications |

---

## 4. System Architecture (high level)

```
┌──────────────┐      HTTPS/JSON      ┌──────────────────┐
│  React SPA   │ ───────────────────▶ │   REST API       │
│ (Vite build) │ ◀─────────────────── │  (auth, CRUD)    │
└──────────────┘                      └────────┬─────────┘
                                               │
              ┌────────────────────────────────┼───────────────────┐
              ▼                ▼                ▼                    ▼
        ┌──────────┐    ┌──────────┐    ┌────────────┐      ┌──────────────┐
        │ Postgres │    │  Redis   │    │  Workers   │      │  Webhooks    │
        │  (data)  │    │ (queue)  │    │ (sequences │      │ (Twilio/email│
        └──────────┘    └──────────┘    │ automation)│      │  inbound)    │
                                        └────────────┘      └──────────────┘
```

- **Webhooks IN:** Twilio (inbound SMS, delivery status), email provider (delivered, opened,
  clicked, bounced, unsubscribed). These drive timeline events + sequence step logic.
- **Workers:** evaluate due sequence steps + automation triggers on a schedule, enqueue sends.

---

## 5. Data Models

Field types are indicative. All tables include `id (uuid)`, `workspace_id (uuid, FK)`,
`created_at`, `updated_at`. Soft-delete with `deleted_at` where noted.

### 5.1 Workspace
```
workspace
  id, name, plan ('free'|'pro'|'business'), timezone,
  default_sending_number (phone), default_from_email,
  spending_cap_cents (nullable), settings (jsonb)
```

### 5.2 User
```
user
  id, workspace_id, email (unique), name, avatar_url,
  role ('owner'|'admin'|'member'|'viewer'),
  status ('active'|'invited'|'disabled'),
  last_active_at, two_factor_enabled (bool)
```

### 5.3 Contact
```
contact
  id, workspace_id, owner_id (FK user),
  first_name, last_name, email, phone,
  company, title, location,
  status ('lead'|'prospect'|'customer'|'lost' + custom),
  tags (text[]),
  source ('manual'|'import'|'form'|'api'),
  health_score (int, nullable),        -- V1
  sms_opt_out (bool), email_opt_out (bool),
  last_contacted_at, deleted_at
```

### 5.4 Deal
```
deal
  id, workspace_id, owner_id, contact_id (FK),
  name, amount_cents, currency,
  stage_id (FK pipeline_stage),
  status ('open'|'won'|'lost'),
  expected_close_date,
  last_activity_at,
  deleted_at
```

### 5.5 Pipeline Stage (configurable per workspace)
```
pipeline_stage
  id, workspace_id, name, position (int),
  is_archived (bool)
  -- e.g. Lead, Qualified, Proposal, Negotiation, Closed
```

### 5.6 Activity / Timeline Event
The unified feed shown on Contact Detail and Deal Detail.
```
activity
  id, workspace_id, contact_id (nullable), deal_id (nullable),
  user_id (nullable, who did it),
  type ('note'|'sms'|'email'|'call'|'stage_change'|'task'|'system'),
  direction ('inbound'|'outbound'|null),
  body (text),
  metadata (jsonb),   -- e.g. {subject, message_sid, status}
  occurred_at
```

### 5.7 Message (SMS / Email)
```
message
  id, workspace_id, contact_id, user_id (sender, nullable for inbound),
  channel ('sms'|'mms'|'email'),
  direction ('inbound'|'outbound'),
  from_address, to_address,
  subject (email only), body,
  status ('queued'|'sent'|'delivered'|'failed'|'received'),
  provider ('twilio'|'vonage'|'sendgrid'|...),
  provider_message_id,
  -- email engagement:
  opened_at, clicked_at, bounced_at,
  sequence_id (nullable), sequence_step_id (nullable),
  created_at
```

### 5.8 Sequence (SMS or Email drip)
```
sequence
  id, workspace_id, name,
  channel ('sms'|'email'),
  status ('active'|'paused'|'draft'),
  enrollment_trigger ('manual'|'contact_created'|'deal_stage'|'tag_added'
                     |'form_submitted'|'automation'|'sequence_reply'),
  trigger_config (jsonb),   -- e.g. {stage_id} or {tag}
  created_by (FK user)
```

### 5.9 Sequence Step
```
sequence_step
  id, sequence_id, position (int),
  delay_type ('immediate'|'hours'|'days'|'weeks'|'custom'),
  delay_value (int),
  -- SMS:
  message_body (text),
  -- Email:
  subject, email_body,
  -- condition logic:
  skip_condition ('none'|'no_reply'|'not_opened'),
  skip_to_step_id (nullable)
```

### 5.10 Sequence Enrollment (a contact moving through a sequence)
```
sequence_enrollment
  id, workspace_id, sequence_id, contact_id,
  current_step_id, status ('active'|'completed'|'exited'|'replied'),
  enrolled_at, next_send_at, completed_at,
  exit_reason (nullable)
```

### 5.11 Automation (event-triggered workflow)
```
automation
  id, workspace_id, name,
  status ('active'|'paused'),
  trigger ('contact_created'|'deal_stage_changed'|'deal_inactive'
          |'email_received'|'form_submitted'|'tag_added'|'sequence_replied'),
  trigger_config (jsonb),
  created_by
```

### 5.12 Automation Step (action node)
```
automation_step
  id, automation_id, position (int),
  action ('assign_rep'|'send_email'|'send_sms'|'create_task'|'notify_slack'
         |'set_reminder'|'add_to_sms_sequence'|'add_to_email_sequence'
         |'flag_review'|'generate_report'|'add_tag'|'move_stage'),
  config (jsonb),     -- action params, incl. delay for delayed actions
  branch (jsonb, nullable)   -- conditional branching (V1)
```

### 5.13 Automation Run (execution log)
```
automation_run
  id, automation_id, contact_id (nullable), deal_id (nullable),
  status ('success'|'failed'|'running'),
  started_at, finished_at,
  error_message (nullable),
  steps_log (jsonb)
```

### 5.14 Unsubscribe record
```
unsubscribe
  id, workspace_id, contact_id, channel ('sms'|'email'),
  reason (nullable), source, created_at
```

### 5.15 Integration credential
```
integration
  id, workspace_id, provider ('twilio'|'vonage'|'sendgrid'|'stripe'|'slack'|'calendly'),
  status ('connected'|'disconnected'|'error'),
  config (jsonb, encrypted),   -- API keys, phone numbers, etc.
  connected_at
```

---

## 6. API Specification

REST, JSON, `Authorization: Bearer <token>`. All list endpoints support
`?page`, `?limit`, `?sort`, and relevant filters. All responses scoped to the
authenticated user's workspace.

### 6.1 Auth
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/auth/signup` | Create workspace + owner user |
| POST | `/auth/login` | Email + password → tokens |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Invalidate refresh token |
| POST | `/auth/forgot-password` | Send reset email |
| POST | `/auth/reset-password` | Reset with token |
| GET  | `/auth/me` | Current user + workspace |
| POST | `/auth/2fa/enable` *(V1)* | Enable 2FA |

### 6.2 Onboarding
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/onboarding/workspace` | Set name, timezone, team size |
| POST | `/onboarding/import` | Import contacts (CSV) |
| POST | `/onboarding/complete` | Mark onboarding done |

### 6.3 Contacts
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/contacts` | List (filters: `status`, `tag`, `owner_id`, `q` search) |
| POST | `/contacts` | Create |
| GET | `/contacts/:id` | Detail (incl. linked deals + activity) |
| PATCH | `/contacts/:id` | Update (incl. inline status / owner reassign) |
| DELETE | `/contacts/:id` | Soft delete |
| POST | `/contacts/import` | Bulk import (CSV) + duplicate detection |
| POST | `/contacts/bulk` | Bulk action (tag, delete, reassign) |
| GET | `/contacts/:id/activity` | Timeline (filter by `type`, `q`) |

### 6.4 Deals & Pipeline
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/deals` | List (filters: `stage_id`, `status`, `owner_id`) |
| POST | `/deals` | Create |
| GET | `/deals/:id` | Detail |
| PATCH | `/deals/:id` | Update (incl. move stage → `stage_id`) |
| DELETE | `/deals/:id` | Soft delete |
| GET | `/pipeline` | Stages + deals grouped by stage (kanban payload) |
| GET/POST/PATCH/DELETE | `/pipeline/stages` | Manage custom stages (reorder via `position`) |

### 6.5 Messaging
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/inbox` | Unified inbox threads (SMS + email) |
| GET | `/inbox/:contactId` | Thread with one contact |
| POST | `/messages/sms` | Send SMS/MMS |
| POST | `/messages/email` | Send email |
| POST | `/webhooks/twilio/inbound` | Inbound SMS (Twilio → us) |
| POST | `/webhooks/twilio/status` | SMS delivery status |
| POST | `/webhooks/email/events` | Email delivered/opened/clicked/bounce/unsub |

### 6.6 Sequences
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/sequences?channel=sms\|email` | List sequences |
| POST | `/sequences` | Create (with steps) |
| GET | `/sequences/:id` | Detail + steps + stats |
| PATCH | `/sequences/:id` | Update (name, status, trigger) |
| DELETE | `/sequences/:id` | Delete (exits enrollments) |
| POST | `/sequences/:id/steps` | Add step |
| PATCH | `/sequences/:id/steps/:stepId` | Update step |
| DELETE | `/sequences/:id/steps/:stepId` | Remove step |
| POST | `/sequences/:id/enroll` | Enroll contact(s) manually |
| GET | `/sequences/:id/enrollments` | Enrolled contacts + status |

### 6.7 Automations
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/automations` | List |
| POST | `/automations` | Create (with steps) |
| GET | `/automations/:id` | Detail |
| PATCH | `/automations/:id` | Update (incl. activate/pause) |
| DELETE | `/automations/:id` | Delete |
| POST | `/automations/:id/test` | Test run against sample contact |
| GET | `/automations/:id/runs` | Run log (last N, with errors) |
| GET | `/automations/templates` | Prebuilt templates |

### 6.8 Reports
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/reports/overview` | KPIs (pipeline value, win rate, activity) |
| GET | `/reports/pipeline` | Stage conversion + velocity |
| GET | `/reports/messaging` | SMS/email volume + reply/open rates |
| GET | `/reports/usage` | Spend, message counts vs plan limits |

### 6.9 Settings
| Method | Path | Purpose |
|--------|------|---------|
| GET/PATCH | `/settings/general` | Workspace name, timezone, branding |
| GET/POST/PATCH/DELETE | `/settings/team` | Invite/manage users; remove → reassign records |
| GET/PATCH | `/settings/billing` | Plan, payment method, invoices (Stripe) |
| GET/POST/PATCH/DELETE | `/settings/pipeline` | Custom stages |
| GET | `/settings/unsubscribes` | Opt-out list; re-subscribe |
| GET/POST/DELETE | `/settings/integrations` | Connect Twilio/Vonage/email/Stripe/Slack |

---

## 7. Feature Requirements by Screen

Each screen maps to a prototype page (`prototype/proto/*.jsx`). FE = frontend behaviour,
BE = backend support.

### 7.1 Authentication & Onboarding (`pages-auth.jsx`)
- **Sign up / Sign in / Forgot password** — standard flows. BE: `/auth/*`.
- **4-step onboarding wizard:** (1) workspace name + timezone, (2) invite team,
  (3) connect messaging (Twilio/email), (4) import contacts. FE: progress indicator,
  skippable steps. BE: `/onboarding/*`.

### 7.2 Dashboard (`pages-dashboard.jsx`)
- KPI stat cards: pipeline value, open deals, win rate, activity this week.
- Recent activity feed, upcoming tasks, pipeline mini-chart.
- BE: `/reports/overview`. Customisable widgets are **V1**.

### 7.3 Contacts (`pages-contacts.jsx`)
- **List:** sortable table, filter panel (status/tag/owner), search, bulk-select toolbar
  (tag, delete, reassign), import modal with **duplicate detection**.
- **Contact Detail:** left = profile (editable owner dropdown, **inline status editor**),
  linked deals; right = **activity timeline** with filter tabs (All/SMS/Email/Calls/Notes)
  + search. Actions: send email/SMS, add note, edit, delete (confirm modal).
- **Add / Edit Contact:** form pages.
- BE: `/contacts/*`.

### 7.4 Pipeline (`pages-pipeline.jsx`)
- **Kanban board** grouped by stage; drag-and-drop to move deals (PATCH `stage_id`).
- **Deal health badges:** Stalled (no activity 7d+), At Risk (close date <7d, no activity),
  High Value (amount > threshold). Compute on BE or FE from deal fields.
- **Deal Detail:** amount, stage, contact, timeline, notes.
- **Add Deal:** form.
- BE: `/deals/*`, `/pipeline`.

### 7.5 Inbox / Messaging (`pages-email.jsx`)
- Unified thread list (SMS + email), conversation view, composer with template + token
  picker. Inbound messages appear in real time (webhook → store → push/poll).
- BE: `/inbox/*`, `/messages/*`, inbound webhooks.

### 7.6 Automations (`pages-automations.jsx`)
- **Workflows list:** cards with toggle (active/paused), trigger summary, run stats,
  sparkline, **Test** button, **error log** (last 5 runs). Templates section.
- **Automation Builder:** trigger selector + chained action nodes from the palette
  (assign rep, send email/SMS, create task, notify Slack, set reminder,
  **add to SMS/email sequence**, flag, generate report, add tag, move stage).
  Add/remove steps; delayed actions; branching is **V1**.
- BE: `/automations/*`, worker evaluates triggers + executes steps, logs runs.

### 7.7 Sequences (`pages-automations.jsx` → SMS/Email Sequences + Sequence Builder)
- **SMS Sequences & Email Sequences lists:** stats (active, sent, reply rate / open rate),
  per-sequence cards with enrolled/sent/replied (SMS) or opened/clicked (email), toggle,
  edit, delete.
- **Sequence Builder** (one builder, channel-aware):
  - Enrollment trigger selector.
  - Vertical step flow. Each step: **delay selector**, message composer
    (SMS: body + 160-char counter; Email: subject + body), **token picker**
    (`{{first_name}}` etc.), **condition toggle** ("if no reply → skip" /
    "if not opened → skip").
  - Add/remove steps; sequence info panel; tips.
- **How sequences relate to automations:** a sequence is a *scheduled multi-step channel
  campaign*; an automation is an *event-triggered workflow* that can **enroll contacts into
  a sequence** as one of its actions. Replies/opens can also trigger automations.
- BE: `/sequences/*`. Worker computes `next_send_at` per enrollment, sends due steps,
  evaluates skip conditions on reply/open webhooks, advances `current_step_id`.

### 7.8 Reports (`pages-reports.jsx`)
- Tabs: Overview, Pipeline, Messaging (SMS/Email), Usage. Charts + tables.
- BE: `/reports/*`.

### 7.9 Settings (`pages-settings.jsx`)
- Tabs: General, Team, Billing, Pipeline, Unsubscribes, Integrations, API.
- **Team:** invite, change role, remove user → **reassign their records** modal.
- **Billing:** Stripe plan, payment method, invoices, **spending cap** (V1).
- **Integrations:** Twilio/Vonage setup wizard (API keys → choose number → test send),
  email, Stripe, Slack.
- **Unsubscribes:** opt-out list, filter by channel, re-subscribe (confirm), export CSV.
- BE: `/settings/*`.

---

## 8. Key Workflows (sequence diagrams in prose)

### 8.1 Sending a sequence step
1. Worker polls `sequence_enrollment` where `status='active'` and `next_send_at <= now()`.
2. Loads the `current_step`; renders tokens against the contact.
3. Enqueues an SMS/email send via provider; creates a `message` row (`sequence_id`,
   `sequence_step_id`).
4. Advances enrollment: computes next step's `next_send_at` from its delay; if last step →
   `status='completed'`.

### 8.2 Skip condition (no reply / not opened)
1. On the next step's due time, check if the contact replied (SMS) / opened (email) since
   the previous step's send.
2. If the previous step had `skip_condition='no_reply'` (or `not_opened`) and condition met
   → jump to `skip_to_step_id` (or skip). Otherwise send normally.

### 8.3 Inbound SMS → timeline + sequence exit
1. Twilio posts to `/webhooks/twilio/inbound`.
2. Match `from` to a `contact`; create inbound `message` + `activity`.
3. If the contact has an active SMS enrollment → mark `status='replied'` (stops further
   sends) and optionally fire a `sequence_replied` automation trigger.

### 8.4 Automation enrolling into a sequence
1. Trigger fires (e.g. `contact_created`).
2. Worker executes steps in order; on `add_to_sms_sequence`/`add_to_email_sequence` it
   creates a `sequence_enrollment` for the contact.
3. Logs an `automation_run` with per-step results.

---

## 9. Non-Functional Requirements

- **Multi-tenancy:** every record scoped by `workspace_id`; enforce in middleware, never
  trust client-supplied workspace.
- **Auth:** JWT access (short TTL) + refresh; RBAC by role.
- **Rate limiting:** per-workspace send limits; respect provider limits; Redis-based.
- **Compliance:** honour SMS/email opt-outs globally; never send to opted-out contacts;
  include unsubscribe handling (STOP keyword for SMS, list-unsubscribe for email).
- **Idempotency:** webhooks must be idempotent (dedupe by `provider_message_id`).
- **Audit:** log who changed billing/team/integration settings.
- **Observability:** structured logs, error tracking (Sentry), job queue monitoring.
- **Performance:** list endpoints paginated; kanban + inbox should load < 500ms p95.
- **Security:** encrypt integration credentials at rest; HTTPS only; CSRF protection on
  cookie flows; validate + sanitise all inbound webhook payloads.

---

## 10. Scope: MVP vs V1

### MVP (build first)
Auth, onboarding, contacts (CRUD + import + bulk + timeline), pipeline (kanban + deals),
unified inbox (SMS + email send/receive), SMS + email sequences, automations
(triggers + actions + run log), reports (overview/pipeline/messaging/usage),
settings (general/team/billing/pipeline/unsubscribes/integrations), Twilio + one email
provider + Stripe.

### V1 (after MVP)
Contact health score, contact enrichment, dashboard customisation, deal timeline view,
custom report builder, spending cap + billing alerts, annual billing, Calendly + Slack,
role permissions editor, audit log page, 2FA, email signature editor, data retention
settings, automation branching, Vonage as alternative provider, Viewer role.

---

## 11. Handoff Artifacts

- **This document** — requirements + data model + API contract.
- **`/prototype`** — clickable UI reference (open via local HTTP server or GitHub Pages).
- **`/prototype/proto/*.jsx`** — per-screen UI source (component structure + states).
- Design tokens: background `#07070f`, brand indigo `#6366f1`, Inter font, glassmorphism
  cards. See `tailwind.config.js` and `src/index.css`.

> **Open questions for the team to resolve before build:**
> 1. Backend language/framework (Node vs Python).
> 2. Auth: build vs managed provider (Clerk/Auth0/Supabase).
> 3. Email provider choice (SendGrid vs Postmark vs SES).
> 4. Real-time inbox: polling vs WebSockets/SSE for inbound messages.
