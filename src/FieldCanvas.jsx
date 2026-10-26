import { useEffect, useRef } from 'react'

function seeded(seed) {
  let n = seed >>> 0
  return () => {
    n = (Math.imul(1664525, n) + 1013904223) >>> 0
    return n / 4294967296
  }
}

/**
 * A decorative, fully local 2D wave-field.
 * No WebGL, telemetry, remote models, user data or background network access.
 */
export default function FieldCanvas({ resonance = 0.62, isPlaying = true }) {
  const canvasRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (event) => {
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      pointerRef.current = {
        x: ((event.clientX / w) - 0.5) * 2,
        y: ((event.clientY / h) - 0.5) * 2,
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined

    let width = 1
    let height = 1
    let dpr = 1
    let frameId = 0
    let lastTime = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const active = isPlaying && !reduced
    const random = seeded(369)
    const nodes = Array.from({ length: 135 }, (_, i) => ({
      x: random(),
      y: random(),
      phase: random() * Math.PI * 2,
      layer: random(),
      radius: 0.65 + random() * 1.3,
      hue: i % 7 === 0 ? 'violet' : i % 3 === 0 ? 'amber' : 'cyan',
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!active) draw(0)
    }

    function draw(ms) {
      ctx.clearRect(0, 0, width, height)
      const t = active ? ms * 0.00022 : 0
      const strength = Math.max(0.05, Math.min(1, resonance))
      const cx = width * 0.53
      const cy = height * 0.49
      const scale = Math.min(width * 0.56, height * 0.82)
      const move = pointerRef.current

      // Elliptical nested orbits. All geometry comes from local math.
      for (let n = 0; n < 7; n += 1) {
        const radius = scale * (0.2 + n * 0.105)
        ctx.save()
        ctx.translate(cx + move.x * (n + 2) * 0.6, cy + move.y * (n + 2) * 0.5)
        ctx.rotate(0.2 + n * 0.36 + Math.sin(t + n) * strength * 0.07)
        ctx.beginPath()
        ctx.ellipse(0, 0, radius, radius * (0.36 + (n % 3) * 0.07), 0, 0, Math.PI * 2)
        ctx.strokeStyle = n % 3 === 0
          ? 'rgba(181,157,255,0.14)'
          : 'rgba(116,233,224,0.11)'
        ctx.lineWidth = n === 2 ? 1.1 : 0.7
        ctx.stroke()
        ctx.restore()
      }

      const points = nodes.map((p, i) => {
        const angle = p.phase + t * (p.layer * 0.27 + 0.12)
        const ux = (p.x - 0.5) * width * 0.91
        const uy = (p.y - 0.5) * height * 0.85
        const wave = Math.sin(ux * 0.011 + t * 2 + i * 0.05) *
          Math.cos(uy * 0.011 - t * 1.2) * 15 * strength
        return {
          x: width * 0.5 + ux + Math.sin(angle) * (9 + p.layer * 21) * strength + move.x * p.layer * 8,
          y: height * 0.5 + uy + wave + Math.cos(angle) * (7 + p.layer * 18) * strength + move.y * p.layer * 7,
          radius: p.radius,
          hue: p.hue,
        }
      })

      ctx.lineWidth = 0.6
      for (let i = 0; i < points.length; i += 1) {
        const a = points[i]
        if (i % 2 !== 0) continue
        for (let j = i + 1; j < Math.min(points.length, i + 20); j += 1) {
          const b = points[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance2 = dx * dx + dy * dy
          if (distance2 > 12000) continue
          ctx.strokeStyle = 'rgba(117,237,231,' + ((1 - distance2 / 12000) * 0.15).toFixed(3) + ')'
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const point of points) {
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fillStyle = point.hue === 'violet'
          ? 'rgba(181,158,255,.67)'
          : point.hue === 'amber'
            ? 'rgba(255,202,138,.62)'
            : 'rgba(121,237,225,.58)'
        ctx.fill()
      }

      const glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, scale * 0.51)
      glow.addColorStop(0, 'rgba(110,237,223,.12)')
      glow.addColorStop(0.44, 'rgba(101,190,212,.025)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, scale * 0.52, 0, Math.PI * 2)
      ctx.fill()
    }

    const tick = (time) => {
      if (document.visibilityState !== 'visible') {
        frameId = window.requestAnimationFrame(tick)
        return
      }
      if (time - lastTime >= 33) {
        draw(time)
        lastTime = time
      }
      frameId = window.requestAnimationFrame(tick)
    }

    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(resize)
      : null
    if (observer) observer.observe(canvas)
    else window.addEventListener('resize', resize)
    resize()
    if (active) frameId = window.requestAnimationFrame(tick)
    return () => {
      if (observer) observer.disconnect()
      else window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(frameId)
    }
  }, [resonance, isPlaying])

  return <canvas ref={canvasRef} className="field-canvas" aria-hidden="true" />
}
