'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Line, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { ParticleField } from './ParticleField'

// Pulsing data node (K8s pod / service)
function KubeNode({
  position,
  color = '#00d4ff',
  scale = 1,
}: {
  position: [number, number, number]
  color?: string
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (!meshRef.current || !ringRef.current) return
    meshRef.current.rotation.y += delta * (hovered ? 2 : 0.6)
    meshRef.current.rotation.x += delta * 0.3
    ringRef.current.rotation.z += delta * 0.4
    // Pulse emissive
    const pulse = 0.3 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15
    ;(meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
      <group
        position={position}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Core cube */}
        <mesh ref={meshRef}>
          <boxGeometry args={[0.38, 0.38, 0.38]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.9}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Wireframe outer */}
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.48, 0.48, 0.48]} />
          <meshStandardMaterial color={color} wireframe transparent opacity={0.2} />
        </mesh>
        {/* Orbital ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.012, 8, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.6} />
        </mesh>
        {/* Point light at node */}
        <pointLight color={color} intensity={hovered ? 1.5 : 0.4} distance={2} />
      </group>
    </Float>
  )
}

// Animated data packet traveling along a connection
function DataPulse({
  start,
  end,
  color,
  speed,
}: {
  start: [number, number, number]
  end: [number, number, number]
  color: string
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const progress = useRef(Math.random())

  useFrame((_, delta) => {
    if (!meshRef.current) return
    progress.current = (progress.current + delta * speed) % 1
    const t = progress.current
    meshRef.current.position.set(
      start[0] + (end[0] - start[0]) * t,
      start[1] + (end[1] - start[1]) * t,
      start[2] + (end[2] - start[2]) * t,
    )
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.9} />
    </mesh>
  )
}

// Connection line + data pulse
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
    [start, end]
  )

  return (
    <>
      <Line points={points} color={color} lineWidth={0.5} transparent opacity={0.18} dashed dashSize={0.25} gapSize={0.15} />
      <DataPulse start={start} end={end} color={color} speed={0.25 + Math.random() * 0.2} />
    </>
  )
}

// Rotating global infrastructure sphere
function InfraGlobe() {
  const groupRef = useRef<THREE.Group>(null)
  const wireRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!groupRef.current || !wireRef.current) return
    groupRef.current.rotation.y += delta * 0.12
    wireRef.current.rotation.y -= delta * 0.07
    wireRef.current.rotation.x += delta * 0.02
  })

  return (
    <group ref={groupRef} position={[2.8, 0.2, -2.5]}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial color="#050d1a" emissive="#00d4ff" emissiveIntensity={0.04} transparent opacity={0.7} roughness={0.9} />
      </mesh>
      {/* Wireframe latitude/longitude */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.34, 18, 18]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} wireframe transparent opacity={0.1} />
      </mesh>
      {/* Equatorial ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.01, 8, 80]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.8} transparent opacity={0.5} />
      </mesh>
      {/* Polar ring */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.7, 0.005, 8, 80]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.6} transparent opacity={0.3} />
      </mesh>
      {/* Sparkles around globe */}
      <Sparkles count={30} scale={4} size={1} speed={0.2} color="#00d4ff" opacity={0.4} />
    </group>
  )
}

// Subtle mouse parallax
function CameraRig() {
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.02
    camera.position.y += (mouse.y * 0.4 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })
  return null
}

const NODES: Array<{ pos: [number, number, number]; color: string; scale: number }> = [
  { pos: [-3.2, 1.2, 0.2], color: '#00d4ff', scale: 1.1 },
  { pos: [-1.6, -0.6, 0.6], color: '#7c3aed', scale: 0.9 },
  { pos: [0.2, 1.8, 0.1], color: '#10b981', scale: 1.0 },
  { pos: [1.2, -1.0, 0.4], color: '#f59e0b', scale: 0.85 },
  { pos: [-2.8, -1.8, -0.4], color: '#00d4ff', scale: 0.8 },
  { pos: [0.8, 0.2, 1.2], color: '#7c3aed', scale: 0.95 },
  { pos: [-0.6, -1.4, 0.8], color: '#10b981', scale: 0.75 },
]

const CONNECTIONS: Array<[number, number, string]> = [
  [0, 1, '#00d4ff'],
  [1, 2, '#7c3aed'],
  [2, 3, '#10b981'],
  [1, 5, '#7c3aed'],
  [0, 4, '#00d4ff'],
  [2, 5, '#00d4ff'],
  [4, 6, '#10b981'],
  [6, 1, '#7c3aed'],
  [3, 5, '#f59e0b'],
]

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[6, 6, 4]} intensity={1.5} color="#00d4ff" />
      <pointLight position={[-6, -4, 2]} intensity={0.8} color="#7c3aed" />
      <pointLight position={[0, 8, -4]} intensity={0.4} color="#10b981" />

      {/* Background particles */}
      <ParticleField count={700} />

      {/* Global infrastructure globe */}
      <InfraGlobe />

      {/* K8s / service nodes */}
      {NODES.map((n, i) => (
        <KubeNode key={i} position={n.pos} color={n.color} scale={n.scale} />
      ))}

      {/* Connections with data pulses */}
      {CONNECTIONS.map(([a, b, color], i) => (
        <ConnectionLine
          key={i}
          start={NODES[a as number].pos}
          end={NODES[b as number].pos}
          color={color as string}
        />
      ))}

      {/* Volumetric sparkles in scene */}
      <Sparkles count={60} scale={12} size={0.6} speed={0.1} color="#00d4ff" opacity={0.15} />

      <CameraRig />
    </Canvas>
  )
}
