import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        borderRadius: '7px',
        border: '1.5px solid rgba(0,212,255,0.5)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient glow behind text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.18) 0%, transparent 70%)',
          display: 'flex',
        }}
      />
      {/* IK text */}
      <span
        style={{
          fontSize: 15,
          fontWeight: 900,
          letterSpacing: '-0.5px',
          fontFamily: 'monospace',
          background: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitBackgroundClip: 'text',
          position: 'relative',
          lineHeight: 1,
        }}
      >
        IK
      </span>
    </div>,
    { ...size }
  )
}
