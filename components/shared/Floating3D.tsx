'use client'

/* Pure CSS 3D — replaces heavy Framer Motion loops.
   All shapes use CSS @keyframes so they never block the JS thread. */
export function Floating3D() {
  return (
    <>
      <style>{`
        @keyframes f3dFloat  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-24px) rotate(6deg)} }
        @keyframes f3dSpin   { to { transform: rotateX(360deg) rotateY(360deg); } }
        @keyframes f3dOrbit  { to { transform: rotate(360deg); } }
        .f3d-float { animation: f3dFloat var(--fd,14s) ease-in-out infinite var(--fdelay,0s); }
        .f3d-cube  { animation: f3dSpin  var(--fs,9s)  linear     infinite; transform-style:preserve-3d; }
        .f3d-ring  { animation: f3dOrbit var(--fr,11s) linear     infinite; }
      `}</style>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        {/* Top-right cube */}
        <div className="f3d-float absolute" style={{ '--fd':'13s','--fdelay':'0s', right:'8%', top:'18%' } as React.CSSProperties}>
          <div className="f3d-cube" style={{ '--fs':'8s', width:44, height:44, border:'1.5px solid rgba(0,80,255,0.35)', background:'rgba(0,80,255,0.06)' } as React.CSSProperties} />
        </div>

        {/* Left mid sphere */}
        <div className="f3d-float absolute" style={{ '--fd':'17s','--fdelay':'-5s', left:'4%', top:'45%' } as React.CSSProperties}>
          <div style={{
            width:38, height:38, borderRadius:'50%',
            border:'1.5px solid rgba(0,214,255,0.3)',
            background:'radial-gradient(circle at 35% 35%, rgba(0,214,255,0.18), rgba(0,214,255,0.04) 60%, transparent)',
            boxShadow:'0 0 20px rgba(0,214,255,0.12)',
          }} />
        </div>

        {/* Bottom-right ring */}
        <div className="f3d-float absolute" style={{ '--fd':'20s','--fdelay':'-9s', right:'5%', bottom:'25%' } as React.CSSProperties}>
          <div className="f3d-ring" style={{ '--fr':'10s', width:48, height:48, borderRadius:'50%', border:'2px solid rgba(0,80,255,0.3)', boxShadow:'0 0 12px rgba(0,80,255,0.15)' } as React.CSSProperties} />
        </div>

        {/* Top-left small cube */}
        <div className="f3d-float absolute" style={{ '--fd':'11s','--fdelay':'-3s', left:'12%', top:'22%' } as React.CSSProperties}>
          <div className="f3d-cube" style={{ '--fs':'12s', width:28, height:28, border:'1px solid rgba(0,214,255,0.25)', background:'rgba(0,214,255,0.04)' } as React.CSSProperties} />
        </div>

      </div>
    </>
  )
}
