# Blog CMS decision — why nrtur uses Ghost (headless)

**Status:** Decided · **Date:** July 2026 · **Applies to:** the nrtur marketing site blog (`/blog`, cluster hubs, articles)

## TL;DR

**Ghost, used headless (Content API only — our Next.js app renders the frontend) is the right choice for nrtur, and it's already integrated.** It's built for exactly what our blog is: a content-marketing + SEO growth channel that will later want a newsletter and subscribers. The only alternative worth seriously considering is **local MDX/Markdown files in the repo** — and that only wins if the blog stays low-volume, dev-authored, and newsletter-free. It won't, so Ghost stays.

The heavier "developer" headless CMSs (Sanity, Payload, Contentful, Storyblok) are more powerful than a blog needs and add content-modeling overhead for no payoff here. Traditional/headless **WordPress is overkill and higher-maintenance** for a team of 1–5.

---

## What our blog actually needs

The requirements come straight from how we're using the blog (SEO clusters, "alternatives"/"comparisons" content, a waitlist we want to convert into an audience):

1. **Non-developers can publish** — founders/marketers write posts without touching code or opening a PR.
2. **Clean headless API** — content pulled at build/ISR time into our existing **Next.js 14 App Router + Vercel** frontend (which we control for speed, SEO, and design).
3. **SEO fundamentals handled** — per-post meta, canonical, structured data, fast delivery. (We already generate sitemap/robots/JSON-LD ourselves, so the CMS just needs to not fight us.)
4. **Newsletter / subscriber path** — the blog is a growth channel; turning readers into a list is a near-term goal.
5. **Low cost + low maintenance** — we're a small early-stage team; nobody wants to babysit a server or patch plugins.
6. **A blog, not a content platform** — posts, tags, authors. We don't need arbitrary structured content types.

## The verdict up front

| | Recommendation |
|---|---|
| **Use** | **Ghost (headless)** — matches all six needs, already wired into the site |
| **Reconsider only if** | The blog becomes **dev-only + low-volume + no newsletter** → then **local MDX** is simpler and free |
| **Don't** | Switch to WordPress, or a heavyweight headless CMS (Sanity/Payload/Contentful/Storyblok) — wrong weight class for a blog |

## Why Ghost

- **It's a publishing tool, not a toolkit.** Its content model is opinionated — Posts, Pages, Tags, Authors, Members — which is *exactly* a blog. Nothing to model, nothing to wire up. A founder can write and hit publish.
- **Headless fits our stack cleanly.** We use only the **Content API**; our Next.js app fetches posts at build time and revalidates hourly (ISR), so we keep our fast, SEO-tuned, on-brand frontend and Ghost is just the writing/admin backend. Best of both worlds — Ghost's editor, our frontend.
- **Fast + SEO-clean by default.** Ghost ships sitemaps, JSON-LD, canonical URLs, and per-post meta with no plugins. Since we render the frontend ourselves, we get our Core Web Vitals (the 92/96/96/100 Lighthouse we already hit) *and* Ghost's clean content.
- **Newsletter + membership are built in.** This is the deciding factor for a SaaS growth-channel blog: Ghost turns readers into subscribers out of the box — directly useful for the waitlist → audience play. Research on SaaS blogs calls this out specifically as Ghost's sweet spot.
- **Small attack surface.** No third-party plugin soup; far less to keep patched than WordPress.
- **Already done.** The integration exists (`src/lib/ghost.ts`, Content API, ISR, seed fallback). Switching away would be throwing that work out.

**Cost (headless gotcha):** headless needs a **custom integration** to issue a Content API key, and Ghost(Pro) gates that to the **Publisher tier ($29/mo, $348/yr)** — the cheaper **Starter ($18/mo) can't create one**, so it's unusable for our setup despite listing "Content API: Yes." The alternative is **self-hosting** (free software + ~$6/mo VPS + your own ops), where integrations are unlocked. It needs Node.js + MySQL, so it can't run on cheap cPanel shared hosting — irrelevant for us since it's headless and separate from our Vercel frontend.

## The options, compared

| CMS | Non-dev editing | Next.js fit | SEO out of box | Newsletter/subs | Cost | Maintenance | Best for |
|---|---|---|---|---|---|---|---|
| **Ghost (headless)** ⭐ | ✅ Excellent | ✅ Clean Content API | ✅ Built-in | ✅ **Built-in** | $29/mo (Publisher) or self-host ~$6/mo | Low | Blogs + newsletters as a growth channel |
| **MDX / local Markdown** | ❌ Devs only (Git) | ✅ Native, zero deps | ✅ You control it | ❌ None | **Free** | Very low | Small, dev-authored, low-volume blogs |
| **WordPress (headless)** | ✅ Familiar | ⚠️ You build the wrapper | ⚠️ Needs Yoast/RankMath | ⚠️ Plugin | Hosting + plugins | **High** (plugins/security) | Teams already on WordPress |
| **Sanity** | ✅ Good (custom studio) | ✅ Great, schemas in repo | ⚠️ You build it | ❌ None | Free tier → scales | Medium | Structured content beyond a blog |
| **Notion-as-CMS** | ✅ Very easy | ⚠️ Slow/rate-limited API | ❌ Weak, clunky images | ❌ None | Cheap | Low | Quick internal/hobby blogs |

(Payload, Storyblok, Contentful omitted from the table — all capable, but they're structured-content platforms aimed at bigger marketing sites or teams with a backend engineer to run them. Contentful in particular is [hard to recommend for new projects in 2026](https://dev.to/nayankyada/best-headless-cms-for-nextjs-in-2026-sanity-vs-contentful-vs-payload-vs-storyblok-557k) on pricing.)

## How others do it (research)

- **WordPress still dominates the web**, but its edge is its plugin ecosystem and cheap PHP hosting — advantages that mostly *disappear* when you go headless. Headless WordPress means "building your own CMS wrapper around WordPress," and its SEO is [mediocre until you install Yoast/Rank Math](https://unfoldcms.com/blog/ghost-vs-wordpress-2026); its performance needs caching + tuning to match what Ghost does by default.
- **The Next.js startup default is trending to Sanity/Payload** for *general* headless content — great when you have structured content and a developer to model it. For a **blog specifically with a newsletter**, the consistent recommendation is **Ghost**, because it "does this out of the box."
- **The purist dev take:** [if every author can write Markdown and use Git, skip the CMS and use MDX.](https://dev.to/nayankyada/best-headless-cms-for-nextjs-in-2026-sanity-vs-contentful-vs-payload-vs-storyblok-557k) That's the one genuinely competitive alternative for us — see below.

## The one honest trade-off: Ghost vs local MDX

This is the only real fork.

- **Choose MDX if:** only engineers write posts, volume is low, and you don't want a newsletter. Upside: free, zero external dependency, content versioned in Git, nothing to maintain. Downside: every post is a code change + deploy, no editor for non-devs, no subscriber tooling.
- **Choose Ghost (our pick) if:** non-devs will write, you're publishing regularly as an SEO engine, and a newsletter/audience is on the roadmap. All three are true for nrtur.

Given the SEO content strategy (multiple "best [CRM] alternatives" articles, ongoing publishing) and the waitlist-to-audience goal, **Ghost is the correct call**. MDX would trade away the two things we actually want (non-dev publishing + subscribers) to save ~$10/mo.

## Recommendation

**Keep Ghost, headless.** It's the best-fit tool for a SaaS marketing blog that doubles as a growth channel, it plays perfectly with our Next.js/Vercel + ISR setup, and it's already integrated. Don't migrate to a heavier headless CMS (needless complexity) or WordPress (needless maintenance).

## Current status & next step

- ✅ Integration built: `src/lib/ghost.ts` (Content API, ISR `revalidate: 3600`, seed-post fallback), article + cluster pages via `generateStaticParams`.
- ⏳ **Not yet activated:** set `GHOST_URL` and `GHOST_CONTENT_API_KEY` in Vercel to swap the seed/"coming soon" fallbacks for live content. Until then the site runs fine on bundled seed posts.
- **To go live:** create a Ghost site (Ghost Pro or self-host), add a custom integration, copy the Content API key + URL into Vercel env, redeploy.

## Sources

- [Ghost vs WordPress in 2026 — UnfoldCMS](https://unfoldcms.com/blog/ghost-vs-wordpress-2026)
- [WordPress, Ghost, Hugo? The great CMS war — DEV](https://dev.to/dev_tips/wordpress-ghost-hugo-the-great-cms-war-3178)
- [Best headless CMS for Next.js in 2026: Sanity vs Contentful vs Payload vs Storyblok — DEV](https://dev.to/nayankyada/best-headless-cms-for-nextjs-in-2026-sanity-vs-contentful-vs-payload-vs-storyblok-557k)
- [Top 5 Headless CMS to Build a Blog in 2026 — DEV](https://dev.to/dumebii/top-5-headless-cms-to-build-a-blog-in-2026-382f)
- [10 best CMSs for Next.js — Hygraph](https://hygraph.com/blog/nextjs-cms)
- [Ghost(Pro) official pricing](https://ghost.org/pricing/) · [Ghost custom integrations (Publisher+)](https://ghost.org/integrations/custom-integrations/)
