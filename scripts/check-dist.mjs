// Validate actual Vite OUTPUT, not just source markup.
// Prevent green builds that publish missing/off-base bundles to GitHub Pages.
import { readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

const base = process.env.PHI_FIELD_BASE || '/PhiField/'
const fail = (message) => { throw new Error('PhiField bundle smoke: ' + message) }
if (!base.startsWith('/') || !base.endsWith('/')) fail('Invalid deployment base path: ' + base)

const dist = resolve('dist')
const index = readFileSync(resolve(dist, 'index.html'), 'utf8')
if (!index.includes('<div id="root">') || !index.includes('Loading the field')) {
  fail('Built HTML must contain a useful pre-JavaScript loading/failure fallback')
}

const scripts = [...index.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(x => x[1])
const styles = [...index.matchAll(/<link\b[^>]*\bhref="([^"]+\.css)"/g)].map(x => x[1])
if (scripts.length < 1 || styles.length < 1) fail('Built HTML has no compiled JS or CSS')
for (const asset of [...scripts, ...styles]) {
  if (!asset.startsWith(base + 'assets/')) fail('Off-base asset URL: ' + asset)
  const relative = asset.slice(base.length)
  if (!/^assets\/[\w.-]+\.(?:js|css)$/.test(relative)) fail('Unexpected built asset path: ' + asset)
  const path = resolve(dist, relative)
  const file = statSync(path)
  if (!file.isFile() || file.size < 100) fail('Missing/empty output asset: ' + asset)
}
console.log(JSON.stringify({
  status: 'PHIFIELD_PAGES_BUNDLE_VERIFIED',
  base,
  scripts: scripts.length,
  styles: styles.length,
  fallback: true,
}, null, 2))
