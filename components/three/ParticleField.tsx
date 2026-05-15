'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ParticleField({ count = 300 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color()
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      const t = Math.random()
      if (t < 0.6) color.setHex(0x00d4ff)
      else if (t < 0.85) color.setHex(0x7c3aed)
      else color.setHex(0x10b981)
      colors[i * 3] = color.r * (0.3 + Math.random() * 0.3)
      colors[i * 3 + 1] = color.g * (0.3 + Math.random() * 0.3)
      colors[i * 3 + 2] = color.b * (0.3 + Math.random() * 0.3)
    }
    return { positions, colors }
  }, [count])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.02
    meshRef.current.rotation.x += delta * 0.005
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}
