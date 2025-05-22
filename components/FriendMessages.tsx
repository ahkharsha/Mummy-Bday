// components/FriendMessages.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { italianno } from '../app/fonts'
import { messages } from '../app/data/messages'

interface FriendMessagesProps {
  setShowSecret: (value: boolean) => void
}

const FUNNY_FEEDBACK = {
  correct: [
    "Bingo! You got it! 🎯",
    "Correct! You know them well! 👏",
    "Exactly right! 🏆",
    "Spot on! You're good at this! 🎉",
    "Perfect guess! 🥇",
    "Nailed it! 🔨",
    "You're on fire! 🔥",
    "Mind reader! 🧠",
    "Absolutely correct! 💯",
    "Bullseye! 🎯"
  ],
  incorrect: [
    "Nope! Not even close! 😆",
    "Wrong! Were you even paying attention? 🤔",
    "Incorrect! Did you guess randomly? 🎲",
    "Not quite! Maybe try using the hint? 💡",
    "Wrong answer! The author would be disappointed 😅",
    "Nah! That's not it! Try again! 🔄",
    "Cold! You're freezing! ❄️",
    "Warmer... oh wait, no - still wrong! 🔥",
    "That's a creative guess... but wrong! 🎨",
    "The force is not with you on this one ⚔️",
    "Bruh... seriously? 🙄",
    "Even a monkey would guess better 🐒",
    "My grandma could do better 👵",
    "Are you trying to fail? 😂",
    "This is getting embarrassing... 🫣"
  ]
}

export default function FriendMessages({ setShowSecret }: FriendMessagesProps) {
  const [guesses, setGuesses] = useState<Record<number, string>>({})
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [showSecretButton, setShowSecretButton] = useState(false)
  const [wrongAttempts, setWrongAttempts] = useState<Record<number, number>>({})
  const [feedback, setFeedback] = useState<{text: string, type: 'success' | 'error', show: boolean} | null>(null)
  const [showHint, setShowHint] = useState<Record<number, boolean>>({})

  const checkGuess = (index: number) => {
    const isCorrect = guesses[index]?.toLowerCase() === messages[index].author.toLowerCase()
    
    if (isCorrect) {
      setRevealed({...revealed, [index]: true})
      setSelectedCard(index)
      const randomSuccess = FUNNY_FEEDBACK.correct[Math.floor(Math.random() * FUNNY_FEEDBACK.correct.length)]
      setFeedback({text: randomSuccess, type: 'success', show: true})
      
      if (Object.keys(revealed).length + 1 === messages.length) {
        setShowSecretButton(true)
      }
    } else {
      const attempts = (wrongAttempts[index] || 0) + 1
      setWrongAttempts({...wrongAttempts, [index]: attempts})
      const randomFeedback = FUNNY_FEEDBACK.incorrect[Math.floor(Math.random() * FUNNY_FEEDBACK.incorrect.length)]
      setFeedback({text: randomFeedback, type: 'error', show: true})
    }

    setTimeout(() => {
      setFeedback(prev => prev ? {...prev, show: false} : null)
    }, 2000)
  }

  const toggleHint = (index: number) => {
    setShowHint({...showHint, [index]: !showHint[index]})
  }

  const correctCount = Object.values(revealed).filter(Boolean).length

  return (
    <div className="mt-12">
      <h2 className={`${italianno.className} text-5xl md:text-6xl mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400`}>
        Messages From Loved Ones
      </h2>

      <div className="text-center mb-8">
        <div className="inline-block bg-sky-900/30 px-4 py-2 rounded-full border border-sky-400/20">
          <span className="text-sky-300">Solved: </span>
          <span className="font-bold text-white">{correctCount}/{messages.length}</span>
          {correctCount === messages.length && (
            <span className="ml-2 text-green-400">🎉 Bonus unlocked!</span>
          )}
        </div>
        <p className="mt-4 text-sky-300/60 italic">
          {correctCount < messages.length 
            ? "Solve all to unlock something special..." 
            : "You've uncovered a hidden path!"}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`relative p-8 rounded-2xl bg-gradient-to-br from-sky-900/10 to-purple-900/10 border-2
              ${selectedCard === i ? 'ring-2 ring-sky-400' : ''}
              ${wrongAttempts[i] > 0 ? 'border-red-400/30' : 'border-sky-400/20'}
              backdrop-blur-sm shadow-lg hover:shadow-sky-400/10 transition-all`}
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-sky-400 rounded-full flex items-center justify-center text-2xl shadow-lg">
              {msg.emoji}
            </div>
            
            <div className="relative z-10">
              <p className="text-xl mb-6 italic text-white/90 font-medium leading-relaxed">"{msg.text}"</p>
              
              <AnimatePresence>
                {!revealed[i] ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        value={guesses[i] || ''}
                        onChange={(e) => {
                          setGuesses({...guesses, [i]: e.target.value})
                          setWrongAttempts({...wrongAttempts, [i]: 0})
                        }}
                        placeholder="Guess who wrote this..."
                        className={`w-full p-3 bg-black/30 border rounded-lg text-white focus:outline-none focus:ring-1
                          ${wrongAttempts[i] > 0 ? 'border-red-400/50 focus:ring-red-400/30' : 'border-sky-400/30 focus:ring-sky-400/30'}`}
                      />
                      {wrongAttempts[i] > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-2 right-2 bg-red-900/50 text-red-100 text-xs px-2 py-1 rounded-full"
                        >
                          {wrongAttempts[i]} attempt{wrongAttempts[i] > 1 ? 's' : ''}
                        </motion.div>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => toggleHint(i)}
                        className="text-sm text-sky-300/80 hover:text-sky-200 transition flex items-center gap-1"
                      >
                        <span>💡</span>
                        <span>{showHint[i] ? 'Hide Hint' : 'Show Hint'}</span>
                      </button>
                      {showHint[i] && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-sky-300/80 italic"
                        >
                          {msg.hint}
                        </motion.div>
                      )}
                    </div>

                    <button
                      onClick={() => checkGuess(i)}
                      className={`w-full py-3 rounded-lg font-bold transition-all
                        ${guesses[i] 
                          ? 'bg-gradient-to-r from-sky-400 to-purple-400 text-black hover:opacity-90 hover:shadow-md'
                          : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                      disabled={!guesses[i]}
                    >
                      Verify Answer
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-4"
                  >
                    <div className="text-2xl text-sky-400 font-bold mb-2">
                      From: {msg.author}
                    </div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl"
                    >
                      {msg.emoji}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Centered Feedback Popup with Celebration Styling */}
      <AnimatePresence>
        {feedback?.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 min-w-[300px] max-w-[90vw] text-center"
          >
            <div className={`
              relative bg-gradient-to-br ${feedback.type === 'success' 
                ? 'from-emerald-500/90 to-teal-400/90 text-white' 
                : 'from-rose-500/90 to-pink-400/90 text-white'}
              p-5 rounded-xl shadow-xl border-2 ${feedback.type === 'success' 
                ? 'border-emerald-300/30' 
                : 'border-rose-300/30'}
              backdrop-blur-sm
            `}>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg">
                  {feedback.type === 'success' ? '✨' : '⚠️'}
                </span>
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg">
                  {feedback.type === 'success' ? '🎯' : '❌'}
                </span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-3 animate-bounce">
                  {feedback.type === 'success' ? '🥳' : '😅'}
                </div>
                <p className="text-xl font-medium mb-2 px-4">
                  {feedback.text}
                </p>
                <div className={`w-full h-1 mt-2 rounded-full ${feedback.type === 'success' ? 'bg-emerald-200/50' : 'bg-rose-200/50'}`}></div>
              </div>
            </div>
            
            {/* Floating sparkles for success messages */}
            {feedback.type === 'success' && (
              <>
                <motion.div 
                  className="absolute -top-4 -left-4 text-2xl"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✨
                </motion.div>
                <motion.div 
                  className="absolute -bottom-4 -right-4 text-2xl"
                  initial={{ scale: 0, rotate: 45 }}
                  animate={{ scale: [0, 1, 0], rotate: [360, 180, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  ✨
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSecretButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <div className="mb-6 text-sky-300/80 italic text-lg">
              ✨ You've unlocked a hidden message! ✨
            </div>
            <motion.button
              onClick={() => setShowSecret(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-sky-400/90 to-purple-400/90 text-black rounded-xl font-bold text-lg shadow-lg hover:shadow-sky-400/30 transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">Discover the Hidden Surprise 💎</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-purple-500/20"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}