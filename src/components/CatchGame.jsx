"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const GAME_WIDTH = 400
const GAME_HEIGHT = 500
const PLAYER_WIDTH = 90
const PLAYER_HEIGHT = 50
const ITEM_SIZE = 48

const INITIAL_LIVES = 3
const INITIAL_SPEED = 3

const itemTypes = [
  {
    src: "/heads/head1.jpg",
    type: "good",
    points: 1
  },
  {
    src: "/emoji/laugh.png",
    type: "bonus",
    points: 2
  },
  {
    src: "/bad/bomb.png",
    type: "bad",
    points: 0
  }
]

export default function CatchGame() {
  const [items, setItems] = useState([])
  const [playerX, setPlayerX] = useState(160)

  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(INITIAL_LIVES)
  const [running, setRunning] = useState(false)

  const speedRef = useRef(INITIAL_SPEED)
  const animationRef = useRef(null)
  const spawnRef = useRef(null)
  const gameRef = useRef(null)

  // START GAME
  const startGame = () => {
    setItems([])
    setScore(0)
    setLives(INITIAL_LIVES)
    setRunning(true)

    speedRef.current = INITIAL_SPEED
  }

  // SPAWN ITEMS
  useEffect(() => {
    if (!running) return

    spawnRef.current = setInterval(() => {
      const random =
        itemTypes[Math.floor(Math.random() * itemTypes.length)]

      const newItem = {
        id: Date.now() + Math.random(),
        x: Math.random() * (GAME_WIDTH - ITEM_SIZE),
        y: 0,
        ...random
      }

      setItems((prev) => [...prev, newItem])
    }, 900)

    return () => clearInterval(spawnRef.current)
  }, [running])

  // SPEED INCREASE
  useEffect(() => {
    if (!running) return

    const speedTimer = setInterval(() => {
      speedRef.current += 0.5
    }, 5000)

    return () => clearInterval(speedTimer)
  }, [running])

  // MAIN GAME LOOP
  useEffect(() => {
    if (!running) return

    const update = () => {
      setItems((prev) =>
        prev
          .map((item) => ({
            ...item,
            y: item.y + speedRef.current
          }))
          .filter((item) => {
            const playerTop = GAME_HEIGHT - PLAYER_HEIGHT
            const playerLeft = playerX
            const playerRight = playerX + PLAYER_WIDTH

            const itemBottom = item.y + ITEM_SIZE
            const itemCenter = item.x + ITEM_SIZE / 2

            const hit =
              itemBottom >= playerTop &&
              itemCenter >= playerLeft &&
              itemCenter <= playerRight

            if (hit) {
              if (item.type === "good") {
                setScore((s) => s + 1)
              }

              if (item.type === "bonus") {
                setScore((s) => s + 2)
              }

              if (item.type === "bad") {
                setLives((l) => {
                  const newLives = l - 1

                  if (newLives <= 0) {
                    setRunning(false)
                  }

                  return Math.max(0, newLives)
                })
              }

              return false
            }

            if (item.y > GAME_HEIGHT) {
              return false
            }

            return true
          })
      )

      animationRef.current = requestAnimationFrame(update)
    }

    animationRef.current = requestAnimationFrame(update)

    return () =>
      cancelAnimationFrame(animationRef.current)
  }, [running, playerX])

  // MOUSE MOVE
  const handleMouseMove = (e) => {
    if (!gameRef.current) return

    const rect =
      gameRef.current.getBoundingClientRect()

    const x =
      e.clientX -
      rect.left -
      PLAYER_WIDTH / 2

    setPlayerX(
      Math.max(
        0,
        Math.min(GAME_WIDTH - PLAYER_WIDTH, x)
      )
    )
  }

  // TOUCH MOVE
  const handleTouchMove = (e) => {
    if (!gameRef.current) return

    const rect =
      gameRef.current.getBoundingClientRect()

    const touch = e.touches[0]

    const x =
      touch.clientX -
      rect.left -
      PLAYER_WIDTH / 2

    setPlayerX(
      Math.max(
        0,
        Math.min(GAME_WIDTH - PLAYER_WIDTH, x)
      )
    )
  }

return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-4">

    {/* GAME CARD */}
    <div className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center w-[400px] mb-4">

        {/* SCORE */}
        <div className="bg-white/60 backdrop-blur px-4 py-2 rounded-xl shadow font-semibold text-lg">
          🎯 Score: {score}
        </div>

        {/* LIVES */}
        <div className="flex gap-1 bg-white/60 backdrop-blur px-4 py-2 rounded-xl shadow">
          {Array.from({ length: lives }).map((_, i) => (
            <span
              key={i}
              className="text-xl animate-pulse"
            >
              ❤️
            </span>
          ))}
        </div>

      </div>

      {/* GAME AREA */}
      <div
        ref={gameRef}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/40 to-white/20 border border-white/40 shadow-inner select-none"
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >

        {/* FALLING ITEMS */}
        {items.map((item) => (
          <motion.img
            key={item.id}
            src={item.src}
            className="absolute pointer-events-none drop-shadow-lg"
            style={{
              width: ITEM_SIZE,
              height: ITEM_SIZE
            }}
            animate={{
              x: item.x,
              y: item.y,
              rotate: item.type === "bonus" ? 360 : 0
            }}
            transition={{
              duration: 0,
              ease: "linear"
            }}
          />
        ))}

        {/* PLAYER */}
        <motion.div
          className="absolute bottom-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-xl flex items-center justify-center border border-white/40"
          style={{
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT
          }}
          animate={{
            x: playerX,
            scale: running ? 1 : 0.95
          }}
          transition={{
            type: "spring",
            stiffness: 300
          }}
        >
          Catch
        </motion.div>

        {/* OVERLAY */}
        {!running && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center text-white">

            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold mb-6 drop-shadow"
            >
              {lives === 0
                ? "Game Over"
                : "Ready to Play?"}
            </motion.h2>

            <motion.button
              whileHover={{
                scale: 1.08
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={startGame}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-semibold shadow-lg hover:shadow-xl transition "
            >
              {lives === 0
                ? "Restart Game"
                : "Start Game"}
            </motion.button>

          </div>
        )}

      </div>

    </div>

  </div>
)
}