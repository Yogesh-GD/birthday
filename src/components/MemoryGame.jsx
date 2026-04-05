"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const MAX_MOVES = 25

// Harder — more emojis (12 pairs)
const emojis = [
  "😀",
  "😎",
  "🐶",
  "🍕",
  "🚀",
  "🌈",
  "🎮",
  "🐱",
  "🍩",
  "🦄",
  "🐸",
  "🎯"
]

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

export default function MemoryGame() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])

  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [lost, setLost] = useState(false)

  useEffect(() => {
    startGame()
  }, [])

  const startGame = () => {
    const doubled = [...emojis, ...emojis]

    const shuffled = shuffle(doubled).map(
      (emoji, index) => ({
        id: index,
        emoji,
        key: `${emoji}-${index}`
      })
    )

    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setWon(false)
    setLost(false)
  }

  const handleFlip = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index) ||
      won ||
      lost
    )
      return

    const newFlipped = [...flipped, index]

    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      const newMoves = moves + 1
      setMoves(newMoves)

      const [first, second] = newFlipped

      if (
        cards[first].emoji ===
        cards[second].emoji
      ) {
        const newMatched = [
          ...matched,
          first,
          second
        ]

        setMatched(newMatched)
        setFlipped([])

        if (
          newMatched.length ===
          cards.length
        ) {
          setWon(true)
        }
      } else {
        setTimeout(() => {
          setFlipped([])
        }, 700)
      }

      // Lose condition
      if (newMoves >= MAX_MOVES) {
        setTimeout(() => {
          setLost(true)
        }, 500)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-200 p-4">

      <div className="bg-white/40 backdrop-blur-xl border shadow-2xl rounded-3xl p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 gap-4">

          <div className="bg-white px-4 py-2 rounded-xl font-semibold shadow">
            Moves: {moves} / {MAX_MOVES}
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
          >
            Restart
          </button>

        </div>

        {/* GRID — Harder */}
        <div className="grid grid-cols-6 gap-3">

          {cards.map((card, index) => {
            const isFlipped =
              flipped.includes(index) ||
              matched.includes(index)

            return (
              <motion.div
                key={card.key}
                className="w-16 h-16 cursor-pointer"
                onClick={() =>
                  handleFlip(index)
                }
                whileTap={{
                  scale: 0.95
                }}
              >

                <motion.div
                  className="relative w-full h-full"
                  animate={{
                    rotateY: isFlipped
                      ? 180
                      : 0
                  }}
                  transition={{
                    duration: 0.35
                  }}
                  style={{
                    transformStyle:
                      "preserve-3d"
                  }}
                >

                  {/* FRONT */}
                  <div
                    className="
                      absolute
                      w-full
                      h-full
                      bg-white
                      rounded-xl
                      shadow
                      flex
                      items-center
                      justify-center
                      text-xl
                      border
                    "
                    style={{
                      backfaceVisibility:
                        "hidden"
                    }}
                  >
                    ❓
                  </div>

                  {/* BACK */}
                  <div
                    className="
                      absolute
                      w-full
                      h-full
                      bg-gradient-to-br
                      from-yellow-200
                      to-orange-300
                      rounded-xl
                      shadow
                      flex
                      items-center
                      justify-center
                      text-xl
                    "
                    style={{
                      transform:
                        "rotateY(180deg)",
                      backfaceVisibility:
                        "hidden"
                    }}
                  >
                    {card.emoji}
                  </div>

                </motion.div>

              </motion.div>
            )
          })}

        </div>

        {/* WIN MESSAGE */}
        {won && (
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            className="mt-6 text-center bg-green-500 text-white px-6 py-3 rounded-xl font-bold shadow"
          >
            🎉 You Win!
          </motion.div>
        )}

        {/* LOSE MESSAGE */}
        {lost && (
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            className="mt-6 text-center bg-red-500 text-white px-6 py-3 rounded-xl font-bold shadow"
          >
            ❌ Out of Moves! Try Again
          </motion.div>
        )}

      </div>

    </div>
  )
}