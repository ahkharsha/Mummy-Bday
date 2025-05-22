// components/Confetti.tsx
'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Shape = 'circle' | 'star' | 'heart' | 'sparkle' | 'diamond'
type Particle = {
  id: number,
  x: number,
  y: number,
  color: string,
  shape: Shape,
  size: number,
  rotation: number,
  duration: number
}

const SHAPES: Shape[] = ['circle', 'star', 'heart', 'sparkle', 'diamond']
const COLORS = ['#38bdf8', '#a78bfa', '#fbbf24', '#f472b6', '#4ade80', '#f97316', '#10b981', '#ec4899']

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Initial burst
    const initialBurst = Array.from({length: 150}, (_, i): Particle => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 - 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      size: Math.random() * 0.8 + 0.5,
      rotation: Math.random() * 360,
      duration: 3 + Math.random() * 7
    }))
    setParticles(initialBurst)

    // Ongoing confetti
    const burstInterval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-300),
        ...Array.from({length: 20}, (_, i): Particle => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: -10,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
          size: Math.random() * 0.8 + 0.5,
          rotation: Math.random() * 360,
          duration: 3 + Math.random() * 7
        }))
      ])
    }, 1000)

    // Glitter particles
    const glitterInterval = setInterval(() => {
      setParticles(prev => [
        ...prev,
        ...Array.from({length: 5}, (_, i): Particle => ({
          id: Date.now() + i + 1000,
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: 'sparkle',
          size: Math.random() * 0.3 + 0.2,
          rotation: Math.random() * 360,
          duration: 1 + Math.random() * 2
        }))
      ])
    }, 300)

    return () => {
      clearInterval(burstInterval)
      clearInterval(glitterInterval)
    }
  }, [])

  const getShape = (shape: Shape, size: number) => {
    const sizePx = `${size * 16}px`
    switch(shape) {
      case 'star':
        return (
          <svg viewBox="0 0 24 24" width={sizePx} height={sizePx}>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/>
          </svg>
        )
      case 'heart':
        return (
          <svg viewBox="0 0 24 24" width={sizePx} height={sizePx}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
          </svg>
        )
      case 'sparkle':
        return (
          <svg viewBox="0 0 24 24" width={sizePx} height={sizePx}>
            <path d="M12 2L9 12l-10 7 10-7 7 10 7-10-10 7z" fill="currentColor"/>
          </svg>
        )
      case 'diamond':
        return (
          <svg viewBox="0 0 24 24" width={sizePx} height={sizePx}>
            <path d="M12 2L2 12l10 10 10-10z" fill="currentColor"/>
          </svg>
        )
      default:
        return <div className="rounded-full" style={{ width: sizePx, height: sizePx }} />
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            color: particle.color,
            rotate: particle.rotation
          }}
          animate={{
            y: particle.y + 120,
            x: particle.x + (Math.random() * 40 - 20),
            rotate: particle.rotation + 360,
            opacity: [1, 0.8, 0]
          }}
          transition={{
            duration: particle.duration,
            ease: "linear"
          }}
        >
          {getShape(particle.shape, particle.size)}
        </motion.div>
      ))}
    </div>
  )
}