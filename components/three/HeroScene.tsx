'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import * as THREE from 'three'
import { ParticleField } from './ParticleField'

function KubeNode({
  position,
  color = '#00d4ff',
}: {
  position: [number, number, number]
  color?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        <mesh ref={meshRef}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.46, 0.46, 0.46]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.1}
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>
    </Float>
  )
}

function ConnectionLine({
  start,
  end,
  color = '#00d4ff',
}: {
  start: [number, number, number]
  end: [number, number, number]
  color?: string
}) {
  const points = useMemo(
    () => [new THREE.Vector3(...start), new THREE.Vector3(...end)],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Line
      points={points}
      color={color}
      lineWidth={0.4}
      transparent
      opacity={0.2}
      dashed
      dashSize={0.3}
      gapSize={0.2}
    />
  )
}

function InfraGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!meshRef.current || !wireRef.current) return
    meshRef.current.rotation.y += delta * 0.15
    wireRef.current.rotation.y -= delta * 0.08
    wireRef.current.rotation.x += delta * 0.03
  })

  return (
    <group position={[2.5, 0, -2]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#0a1628" emissive="#00d4ff" emissiveIntensity={0.05} transparent opacity={0.5} />
      </mesh>
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.26, 16, 16]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} wireframe transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.008, 8, 64]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function CameraRig() {
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02
    camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })
  return null
}

const NODES: Array<{ pos: [number, number, number]; color: string }> = [
  { pos: [-3, 1, 0], color: '#00d4ff' },
  { pos: [-1.5, -0.5, 0.5], color: '#7c3aed' },
  { pos: [0, 1.5, 0], color: '#10b981' },
  { pos: [1.5, -0.8, 0.3], color: '#f59e0b' },
  { pos: [-2.5, -1.5, -0.5], color: '#00d4ff' },
  { pos: [0.5, 0, 1], color: '#7c3aed' },
]

const CONNECTIONS: Array<[number, number, string]> = [
  [0, 1, '#00d4ff'],
  [1, 2, '#7c3aed'],
  [2, 3, '#10b981'],
  [1, 5, '#7c3aed'],
  [0, 4, '#00d4ff'],
  [2, 5, '#00d4ff'],
]

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
      <pointLight position={[-5, -3, 2]} intensity={0.5} color="#7c3aed" />

      <ParticleField count={500} />
      <InfraGlobe />

      {NODES.map((n, i) => (
        <KubeNode key={i} position={n.pos} color={n.color} />
      ))}

      {CONNECTIONS.map(([a, b, color], i) => (
        <ConnectionLine
          key={i}
          start={NODES[a as number].pos}
          end={NODES[b as number].pos}
          color={color as string}
        />
      ))}

      <CameraRig />
    </Canvas>
  )
}
