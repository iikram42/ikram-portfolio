'use client'

/* Pure CSS animations — far lighter than Framer Motion for simple ambient effects */
export function AmbientOrbs() {
  return (
    <>
      <style>{`
        @keyframes orbFloat {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(20px,-15px) scale(1.05); }
          66%      { transform: translate(-12px,18px) scale(0.97); }
        }
        .orb { animation: orbFloat var(--d,18s) ease-in-out infinite var(--delay,0s); }
      `}</style>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb absolute rounded-full" style={{ '--d':'18s','--delay':'0s', width:350, height:350, left:'-5%', top:'15%', background:'radial-gradient(circle, rgba(0,80,255,0.06) 0%, transparent 70%)' } as React.CSSProperties} />
        <div className="orb absolute rounded-full" style={{ '--d':'24s','--delay':'-6s', width:280, height:280, left:'65%', top:'55%', background:'radial-gradient(circle, rgba(0,214,255,0.04) 0%, transparent 70%)' } as React.CSSProperties} />
        <div className="orb absolute rounded-full" style={{ '--d':'16s','--delay':'-10s', width:220, height:220, left:'35%', top:'-5%', background:'radial-gradient(circle, rgba(0,80,255,0.035) 0%, transparent 70%)' } as React.CSSProperties} />
      </div>
    </>
  )
}
