# Blog CMS decision — MDX now, Ghost when the blog scales

**Status:** Decided (staged) · **Date:** July 2026 · **Applies to:** the nrtur marketing site blog (`/blog`, cluster hubs, articles)

## TL;DR

**Right now (pre-launch), use local MDX/Markdown files in the repo — free, Git-based, nothing to pay for or maintain. Move to Ghost (headless) once the blog becomes a real growth channel** — i.e. when non-technical people need to publish, or you launch a newsletter. Both feed the same Next.js frontend, so switching later is a small job.

Why the split: headless Ghost's real cost is **$29/mo** (the Publisher tier — the cheaper Starter can't issue an API key). Paying that pre-launch buys non-dev editing + newsletters you aren't using yet. Your engineers can write MDX today for **$0**.

Ruled out entirely: **WordPress** (overkill + maintenance) and the heavy structured-content CMSs (**Sanity / Payload / Contentful / Storyblok** — wrong weight class for a blog).

---

## What the blog needs — now vs later

The requirements change with stage, and that *is* the decision:

| Need | Pre-launch (now) | Growth phase (later) |
|---|---|---|
| Who writes | Engineers / founders (Git-comfortable) | + non-technical marketers |
| Volume | A few SEO seed articles | Regular publishing cadence |
| Newsletter | None (waitlist is a Google Form) | Active subscriber list |
| Budget | Pre-revenue, lean | Can justify $29/mo |

The constants across both stages: it must render through our **Next.js 14 App Router + Vercel** frontend (which we own for speed/SEO/design), we already generate sitemap/robots/JSON-LD ourselves, and it should stay a *blog* (posts/tags/authors) — not a structured-content platform.

## The verdict

| Stage | Choice | Why |
|---|---|---|
| **Now (pre-launch)** ⭐ | **Local MDX** | Free, Git-native, engineers publish today, zero maintenance or external dependency |
| **Growth phase** | **Ghost (headless), Publisher $29/mo** | Non-dev publishing + built-in newsletter / subscribers |
| **Never** | WordPress · Sanity · Payload · Contentful · Storyblok | Overkill or wrong weight class for a blog |

**Switch MDX → Ghost when any of these becomes true:** non-technical people need to publish without Git · you launch a newsletter and want subscriber management · cadence makes PR-per-post annoying.

## Why MDX now

- **Free** — no $29/mo while pre-revenue.
- **Your team can already use it** — posts are `.md`/`.mdx` files in the repo, published through the same Git flow the engineers use daily.
- **Zero maintenance, zero dependency** — no external service, no server, no API keys; content is versioned in Git.
- **Same frontend** — renders through the exact Next.js pages/SSG we already built; readers can't tell the difference.
- **Trade-off it accepts (all fine for now):** every post is a commit/deploy, no editor for non-devs, no newsletter tooling.

## Why Ghost later (the planned destination)

When the blog graduates into a real growth channel, Ghost earns the $29/mo:

- **A publishing tool, not a toolkit** — Posts/Tags/Authors/Members is *exactly* a blog; a non-technical founder writes and hits publish.
- **Headless fits cleanly** — we'd use only the Content API, and the `src/lib/ghost.ts` integration + ISR is **already built and dormant behind the seed fallback**, ready to switch on.
- **Newsletter + memberships built in** — the real reason to pay: turns readers into a subscriber list out of the box (the waitlist → audience play). Research flags this as Ghost's SaaS-blog sweet spot.
- **SEO-clean + small attack surface** — no plugin soup, and we keep our own 92/96/96/100 Lighthouse since we render the frontend.

**Cost (headless gotcha):** headless needs a **custom integration** to issue a Content API key → gated to **Publisher ($29/mo, $348/yr)**; the cheaper **Starter ($18/mo) can't create one**. Or self-host (free software + ~$6/mo VPS + your own ops), where integrations are unlocked.

## The options, compared

| CMS | Non-dev editing | Next.js fit | SEO out of box | Newsletter/subs | Cost | Maintenance | Best for |
|---|---|---|---|---|---|---|---|
| **MDX / local Markdown** ⭐ *(now)* | ❌ Devs only (Git) | ✅ Native, zero deps | ✅ You control it | ❌ None | **Free** | Very low | Small, dev-authored, low-volume blogs |
| **Ghost (headless)** ⭐ *(later)* | ✅ Excellent | ✅ Clean Content API | ✅ Built-in | ✅ **Built-in** | $29/mo (Publisher) or self-host ~$6/mo | Low | Blogs + newsletters as a growth channel |
| **WordPress (headless)** | ✅ Familiar | ⚠️ You build the wrapper | ⚠️ Needs Yoast/RankMath | ⚠️ Plugin | Hosting + plugins | **High** (plugins/security) | Teams already on WordPress |
| **Sanity** | ✅ Good (custom studio) | ✅ Great, schemas in repo | ⚠️ You build it | ❌ None | Free tier → scales | Medium | Structured content beyond a blog |
| **Notion-as-CMS** | ✅ Very easy | ⚠️ Slow/rate-limited API | ❌ Weak, clunky images | ❌ None | Cheap | Low | Quick internal/hobby blogs |

(Payload, Storyblok, Contentful omitted from the table — all capable, but they're structured-content platforms aimed at bigger marketing sites or teams with a backend engineer to run them. Contentful in particular is [hard to recommend for new projects in 2026](https://dev.to/nayankyada/best-headless-cms-for-nextjs-in-2026-sanity-vs-contentful-vs-payload-vs-storyblok-557k) on pricing.)

## How others do it (research)

- **WordPress still dominates the web**, but its edge is its plugin ecosystem and cheap PHP hosting — advantages that mostly *disappear* when you go headless. Headless WordPress means "building your own CMS wrapper around WordPress," and its SEO is [mediocre until you install Yoast/Rank Math](https://unfoldcms.com/blog/ghost-vs-wordpress-2026); its performance needs caching + tuning to match what Ghost does by default.
- **The Next.js startup default is trending to Sanity/Payload** for *general* headless content — great when you have structured content and a developer to model it. For a **blog specifically with a newsletter**, the consistent recommendation is **Ghost**, because it "does this out of the box."
- **The purist dev take:** [if every author can write Markdown and use Git, skip the CMS and use MDX.](https://dev.to/nayankyada/best-headless-cms-for-nextjs-in-2026-sanity-vs-contentful-vs-payload-vs-storyblok-557k) That's exactly our pre-launch situation — so that's where we start.

## The one honest trade-off: MDX vs Ghost

This is the only real fork, and it's a question of *stage*, not of which tool is "better":

- **MDX wins while:** only engineers write posts, volume is low, and there's no newsletter. Upside: free, zero dependency, content in Git. Downside: every post is a commit/deploy, no non-dev editor, no subscribers. → **This is nrtur today.**
- **Ghost wins once:** non-devs write, you publish regularly as an SEO engine, and a newsletter/audience is live. → **This is nrtur post-launch.**

Paying $29/mo now would trade cash for two capabilities (non-dev publishing + subscribers) we aren't using yet. Starting on MDX and migrating later is cheap, because both render through the same Next.js layer.

## Recommendation

**MDX now → Ghost (Publisher) when you launch a newsletter or bring on non-technical writers.** Don't pay for capabilities you're not using; don't over-build. The Ghost integration stays in the repo, dormant, ready to switch on the day it's worth it.

## Current status & next step

- ✅ The site runs on **bundled seed posts** today at **$0** — it looks complete; nothing to pay for or maintain.
- 🔜 **To publish real articles now (free):** wire the blog to read local **MDX** from the repo — a small job that swaps the Ghost fetch for a local content loader behind the same `Post` shape. (Articles currently show "coming soon" because no content source is connected.)
- ⏸ **Ghost path (later):** the `src/lib/ghost.ts` integration is built and dormant behind the seed fallback. To activate: Ghost Publisher (or self-host) → create a custom integration → put `GHOST_URL` + `GHOST_CONTENT_API_KEY` in Vercel → redeploy.

## Sources

- [Ghost vs WordPress in 2026 — UnfoldCMS](https://unfoldcms.com/blog/ghost-vs-wordpress-2026)
- [WordPress, Ghost, Hugo? The great CMS war — DEV](https://dev.to/dev_tips/wordpress-ghost-hugo-the-great-cms-war-3178)
- [Best headless CMS for Next.js in 2026: Sanity vs Contentful vs Payload vs Storyblok — DEV](https://dev.to/nayankyada/best-headless-cms-for-nextjs-in-2026-sanity-vs-contentful-vs-payload-vs-storyblok-557k)
- [Top 5 Headless CMS to Build a Blog in 2026 — DEV](https://dev.to/dumebii/top-5-headless-cms-to-build-a-blog-in-2026-382f)
- [10 best CMSs for Next.js — Hygraph](https://hygraph.com/blog/nextjs-cms)
- [Ghost(Pro) official pricing](https://ghost.org/pricing/) · [Ghost custom integrations (Publisher+)](https://ghost.org/integrations/custom-integrations/)
