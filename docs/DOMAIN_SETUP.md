# Φ-Field Domain & Hosting Runbook

**Domain registered:** `phi-field.com` (Namecheap).  
**Source:** [MichaelWave369/PhiField](https://github.com/MichaelWave369/PhiField).  
**Status at scaffold time:** Domain purchased; **no deployment or DNS binding assumed**.

The website is a static React/Vite application. It does not need a paid server, a private API, or access to the Xi Room.

## First launch: GitHub Pages preview

1. Merge the application PR to `main`.
2. In **GitHub → PhiField → Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source if it is not already enabled.
3. Open **Actions → Deploy PhiField to GitHub Pages** and verify both jobs finish successfully.
4. The project site is expected at **https://michaelwave369.github.io/PhiField/**. The preview uses `PHI_FIELD_BASE=/PhiField/` so assets resolve correctly.
5. Check mobile display and external portal links. Do not call the preview live until Pages actually finishes deploying.

The GitHub Pages preview is separate from the final domain and can stay available as a fallback.

## Recommended production: Netlify + Namecheap DNS

1. Sign into **Netlify** and create a site using **Add new project / Import an existing project**. Connect the GitHub repository `MichaelWave369/PhiField` and its `main` branch.
2. Netlify will read `netlify.toml`: build command `npm run build`, publish directory `dist`, `PHI_FIELD_BASE=/`, Node 22.
3. Deploy once and inspect the assigned `*.netlify.app` URL.
4. Under **Netlify → Domain management**, add `phi-field.com` and `www.phi-field.com` (choose one as the primary URL, redirect the other).
5. Netlify will give **specific DNS records for your site**. In **Namecheap → Domain List → phi-field.com → Manage → Advanced DNS**, create/update those records. If the domain uses third-party nameservers, change DNS at the active DNS provider instead.
6. Remove conflicting parking, redirect, `@/www` A/ALIAS/CNAME records *only after confirming which records are required*. Leave MX/TXT email records untouched unless you understand their role.
7. Wait for DNS verification and Netlify-managed HTTPS certification, then test both `https://phi-field.com` and `https://www.phi-field.com`. Do not treat a domain purchase as a working hosted site.

**Important:** Do not point the same hostname at both Netlify and GitHub Pages. Keep GitHub Pages on `michaelwave369.github.io/PhiField/` unless you intentionally choose it as the production provider instead.

No Namecheap API token, registrar password, SSH credential or Netlify API token belongs in this repository or in the browser. DNS changes are made through Namecheap's dashboard; records should be taken from the active hosting provider, not guessed.

## Future subdomains (not configured)

- `commons.phi-field.com`: possible branded entry to the [public Commons Gateway](https://michaelwave369.github.io/xi-vessel-bridge/).
- `research.phi-field.com`: public papers, Zenodo records and NBG research.
- `labs.phi-field.com`: future engineering portal.

These are **ideas**, not currently configured DNS hosts, live apps or approved collaborations. Nothing in a domain or website gives access to Hunter's separately governed Xi infrastructure.

## Local development

```bash
npm install
npm run dev
npm test
npm run build
```

The entire interactive visual field runs locally in your browser. Respecting reduced-motion and pausing the canvas requires no remote endpoint.

**Ledger Above Ego. Links are not grants.**
