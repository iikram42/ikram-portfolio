'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Skill } from '@/types'

const CATEGORY_COLORS: Record<string, string> = {
  cloud: '#00d4ff',
  iac: '#7c3aed',
  cicd: '#10b981',
  containers: '#f59e0b',
  scripting: '#ef4444',
  monitoring: '#06b6d4',
  security: '#84cc16',
}

function SkillNode({
  skill,
  position,
  isSelected,
  onSelect,
}: {
  skill: Skill
  position: [number, number, number]
  isSelected: boolean
  onSelect: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const color = CATEGORY_COLORS[skill.category] || '#00d4ff'
  const size = 0.12 + skill.level * 0.04

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0] * 2) * 0.08
    if (isSelected) meshRef.current.rotation.y += 0.03
  })

  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={onSelect}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 0.9 : 0.3}
          transparent
          opacity={isSelected ? 1 : 0.8}
        />
      </mesh>
      {isSelected && (
        <Html center distanceFactor={6}>
          <div
            className="px-2 py-1 rounded text-xs text-white whitespace-nowrap pointer-events-none border border-white/10"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
          >
            {skill.name} · L{skill.level}
          </div>
        </Html>
      )}
    </group>
  )
}

function Galaxy({ skills }: { skills: Skill[] }) {
  const [selected, setSelected] = useState<string | null>(null)
  const groupRef = useRef<THREE.Group>(null)

  const positions = useMemo((): [number, number, number][] => {
    return skills.map((_, i) => {
      const angle = (i / skills.length) * Math.PI * 2
      const radius = 2 + (i % 3) * 0.6
      const height = Math.sin(i * 1.3) * 1.2
      return [Math.cos(angle) * radius, height, Math.sin(angle) * radius]
    })
  }, [skills])

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          position={positions[i]}
          isSelected={selected === skill.name}
          onSelect={() => setSelected(selected === skill.name ? null : skill.name)}
        />
      ))}
    </group>
  )
}

export function SkillsGalaxy({ skills }: { skills: Skill[] }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1} color="#00d4ff" />
      <pointLight position={[-4, -2, -4]} intensity={0.6} color="#7c3aed" />
      <Galaxy skills={skills} />
    </Canvas>
  )
}
