// components/StarryBackground.tsx
'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const constellations = [
  // Ursa Major (Big Dipper)
  [[20, 20], [25, 25], [30, 20], [35, 25], [40, 20], [45, 25], [50, 20]],
  // Orion
  [[70, 30], [75, 40], [80, 30], [75, 20], [80, 10], [75, 5]],
  // Cassiopeia
  [[10, 70], [15, 75], [20, 70], [25, 75], [30, 70]],
  // Custom constellation
  [[60, 60], [65, 65], [70, 60], [75, 65], [80, 60]]
]

export default function StarryBackground() {
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, delay: number, opacity: number}>>([])

  useEffect(() => {
    // Create 200 stars with random positions, sizes and opacities
    const newStars = Array.from({length: 200}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.8 + 0.2
    }))
    
    // Add some shooting stars
    for (let i = 0; i < 5; i++) {
      newStars.push({
        id: 200 + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 15,
        opacity: 1
      })
    }
    
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars */}
      {stars.map((star) => (
        star.id < 200 ? (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: `0 0 ${star.size * 3}px ${star.size / 2}px rgba(255,255,255,${star.opacity * 0.5})`,
              opacity: star.opacity
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, star.opacity, 0],
              transition: { 
                delay: star.delay,
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                repeatDelay: Math.random() * 10
              }
            }}
          />
        ) : (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: `0 0 ${star.size * 8}px ${star.size}px rgba(100, 200, 255, 0.8)`
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              x: `${star.x + 30}%`,
              y: `${star.y + 30}%`,
              transition: {
                delay: star.delay,
                duration: 1,
                repeat: Infinity,
                repeatDelay: 15 + Math.random() * 15
              }
            }}
          />
        )
      ))}

      {/* Constellations */}
      {constellations.map((constellation, i) => (
        <svg
          key={i}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.3 }}
        >
          {constellation.map((point, j) => {
            if (j < constellation.length - 1) {
              const nextPoint = constellation[j + 1]
              return (
                <line
                  key={`${i}-${j}`}
                  x1={`${point[0]}%`}
                  y1={`${point[1]}%`}
                  x2={`${nextPoint[0]}%`}
                  y2={`${nextPoint[1]}%`}
                  stroke="rgba(100, 200, 255, 0.5)"
                  strokeWidth="1"
                />
              )
            }
            return null
          })}
          {constellation.map((point, j) => (
            <circle
              key={`${i}-${j}-dot`}
              cx={`${point[0]}%`}
              cy={`${point[1]}%`}
              r="3"
              fill="rgba(100, 200, 255, 0.8)"
            />
          ))}
        </svg>
      ))}
    </div>
  )
}