# Amplified Intelligence — Website Design Standard

A reusable blueprint for every site we ship. Apply all five layers in order.

---

## 1. Security (Do This First)

Security headers live in `public/_headers` (Cloudflare Pages picks them up automatically).

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' [allowed-third-parties]; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src [allowed-embeds]; connect-src 'self'; object-src 'none'; base-uri 'self';
```

**Rules:**
- Every external `<a>` tag gets `rel="noopener noreferrer"`.
- Every icon-only button gets `aria-label="Action name"`.
- Load fonts via `<link>` in `<head>` — never `@import` inside a `<style>` or CSS file (blocks render, breaks CSP).
- Never put a `<div>` inside a `<p>`. Use `<span>` for inline elements.
- No `.env` secrets committed. No API keys in frontend code.

---

## 2. Technical SEO

Everything goes in `index.html`. The goal: Google knows what the page is before it finishes loading JS.

### Required tags in `<head>`

```html
<!-- Primary -->
<meta name="description" content="One sentence. High-intent keywords. Under 160 chars." />
<title>Product — Blunt Value Proposition.</title>

<!-- Open Graph (social previews + AI tools) -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Same as <title>" />
<meta property="og:description" content="Same as meta description" />
<meta property="og:image" content="/logo.png" />
<meta property="og:url" content="https://yourdomain.com" />

<!-- Twitter/X Card -->
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="Short version of title" />
<meta name="twitter:description" content="Short version of description" />
<meta name="twitter:image" content="/logo.png" />
```

### JSON-LD Structured Data

Add a `<script type="application/ld+json">` block in `<head>`. Use the schema type that fits:

- **SoftwareApplication** — for downloadable apps/tools
- **Organization** — for company/portfolio sites
- **Product** — for physical or digital products with pricing

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Product Name",
  "operatingSystem": "macOS",
  "applicationCategory": "ProductivityApplication",
  "offers": { "@type": "Offer", "price": "14.99", "priceCurrency": "USD" },
  "description": "One blunt sentence.",
  "creator": { "@type": "Organization", "name": "Amplified Intelligence", "url": "https://yourdomain.com" }
}
```

### Keyword Philosophy

Avoid generic words. Use high-intent phrases a real buyer would search:
- Bad: "AI tool", "productivity app", "software"
- Good: "native macOS jargon filter", "corporate speak decoder", "local AI text processor"

---

## 3. Semantic HTML

Google and screen readers need structure. Replace every `<div>` used for layout with the right tag.

| Element | Use it for |
|---|---|
| `<header>` | Wraps the site `<nav>`. One per page. |
| `<nav>` | Navigation links only. Goes inside `<header>`. |
| `<main>` | Wraps all page content between `<header>` and `<footer>`. One per page. |
| `<section>` | Named content blocks (hero, features, FAQ). Each gets an `id`. |
| `<article>` | Self-contained content: a product card, a blog post, a tool demo. |
| `<footer>` | Site-wide closing section. |

### Heading Hierarchy Rule

**One `<h1>` per page. Never skip levels.**

```
h1 → Main page headline (the product's value prop)
  h2 → Section titles (Features, About, FAQ)
    h3 → Items within a section (individual FAQ questions, feature cards)
```

Breaking this (e.g., jumping from h2 to h4) confuses crawlers about what's important.

---

## 4. Visual Language — Neo-Brutalist Research Aesthetic

This is our design system. It signals technical credibility without looking like a SaaS template.

### Typography

| Role | Font | Weight |
|---|---|---|
| Headlines, UI labels | Space Grotesk | 900 (Black) |
| Body, captions, code | Space Mono | 400 / 700 |

Load via `<link>` in `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
```

### Color System

| Role | Value | Usage |
|---|---|---|
| Background | `#09090B` or `#050505` | Page base |
| Text | `#FAFAFA` | Primary copy |
| Muted text | `neutral-400` / `neutral-500` | Secondary copy |
| Borders | `white/5` to `white/10` | Subtle dividers |
| Primary CTA | `#00E5FF` (Cyan) | Buy / Try buttons only |
| Secondary accent | `#E6FF00` (Yellow) | Badges, alerts, truth signals |
| Danger / Heat | `#FF4500` | Warnings, negative signals |
| Success | `#00FF66` | Confirmations, free tier signals |

**Rule:** Neon accents are used only on interactive elements (buttons, links). Everything else is monochrome. This forces the user's eye to the CTA.

### Layout Principles

- Grid: 12-column, max-width `7xl` (1280px), `px-6` gutters.
- Cards and containers: `border border-white/5`, subtle background `bg-[#050505]`.
- Buttons: No border-radius on primary CTAs (sharp = authoritative). Use `rounded-lg` only on secondary UI elements.
- Shadows: Use glow effects on CTAs (`shadow-[0_0_20px_rgba(0,229,255,0.2)]`), not drop shadows.

---

## 5. AI & LLM Crawler Optimization

Three files in `public/`. Vite copies them to `dist/` automatically.

### `public/robots.txt`

Explicitly allow the major AI crawlers. Don't leave it to chance.

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### `public/llms.txt`

A plain-English file that AI models read directly when indexing your site. Think of it as your README for the AI web. Keep it factual, blunt, and structured.

```markdown
# Product Name

> One-sentence description of what it does.

## What it does
- Bullet 1
- Bullet 2

## Key facts
- Price / license model
- Platform
- Data privacy posture

## Who it's for
One paragraph. Be specific about the problem it solves.

## Purchase / Download
URL
```

### JSON-LD (from Section 2)

The structured data schema in `index.html` also feeds AI tools like Google's AI Overviews and Perplexity. Make the `description` field a complete, standalone sentence — it gets extracted verbatim.

---

## 6. Conversion-Focused Copy

### Rules

1. **No fluff in the first viewport.** Delete "Welcome to", "We are a team of", "Our mission is." Start with the value: what the product does and who it's for.
2. **Single H1 = single promise.** "Stop reading AI slop. Get to the f*cking point." — one idea, stated bluntly.
3. **CTAs go to the product.** Navigation links point to `#benefits`, `#faq`, and the buy page — not to a "Services" page that leads nowhere.
4. **Remove dead ends.** No "Coming Soon" sections. No social links that don't exist yet. Every link should go somewhere real.
5. **Trust signals without filler.** Instead of "v1.4" version numbers or vague "trusted by 1000s" claims, use specifics: price, license model, data policy. Those are the real trust signals for a technical buyer.

### CTA Hierarchy Per Page

| Position | CTA | Style |
|---|---|---|
| Nav (sticky) | `GET - $14.99` | Small, accent color |
| Hero | `Buy Lifetime License` | Large, primary CTA |
| Footer | `START FREE TRIAL` | Full-width, white |

One CTA per section. Never two competing buttons side-by-side.

---

## 7. Deployment — Git + Cloudflare Pages

### One-time setup

```bash
git init
git add src/ public/ index.html package.json package-lock.json vite.config.js tailwind.config.js postcss.config.js eslint.config.js .gitignore
git commit -m "Initial commit"
gh repo create your-repo-name --public --source=. --remote=origin --push
```

Then in Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git:
- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`

`dist/` stays in `.gitignore`. Cloudflare builds it on every push.

### Ongoing workflow

```bash
# Make your changes, then:
git add -A
git commit -m "Short description of what changed"
git push
# Cloudflare auto-deploys in ~30 seconds
```

### `.gitignore` essentials

```
node_modules
dist
dist-ssr
*.local
.DS_Store
.env
.env.*
```

---

## Pre-Launch Checklist

### Security
- [ ] `public/_headers` file exists with CSP, HSTS, X-Frame-Options
- [ ] All external `<a>` tags have `rel="noopener noreferrer"`
- [ ] All icon-only buttons have `aria-label`
- [ ] No secrets or API keys in frontend code
- [ ] Fonts loaded via `<link>` in `<head>`, not `@import`

### SEO
- [ ] Unique `<title>` and `<meta name="description">` per page
- [ ] JSON-LD schema block in `<head>`
- [ ] Open Graph + Twitter Card tags
- [ ] Exactly one `<h1>` on the page
- [ ] Heading levels are sequential (h1 → h2 → h3, no skips)

### Semantic HTML
- [ ] `<header>` wraps the nav
- [ ] `<main>` wraps the page content
- [ ] `<footer>` closes the page
- [ ] No `<div>` inside `<p>` (use `<span>`)
- [ ] Open browser inspector — zero "DOM nesting" warnings

### AI/LLM Crawlers
- [ ] `public/robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot
- [ ] `public/llms.txt` exists and describes the product clearly
- [ ] JSON-LD `description` field is a complete, standalone sentence

### Copy & Conversion
- [ ] No "welcome" or "we are" fluff in the first viewport
- [ ] Every navigation link goes somewhere real
- [ ] No "Coming Soon" sections
- [ ] No social links that don't exist yet
- [ ] Single primary CTA per section

### Deployment
- [ ] `dist/` is in `.gitignore`
- [ ] Cloudflare Pages connected to GitHub repo
- [ ] Build command: `npm run build` | Output dir: `dist`
- [ ] Test deploy works end-to-end before going live

---

*Amplified Intelligence — Internal Standard. Apply to every site.*
