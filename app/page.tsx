// app/page.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { italianno } from './fonts'
import FriendMessages from '@/components/FriendMessages'
import Confetti from '@/components/Confetti'
import SecretGate from '@/components/SecretGate'
import StarryBackground from '@/components/StarryBackground'

export default function Home() {
  const [showSecret, setShowSecret] = useState(false)

  return (
    <div className="min-h-screen relative">
      <StarryBackground />
      <Confetti />
      
      <main className="container mx-auto px-6 py-16 relative z-10">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className={`${italianno.className} text-7xl md:text-8xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400`}>
            Happy 20th Dishaaa!
          </h1>
          <p className="text-xl text-sky-200/80 max-w-2xl mx-auto">
            A collection of special messages just for you
          </p>
          <p className="mt-4 text-sky-400/60 italic">
            Guess all senders correctly to unlock a special surprise!
          </p>
        </motion.section>

        {/* Messages Section */}
        <FriendMessages setShowSecret={setShowSecret} />
      </main>

      {/* Secret Gate Modal */}
      <AnimatePresence>
        {showSecret && <SecretGate onClose={() => setShowSecret(false)} />}
      </AnimatePresence>
    </div>
  )
}