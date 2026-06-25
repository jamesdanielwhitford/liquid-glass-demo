import { useRef, useState, useCallback } from 'react'
import LiquidGlass from 'liquid-glass-react'

function getDemo() {
  const params = new URLSearchParams(window.location.search)
  return params.get('demo') || 'basic'
}

function useDraggable(initialX, initialY) {
  const [pos, setPos] = useState({ x: initialX, y: initialY })
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const onMouseDown = useCallback((e) => {
    dragging.current = true
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    e.preventDefault()
  }, [pos])

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return
    setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y })
  }, [])

  const onMouseUp = useCallback(() => {
    dragging.current = false
  }, [])

  return { pos, onMouseDown, onMouseMove, onMouseUp }
}

function BasicDemo() {
  const { pos, onMouseDown, onMouseMove, onMouseUp } = useDraggable(
    window.innerWidth / 2 - 120,
    window.innerHeight / 2 - 60
  )

  return (
    <div
      id="demo"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/aurora.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div
        onMouseDown={onMouseDown}
        style={{ position: 'absolute', left: pos.x, top: pos.y, cursor: 'grab' }}
      >
        <LiquidGlass>
          <div style={{ padding: '24px 32px' }}>
            <h2 style={{ margin: 0, color: 'white', fontSize: '1.4rem', fontWeight: 600 }}>Hello, Liquid Glass</h2>
            <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>
              This content is wrapped in a glass effect.
            </p>
          </div>
        </LiquidGlass>
      </div>
    </div>
  )
}

function ProminentDemo() {
  const d1 = useDraggable(200, 150)
  const d2 = useDraggable(600, 150)
  const d3 = useDraggable(200, 400)
  const d4 = useDraggable(600, 400)

  const handlers = [d1, d2, d3, d4]
  const modes = ['standard', 'prominent', 'polar', 'shader']
  const cornerRadii = [undefined, undefined, 999, undefined]

  const onMouseMove = useCallback((e) => {
    handlers.forEach(h => h.onMouseMove(e))
  }, [])
  const onMouseUp = useCallback(() => {
    handlers.forEach(h => h.onMouseUp())
  }, [])

  return (
    <div
      id="demo"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/ocean.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {handlers.map((h, i) => (
        <div
          key={modes[i]}
          onMouseDown={h.onMouseDown}
          style={{ position: 'absolute', left: h.pos.x, top: h.pos.y, cursor: 'grab' }}
        >
          <LiquidGlass mode={modes[i]} cornerRadius={cornerRadii[i]}>
            <div style={{ padding: '24px 48px' }}>
              <p style={{ margin: 0, color: 'white', fontWeight: 700, fontSize: '1rem', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
                {modes[i]}
              </p>
            </div>
          </LiquidGlass>
        </div>
      ))}
    </div>
  )
}

function OverLightDemo() {
  const dark = useDraggable(100, window.innerHeight / 2 - 50)
  const light = useDraggable(window.innerWidth / 2 + 100, window.innerHeight / 2 - 50)

  const onMouseMove = useCallback((e) => {
    dark.onMouseMove(e)
    light.onMouseMove(e)
  }, [])
  const onMouseUp = useCallback(() => {
    dark.onMouseUp()
    light.onMouseUp()
  }, [])

  return (
    <div
      id="demo"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{ minHeight: '100vh', display: 'flex', userSelect: 'none', position: 'relative' }}
    >
      {/* Dark side — aurora */}
      <div style={{
        flex: 1,
        backgroundImage: 'url(/aurora.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}>
        <div
          onMouseDown={dark.onMouseDown}
          style={{ position: 'absolute', left: dark.pos.x, top: dark.pos.y, cursor: 'grab' }}
        >
          <LiquidGlass>
            <div style={{ padding: '20px 28px' }}>
              <p style={{ margin: 0, color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>overLight=false</p>
              <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem' }}>dark background (default)</p>
            </div>
          </LiquidGlass>
        </div>
      </div>
      {/* Light side — snowy mountains */}
      <div style={{
        flex: 1,
        backgroundImage: 'url(/snow-forest.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}>
        <div
          onMouseDown={light.onMouseDown}
          style={{ position: 'absolute', left: light.pos.x - window.innerWidth / 2, top: light.pos.y, cursor: 'grab' }}
        >
          <LiquidGlass overLight={true}>
            <div style={{ padding: '20px 28px' }}>
              <p style={{ margin: 0, color: '#1a1a2e', fontWeight: 700, fontSize: '0.95rem' }}>overLight=true</p>
              <p style={{ margin: '4px 0 0', color: '#444', fontSize: '0.82rem' }}>light background</p>
            </div>
          </LiquidGlass>
        </div>
      </div>
    </div>
  )
}

function NavDemo() {
  const pageRef = useRef(null)
  const { pos, onMouseDown, onMouseMove, onMouseUp } = useDraggable(
    window.innerWidth / 2 - 160,
    16
  )

  return (
    <div
      id="demo"
      ref={pageRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/mountains.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div
        onMouseDown={onMouseDown}
        style={{ position: 'absolute', left: pos.x, top: pos.y, cursor: 'grab', zIndex: 10 }}
      >
        <LiquidGlass
          mouseContainer={pageRef}
          displacementScale={50}
          blurAmount={0.08}
          saturation={130}
          cornerRadius={16}
          padding="12px 24px"
        >
          <nav style={{ display: 'flex', gap: 32, color: 'white', fontWeight: 600, fontSize: '0.95rem', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
            <span>Home</span>
            <span>Docs</span>
            <span>Blog</span>
            <span>GitHub</span>
          </nav>
        </LiquidGlass>
      </div>

      <div style={{ padding: '120px 40px', color: 'white' }}>
        <h1 style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>Page content here</h1>
        <p style={{ opacity: 0.85, textShadow: '0 1px 4px rgba(0,0,0,0.5)', maxWidth: 480 }}>
          The glass navigation bar floats above, tracking mouse movement across the full page.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const demo = getDemo()
  if (demo === 'prominent') return <ProminentDemo />
  if (demo === 'over-light') return <OverLightDemo />
  if (demo === 'nav-example') return <NavDemo />
  return <BasicDemo />
}
