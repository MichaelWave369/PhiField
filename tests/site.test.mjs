import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { portals, filters, links, principles } from '../src/data.js'

const file = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')

test('all curated public portals have distinct ids, valid HTTPS destinations and categories', () => {
  assert.equal(portals.length, 8)
  assert.equal(new Set(portals.map((item) => item.id)).size, portals.length)
  for (const portal of portals) {
    assert.match(portal.url, /^https:\/\//)
    assert.ok(portal.title.length > 1)
    assert.ok(portal.description.length > 35)
    assert.ok(filters.some((item) => item.id === portal.category))
    assert.ok(portal.accent.startsWith('#'))
    assert.ok(!portal.url.includes('localhost'))
  }
})

test('portal registry belongs to the actual Φ-side and references the public Commons', () => {
  assert.ok(portals.some((x) => x.url === links.commons))
  assert.ok(portals.some((x) => x.url === links.zenodo))
  assert.ok(portals.some((x) => x.url === links.phios))
  assert.ok(portals.some((x) => x.url === links.infiniteCommons))
  assert.equal(links.github, 'https://github.com/MichaelWave369/PhiField')
  assert.equal(links.parent, 'https://enterthefield.org/')
  assert.ok(principles.some((x) => /Ledger above ego/.test(x.title)))
})

test('website distinguishes linked Xi collaboration from active authorization', () => {
  const app = file('src/App.jsx')
  assert.match(app, /no automatic Xi runtime connection|does <strong>not<\/strong> claim joint operation/i)
  assert.match(app, /LIVE CROSSING \/ NOT VERIFIED/)
  assert.match(app, /INDEPENDENT XI SIDE/)
  assert.match(app, /LINKS ≠ AUTHORITY/)
  assert.ok(!/private.key|BEGIN RSA PRIVATE KEY|Bearer [\w-]+/.test(app))
})

test('interactive field remains local, with reduced-motion and explicit pause control', () => {
  const app = file('src/App.jsx')
  const canvas = file('src/FieldCanvas.jsx')
  assert.match(app, /aria-label="Resonance intensity"/)
  assert.match(app, /Pause field motion/)
  assert.match(app, /aria-pressed/)
  assert.match(canvas, /prefers-reduced-motion: reduce/)
  assert.match(canvas, /document.visibilityState/)
  assert.match(canvas, /ResizeObserver/)
  assert.doesNotMatch(canvas, /fetch\(|WebSocket|XMLHttpRequest|sendBeacon|localStorage/)
})

test('privacy baseline: no third-party dependencies in document shell', () => {
  const html = file('index.html')
  const css = file('src/style.css')
  assert.doesNotMatch(html, /googleapis|gstatic|analytics|tracking|<iframe/)
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/)
  assert.match(html, /%BASE_URL%favicon\.svg/)
  assert.match(html, /og:title/)
})

test('both deployment environments have consistent build paths and no DNS credentials', () => {
  const vite = file('vite.config.js')
  const netlify = file('netlify.toml')
  const pages = file('.github/workflows/pages.yml')
  const packageJson = JSON.parse(file('package.json'))
  assert.equal(packageJson.private, true)
  assert.match(vite, /PHI_FIELD_BASE/)
  assert.match(netlify, /publish = "dist"/)
  assert.match(pages, /PHI_FIELD_BASE: \/PhiField\//)
  assert.match(pages, /actions\/deploy-pages@v4/)
  assert.doesNotMatch(netlify, /api_token|secret_key|NAMECHEAP_PASSWORD/)
  for (const path of ['src/App.jsx', 'src/FieldCanvas.jsx', 'public/favicon.svg', 'docs/DOMAIN_SETUP.md']) {
    assert.ok(existsSync(new URL('../' + path, import.meta.url)), path)
  }
})
