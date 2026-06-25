import { useRef } from 'react'
import LiquidGlass from 'liquid-glass-react'

function getDemo() {
  const params = new URLSearchParams(window.location.search)
  return params.get('demo') || 'basic'
}

function BasicDemo() {
  return (
    <div
      id="demo"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/aurora.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
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
  )
}

function ProminentDemo() {
  return (
    <div
      id="demo"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/ocean.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        alignItems: 'center',
        justifyItems: 'center',
        gap: 0,
        padding: '60px',
        boxSizing: 'border-box',
      }}
    >
      <LiquidGlass mode="standard">
        <div style={{ padding: '24px 48px' }}>
          <p style={{ margin: 0, color: 'white', fontWeight: 700, fontSize: '1rem', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>standard</p>
        </div>
      </LiquidGlass>
      <LiquidGlass mode="prominent">
        <div style={{ padding: '24px 48px' }}>
          <p style={{ margin: 0, color: 'white', fontWeight: 700, fontSize: '1rem', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>prominent</p>
        </div>
      </LiquidGlass>
      <LiquidGlass mode="polar" cornerRadius={999}>
        <div style={{ padding: '24px 48px' }}>
          <p style={{ margin: 0, color: 'white', fontWeight: 700, fontSize: '1rem', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>polar</p>
        </div>
      </LiquidGlass>
      <LiquidGlass mode="shader">
        <div style={{ padding: '24px 48px' }}>
          <p style={{ margin: 0, color: 'white', fontWeight: 700, fontSize: '1rem', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>shader</p>
        </div>
      </LiquidGlass>
    </div>
  )
}

function OverLightDemo() {
  return (
    <div
      id="demo"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* Dark side — aurora */}
      <div
        style={{
          flex: 1,
          backgroundImage: 'url(/aurora.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <LiquidGlass>
          <div style={{ padding: '20px 28px' }}>
            <p style={{ margin: 0, color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>overLight=false</p>
            <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem' }}>
              dark background (default)
            </p>
          </div>
        </LiquidGlass>
      </div>
      {/* Light side — snowy mountains */}
      <div
        style={{
          flex: 1,
          backgroundImage: 'url(/snow-forest.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <LiquidGlass overLight={true}>
          <div style={{ padding: '20px 28px' }}>
            <p style={{ margin: 0, color: '#1a1a2e', fontWeight: 700, fontSize: '0.95rem' }}>overLight=true</p>
            <p style={{ margin: '4px 0 0', color: '#444', fontSize: '0.82rem' }}>
              light background
            </p>
          </div>
        </LiquidGlass>
      </div>
    </div>
  )
}

function NavDemo() {
  const pageRef = useRef(null)

  return (
    <div
      id="demo"
      ref={pageRef}
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/mountains.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <LiquidGlass
        mouseContainer={pageRef}
        displacementScale={50}
        blurAmount={0.08}
        saturation={130}
        cornerRadius={16}
        padding="12px 24px"
        style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
      >
        <nav style={{ display: 'flex', gap: 32, color: 'white', fontWeight: 600, fontSize: '0.95rem', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
          <span>Home</span>
          <span>Docs</span>
          <span>Blog</span>
          <span>GitHub</span>
        </nav>
      </LiquidGlass>

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
