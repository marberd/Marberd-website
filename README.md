# MARBERD.COM — Portfolio Website

Personal portfolio website for **Marberd Bernard**, Architect & VDC Specialist.  
**Live site:** [marberd.com](https://marberd.com) · **Repo:** [github.com/marberd/Marberd-website](https://github.com/marberd/Marberd-website)

**Stack:** Pure HTML · CSS · Vanilla JS — no build tools, works offline, deploys instantly.

---

## File Structure

```
/
├── index.html            ← Homepage (hero landing)
├── about.html            ← Bio, education, experience timeline
├── academic.html         ← Academic projects (Columbia studio work)
├── professional.html     ← Professional work (TPG, clients, international)
├── bim-revit.html        ← BIM/VDC capabilities & AI tools
├── contact.html          ← Contact information
├── assets/
│   ├── css/style.css     ← All shared styles (design system)
│   ├── js/main.js        ← Shared JS (cursor, nav, scroll reveal)
│   └── images/
│       └── profile.jpg   ← ⚠ Replace with high-res headshot
├── netlify.toml          ← Netlify deploy config + cache headers
├── .gitignore
└── README.md
```

---

## Deploy to Netlify (Free)

### Option A — Connect GitHub repo (recommended, auto-deploys on push)

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
2. Choose **GitHub** → authorize → select **Marberd-website**
3. Build settings:
   - **Build command:** *(leave blank)*
   - **Publish directory:** `.`
4. Click **Deploy site** — live in ~30 seconds

### Option B — Drag & drop (instant, no account linking)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `Marberd website` folder into the browser
3. Done — copy the URL Netlify gives you

---

## Connect marberd.com to Netlify

1. In Netlify: **Site settings → Domain management → Add custom domain**
2. Enter `marberd.com` → confirm
3. Netlify will show you DNS records to add — two options:
   - **Option 1 (easiest):** Point nameservers to Netlify's (they manage DNS)
   - **Option 2:** Add an `A` record `75.2.60.5` and `CNAME` `www → your-site.netlify.app`
4. SSL certificate is auto-issued (free, ~1 min after DNS propagates)

---

## Updating the Site

```bash
# After making changes to any file:
git add .
git commit -m "Update: describe what changed"
git push

# Netlify detects the push and auto-deploys in ~20 seconds
```

---

## Customization Checklist

- [ ] Replace `assets/images/profile.jpg` with a high-resolution headshot (min 800×1000px)
- [ ] Add project renders to `assets/images/` and update `academic.html` img tags
- [ ] Add professional renders to `professional.html`
- [ ] Update LinkedIn URL in nav (all pages) and footer links
- [ ] Verify `marberd.com` DNS is pointed to Netlify
- [ ] Add Google Analytics or Netlify Analytics (optional)

---

## Local Development

No build step needed. Open directly or run a local server:

```bash
# WSL — start a simple local server
cd "/mnt/c/Users/marbe/Documents/GitHub/Marberd website"
python3 -m http.server 3000

# Then open in browser:
# http://localhost:3000
```

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `--white` | `#FAFAF8` | Page background |
| `--black` | `#111118` | Primary text, footer bg |
| `--text` | `#1E1E2A` | Body text |
| `--mid` | `#5A5A6E` | Secondary text |
| `--muted` | `#909099` | Labels, captions |
| `--gold` | `#B8946A` | Accent color |
| `--gold-dk` | `#8A6A42` | Eyebrows, hover text |
| `--border` | `#E2DED6` | Card borders, dividers |

**Fonts (Google Fonts, loaded in style.css)**
- `Cormorant Garamond` — Display headings
- `Outfit` — Body, UI text  
- `Space Mono` — Labels, monospace accents

---

*Built with Claude Code · April 2026*
