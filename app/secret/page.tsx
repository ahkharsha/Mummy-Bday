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

  // Dynamic stages based on family friendly mode
  const STAGES = isFamilyFriendly 
    ? ['birthday-wish', 'video', 'photos', 'final-gift'] 
    : ['birthday-wish', 'video', 'message', 'photos', 'final-gift']

  useEffect(() => {
    // Verify authentication and family friendly mode
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

    // Load appropriate photos
    const photoFolder = isFamilyFriendly ? 'group-pics' : 'goofy-pics'
    const loadedPhotos = Array.from({length: 8}, (_, i) => `/${photoFolder}/photo${i+1}.jpg`)
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
      
      {/* Comet animation */}
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
      
      {/* Navigation Arrows */}
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

      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="fixed top-6 left-6 z-50 bg-sky-900/50 hover:bg-sky-800/70 p-2 rounded-full border border-sky-400/30 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>

      {/* Progress Indicator */}
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

      {/* Stage 1: Birthday Wish */}
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
              ? "Happppppppiestttttttttt Birthdayyyyyyyyy\nmy dearestttttttttt Broskiiiiiiii 🎉🎂✨"
              : "Happppppppiestttttttttt Birthdayyyyyyyyy\nmy dearestttttttttt Bujukutiiiiiiiii 🎉🎂✨"}
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-sky-200 mb-12"
          >
            {isFamilyFriendly
              ? "You've finally crossed your teen and entered 20s. Aunty vayasu vante. Ippo atleast periya ponnu maari iru ma 😁(Joke 😂🫂)"
              : "You've finally crossed your teen and entered 20s. Aunty vayasu vante. Ippo atleast periya ponnu maari iru ma 😁(Joke 😂🫂)"}
          </motion.p>

          <motion.button
            onClick={nextStage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-sky-400 to-purple-400 text-black rounded-lg font-bold text-lg shadow-lg hover:shadow-sky-400/30 transition-all"
          >
            Watch my Video Message 🎥
          </motion.button>
        </motion.div>
      )}

      {/* Stage 2: Video */}
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
              <source src={isFamilyFriendly ? "/harsha_ff.mp4" : "/harsha_wishes.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <button
            onClick={nextStage}
            className="mt-8 flex items-center gap-2 text-sky-300 hover:text-sky-100 transition"
          >
            {isFamilyFriendly
              ? "Continue to photos 🖼️"
              : "Continue to my 3 AM Delululu message 😁"} 
            <span className="text-xl">→</span>
          </button>
        </motion.div>
      )}

      {/* Stage 3: Heartfelt Message (only in non-family friendly) */}
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
            className="bg-gradient-to-br from-sky-900/20 to-purple-900/20 p-8 rounded-2xl border border-sky-400/20 backdrop-blur-sm"
          >
            <p className="text-lg leading-relaxed mb-6">
              By this point if you're here, you should've seen the video. Soo idk what to say. I mean. You literally were a magical event in my life. Never have I ever thought I'd get to experience such a friendship. That too never have I ever thought it'll be from a girl.
            </p>
            
            <p className="text-lg leading-relaxed mb-6">
              I am still soooooo glad that Arun's mom decided to introduce us. Forever grateful to her for that. Even though we've had ugly fights and verbally said that this shouldn't have happened, it's false. If somehow the lord gave me a second chance at that moment, I would do it all over again.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              This was the line Pedro Pascal says to Ellie (his daughter figure) in Last of Us after he lies to her about the finding cure situation thing (He saved that girl's life at the cost of killing doctors nurses and other hospital officials, and destroyed the chances of cure just to save her life). Ok I deviated quite a bit from the main message.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              The bottom line is, If somehow I got a second chance to go back to day 1 of our friendship, I wouldn't change a thing my broski. I will gladly relive it again, as it's one of the most memorable arcs of my life.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              I've said it already many times. Your friendship is one of the most, if not the most, amazing things to have ever happened to my life in my 21 years of existence. And that says a lot. I literally tell you stuff which I don't even tell my mom or family members. I literally cry to you. I literally ask your advice for any major decision. I literally text you at 2 am with random thoughts. I literally spam your reels. Any minor inconvenience I have, the next split thought which comes to my mind is you and talking to you, and with that everything becomes damn good.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Take the morning of HCI exam for example. Instead of studying, I texted you at 8 am. Talked with you for like 10-15 mins, You yourself asked why I'm even talking to you instead of studying. But you have no idea how much of a difference it made to me.
            </p>

            <p className="text-lg leading-relaxed">
              You are an irreplaceable part of my life, at least for this phase. Thank you for being there for me. I love you bhai. You're the best forever.
            </p>
          </motion.div>

          <button
            onClick={nextStage}
            className="mt-12 px-6 py-3 bg-sky-400 text-black rounded-lg font-bold hover:bg-sky-300 transition flex items-center gap-2"
          >
            See Our Goofy Photos 📸
          </button>
        </motion.div>
      )}

      {/* Stage 3/4: Photos */}
      {currentStage === (isFamilyFriendly ? 2 : 3) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen py-12"
        >
          <h2 className="text-3xl font-bold text-center text-sky-400 mb-8">
            {isFamilyFriendly ? "Our Wonderful Memories 🖼️✨" : "Our Goofy Memories Lmao 😂🫂"}
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

          <div className="text-center mt-12">
            <button
              onClick={nextStage}
              className="px-6 py-3 bg-gradient-to-r from-sky-400 to-purple-400 text-black rounded-lg font-bold hover:shadow-lg hover:shadow-sky-400/30 transition-all"
            >
              Claim Your Finalllll Gift 😁
            </button>
          </div>
        </motion.div>
      )}

      {/* Stage 4/5: Final Gift */}
      {currentStage === (isFamilyFriendly ? 3 : 4) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex flex-col items-center justify-center text-center p-6"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-br from-sky-900/20 to-purple-900/20 p-12 rounded-3xl border border-sky-400/20 backdrop-blur-sm max-w-2xl"
          >
            <h2 className="text-4xl font-bold text-sky-400 mb-6">One Last Surprise!</h2>
            <p className="text-xl text-sky-200 mb-8">
              I made this for you because I know you're too lazy to do it yourself 😉
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a
                href="http://dishadaniel.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-sky-400 to-purple-400 text-black text-xl font-bold rounded-lg shadow-lg hover:shadow-sky-400/30 transition-all block"
              >
                Open 🚀
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Photo Modal */}
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