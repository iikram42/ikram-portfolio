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
        background: 'linear-gradient(135deg, #00b4d8 0%, #6d28d9 100%)',
        borderRadius: '7px',
      }}
    >
      <span
        style={{
          fontSize: 16,
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '-1px',
          fontFamily: 'Arial Black, Arial, sans-serif',
          lineHeight: 1,
        }}
      >
        IK
      </span>
    </div>,
    { ...size }
  )
}
