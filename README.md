# Φ-FIELD

**A Sovereign Creative Universe**  
**Ledger Above Ego · Two sovereign fields, one open commons.**

An interactive React headquarters for the Φ-side of the Enter the Field ecosystem. Built as an independent home for creative worlds, open research, tools, and a public evidence-led collaboration gateway. The project deliberately does not claim ownership, credentials, or operational authority over Hunter's independent Xi side.

## What v0.1 ships

- Fully responsive, dark editorial landing page with an animated mathematical Φ field and orbital hero mark.
- Adjustable resonance and pause controls. Honors `prefers-reduced-motion` and pauses rendering in inactive browser tabs.
- Eight curated external portals with interactive category filters: Sovereign Commons, Infinite Commons, ΦOS, Super Φ.Vessel, Field Atlas, Field Constellation, Φ369 Research Lab, Domistika.
- An explicitly non-authorizing Xi ⇄ Φ public Commons explanation, engineering values, research links, and ecosystem footer.
- Zero browser analytics, ad SDKs, trackers, sign-ins, runtime model calls, or third-party font dependencies.
- Node source/portal/security regression tests, GitHub Pages build and deploy workflow, Netlify production configuration, and Namecheap custom-domain runbook.

## Quick start

```bash
npm install
npm run dev
# open the local URL printed by Vite
npm test
npm run build
```

The browser-generated field runs locally. It is decorative and independent of Xi infrastructure.

## Blank-page prevention

A successful Vite build does **not** guarantee that React can execute in a browser. The initial deployment had JSX modules without a default `React` binding, which can produce a `React is not defined` runtime failure with the classic JSX transform. This fix binds the runtime explicitly in the two JSX components.

`npm test` now performs a **real server-side React render** of the transformed page, verifying that the heading, portals, canvas, and public Commons content appear. `npm run check:dist` separately verifies the compiled GitHub Pages `/PhiField/` HTML points to real local JS and CSS assets. Pages deployment requires both guards to pass.

The HTML also has a readable built-in loading/recovery panel that React replaces when it boots. If JavaScript fails again, you see instructions instead of a blank screen.

After a fix is deployed, open the [GitHub Pages preview](https://michaelwave369.github.io/PhiField/) with **Ctrl+Shift+R** to bypass a stale browser cache. `phi-field.com` itself still requires separate Netlify/Namecheap DNS setup.

## Deployment

**Preview:** Merge the PR and select **GitHub Actions** under GitHub repository **Settings → Pages**. The `Deploy PhiField to GitHub Pages` workflow publishes at:

**https://michaelwave369.github.io/PhiField/**

The project-site build sets `PHI_FIELD_BASE=/PhiField/`, so CSS and JS assets remain valid under that path.

**Production:** `phi-field.com` was purchased through Namecheap. Import this GitHub repo to Netlify, let `netlify.toml` build from `main` to `dist`, add `phi-field.com` and `www.phi-field.com` as custom domains, then enter Netlify-provided records in the active Namecheap DNS zone. **DNS and HTTPS are not preconfigured by this repo.**

For every step, caveat, conflict, and possible future subdomain: **[Domain & Hosting Runbook](docs/DOMAIN_SETUP.md)**.

## Navigation and governance

Portal definitions live in `src/data.js`. Links go directly to public websites or source repositories and do not constitute installed apps, shared permissions, federated logins, or verified bilateral authority. The [Commons Gateway](https://michaelwave369.github.io/xi-vessel-bridge/) is an independent public static interface. Xi partner identity and any real two-host operation remain separately governed.

**Site owner:** Φ-side, Enter the Field ecosystem.  
**Wider ecosystem:** https://enterthefield.org/  
**Public papers:** https://zenodo.org/communities/enter-the-field-phi369/records  
**Canonical source:** https://github.com/MichaelWave369/PhiField

### Planned next additions

A navigable constellation edition, first-party search across the public repo map, and eventually optional branded subdomains. Future integrations will be opt-in and separately authenticated where applicable; they are not part of v0.1.

**STATION.**
