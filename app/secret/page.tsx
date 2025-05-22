// app/secret/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import StarryBackground from '@/components/StarryBackground'

export default function SecretPage() {
  const router = useRouter()
  const [currentStage, setCurrentStage] = useState(0)
  const [photos, setPhotos] = useState<string[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isFamilyFriendly, setIsFamilyFriendly] = useState(false)

  // Updated stages without final gift
  const STAGES = isFamilyFriendly 
    ? ['birthday-wish', 'video', 'photos'] 
    : ['birthday-wish', 'video', 'message', 'photos']

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('secretAuth')
      const ff = sessionStorage.getItem('familyFriendly')
      if (!auth) {
        router.push('/')
      } else {
        setIsAuthenticated(true)
        setIsFamilyFriendly(ff === 'true')
      }
    }

    const photoFolder = isFamilyFriendly ? 'group-pics' : 'pics'
    const loadedPhotos = Array.from({length: 16}, (_, i) => `/${photoFolder}/photo${i+1}.jpg`)
    setPhotos(loadedPhotos)
  }, [router, isFamilyFriendly])

  const nextStage = () => {
    if (currentStage < STAGES.length - 1) {
      setCurrentStage(currentStage + 1)
    }
  }

  const prevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin text-sky-400 text-4xl mb-4">🌀</div>
          <p className="text-sky-200">Verifying access...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-x-hidden">
      <StarryBackground />
      
      <motion.div
        className="absolute top-20 right-20 w-2 h-2 rounded-full bg-white shadow-lg shadow-sky-400/50"
        initial={{ x: 100, y: -100, opacity: 0 }}
        animate={{ 
          x: -100, 
          y: 100, 
          opacity: [0, 1, 0],
          transition: {
            duration: 5,
            repeat: Infinity,
            repeatDelay: 15
          }
        }}
      />
      
      <button
        onClick={prevStage}
        disabled={currentStage === 0}
        className={`fixed top-1/2 left-6 z-50 transform -translate-y-1/2 bg-sky-900/50 hover:bg-sky-800/70 p-3 rounded-full border border-sky-400/30 transition-all ${
          currentStage === 0 ? 'opacity-0 pointer-events-none' : ''
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        onClick={nextStage}
        disabled={currentStage === STAGES.length - 1}
        className={`fixed top-1/2 right-6 z-50 transform -translate-y-1/2 bg-sky-900/50 hover:bg-sky-800/70 p-3 rounded-full border border-sky-400/30 transition-all ${
          currentStage === STAGES.length - 1 ? 'opacity-0 pointer-events-none' : ''
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <button
        onClick={() => router.push('/')}
        className="fixed top-6 left-6 z-50 bg-sky-900/50 hover:bg-sky-800/70 p-2 rounded-full border border-sky-400/30 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
        {STAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStage(i)}
            className={`w-3 h-3 rounded-full transition-all ${i <= currentStage ? 'bg-sky-400' : 'bg-gray-600'}`}
            aria-label={`Go to stage ${i+1}`}
          />
        ))}
      </div>

      {currentStage === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex flex-col items-center justify-center text-center p-6"
        >
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400`}
          >
            {isFamilyFriendly 
              ? "Happppppppiestttttttttt Birthdayyyyyyyyy\n dearrrr Mummmyyyyy 🎉🎂✨"
              : "Happppppppiestttttttttt Birthdayyyyyyyyy\n dearrrr Mummmyyyyy 🎉🎂✨"}
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-sky-200 mb-12"
          >
            {isFamilyFriendly
              ? "Just 5 more years to hit Half Century... Keep going mums!! 😁"
              : "Just 5 more years to hit Half Century... Keep going mums!! 😁"}
          </motion.p>

          <motion.button
            onClick={nextStage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-sky-400 to-purple-400 text-black rounded-lg font-bold text-lg shadow-lg hover:shadow-sky-400/30 transition-all"
          >
            Watch our Video Message 🎥
          </motion.button>
        </motion.div>
      )}

      {currentStage === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex flex-col items-center justify-center p-6"
        >
          <h2 className="text-3xl font-bold text-sky-400 mb-8">Your Special Video Message</h2>
          
          <div className="w-full max-w-2xl bg-black rounded-xl overflow-hidden border border-sky-400/30">
            <video
              controls
              autoPlay
              className="w-full"
              onEnded={nextStage}
            >
              <source src={isFamilyFriendly ? "/harsha_ff.mp4" : "/wishes.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <button
            onClick={nextStage}
            className="mt-8 flex items-center gap-2 text-sky-300 hover:text-sky-100 transition"
          >
            Continue to photos 🖼️
            <span className="text-xl">→</span>
          </button>
        </motion.div>
      )}

      {!isFamilyFriendly && currentStage === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex flex-col items-center justify-center p-6 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-sky-900/20 to-purple-900/20 p-8 rounded-2xl border border-sky-400/20 backdrop-blur-sm text-center"
          >
            <h2 className="text-3xl font-bold text-sky-400 mb-6">Happy birthday Mommy 🎊 🥳 ❤</h2>
            <div className="text-lg leading-relaxed space-y-4">
              <p>Mommy, on behalf of the family dear,</p>
              <p>We wish you joy and endless cheer.</p>
              <p>Through every storm, you stood so strong,</p>
              <p>Guiding us gently, all along.</p>
              
              <p>Thank you for never letting go,</p>
              <p>Even when life moved harsh and slow.</p>
              <p>Your love, a light that always shines,</p>
              <p>In darkest hours, through toughest times.</p>
              
              <p>You're truly a woman brave and wise,</p>
              <p>With warmth as vast as endless skies.</p>
              <p>May this birthday bring smiles your way,</p>
              <p>And bless your heart more every day.</p>
            </div>
          </motion.div>

          <button
            onClick={nextStage}
            className="mt-12 px-6 py-3 bg-sky-400 text-black rounded-lg font-bold hover:bg-sky-300 transition flex items-center gap-2"
          >
            See Our Photos 📸
          </button>
        </motion.div>
      )}

      {(currentStage === (isFamilyFriendly ? 2 : 3)) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen py-12"
        >
          <h2 className="text-3xl font-bold text-center text-sky-400 mb-8">
            {isFamilyFriendly ? "Our Wonderful Memories 🖼️✨" : "Our Cherished Memories ❤️"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative group overflow-hidden rounded-xl border-2 border-sky-400/30 hover:border-sky-400/50 transition-all cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo}
                  alt={`Memory ${i+1}`}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-lg font-bold">Click to enlarge</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 text-white hover:text-sky-300 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <img
                src={selectedPhoto}
                alt="Enlarged memory"
                className="w-full max-h-[90vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}