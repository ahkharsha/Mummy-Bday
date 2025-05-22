// components/SecretGate.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const WRONG_PASSWORD_FEEDBACK = [
  "Nope! Not the magic word! 🔮",
  "Wrong! Did you forget your own secrets? 🤔",
  "Incorrect! Try harder, wizard! 🧙‍♂️",
  "Not even close! The force is weak with this one... ⚔️",
  "Wrong password! Are you an impostor? 👀"
]

export default function SecretGate({ onClose }: { onClose: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [isFamilyFriendly, setIsFamilyFriendly] = useState(false)
  const router = useRouter()

  const correctHash = 'fb6ffcf7f6315c6aa4f3e7859b03d78837d33a3f5cf3ef8c76bf76a8f8f8b230'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(password)
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      
      if (hashHex === correctHash) {
        sessionStorage.setItem('secretAuth', 'true')
        sessionStorage.setItem('familyFriendly', isFamilyFriendly.toString())
        router.push('/secret')
      } else {
        const attempts = wrongAttempts + 1
        setWrongAttempts(attempts)
        
        const feedbackIndex = Math.min(attempts - 1, WRONG_PASSWORD_FEEDBACK.length - 1)
        setError(WRONG_PASSWORD_FEEDBACK[feedbackIndex])
      }
    } catch (err) {
      setError("Error processing password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="relative bg-gradient-to-br from-sky-900/20 to-purple-900/20 p-8 rounded-2xl border border-sky-400/20 backdrop-blur-sm max-w-md w-full"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-sky-300 hover:text-white transition"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <h2 className="text-3xl mb-4 text-sky-400 text-center">Secret Passage</h2>
          <p className="mb-6 text-center text-sky-200/80">
            Enter the passphrase to continue
          </p>
          
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Whisper the secret words..."
              className="w-full p-3 bg-black/40 border border-sky-400/30 rounded-lg mb-4 text-white focus:outline-none focus:ring-1 focus:ring-sky-400/50"
              required
            />
            
            {/* Always visible hint */}
            <div className="mb-4 p-3 bg-sky-900/20 rounded-lg text-sky-300 text-sm">
              <p className="font-bold mb-1">Hint:</p>
              <p>Your bestfriend's most common password, followed by the first name of the current crush followed by the first name of his 3rd sem crush, separated by +</p>
            </div>
            
            {/* Family friendly toggle */}
            <div className="flex items-center mb-4">
              <button
                type="button"
                onClick={() => setIsFamilyFriendly(!isFamilyFriendly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  isFamilyFriendly ? 'bg-sky-400' : 'bg-gray-400'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isFamilyFriendly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="ml-3 text-sm text-sky-200">
                Are you using Laptop?
              </span>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-sky-400 to-purple-400 text-black py-3 rounded-lg font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">🌀</span>
                  Verifying...
                </>
              ) : (
                'Reveal Hidden Path'
              )}
            </button>
          </form>
          
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-900/20 rounded-lg text-red-300 text-sm"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}