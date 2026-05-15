'use client'

/* Pure CSS — no Framer Motion overhead */
export function FloatingGrid() {
  return (
    <>
      <style>{`
        @keyframes gridScan {
          0%   { transform: translateY(100vh); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateY(-20vh); opacity: 0; }
        }
        .grid-scan { animation: gridScan 10s linear infinite; }
      `}</style>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ opacity: 0.25 }}>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '55vh',
          backgroundImage: 'linear-gradient(rgba(0,80,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,80,255,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: 'perspective(400px) rotateX(70deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
        }} />
        <div className="grid-scan" style={{
          position: 'absolute', left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,214,255,0.35), transparent)',
        }} />
      </div>
    </>
  )
}
