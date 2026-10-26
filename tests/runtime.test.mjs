import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

// The original CI only transpiled JSX, allowing a successful bundle with an
// unbound React identifier at runtime. This test EXECUTES the transformed App.
test('React entry renders meaningful UI instead of an empty mount', async () => {
  const server = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
    logLevel: 'error',
  })
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.jsx')
    const html = renderToString(createElement(App))
    assert.ok(html.length > 15000, 'Page unexpectedly rendered almost nothing')
    for (const phrase of [
      'Ideas have',
      'gravity.',
      'ENTER THE FIELD',
      'Sovereign Commons',
      'Super Φ.Vessel',
      'Field Atlas',
      'Two fields.',
      'Ledger above ego.',
      'LOCAL SIMULATION',
      'LIVE CROSSING / NOT VERIFIED',
    ]) {
      assert.ok(html.includes(phrase), 'Rendered page missing: ' + phrase)
    }
    assert.match(html, /<canvas\b/)
    assert.match(html, /href="https:\/\/michaelwave369\.github\.io\/xi-vessel-bridge\/"/)
  } finally {
    await server.close()
  }
})

test('every JSX component binds the React object required by classic transforms', () => {
  for (const path of ['src/App.jsx', 'src/FieldCanvas.jsx', 'src/main.jsx']) {
    const source = readFileSync(new URL('../' + path, import.meta.url), 'utf8')
    assert.match(source, /^import React(?:,|\s+from)/m, path + ' lacks React runtime binding')
  }
})

test('static HTML has a readable no-JavaScript fallback instead of a blank body', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  assert.match(html, /<div id="root">[\s\S]*Loading the field/)
  assert.match(html, /<script type="module" src="\/src\/main\.jsx"><\/script>/)
  assert.match(html, /The application did not start/)
})
