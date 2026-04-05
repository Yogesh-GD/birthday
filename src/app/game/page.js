"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200">

      {/* Title */}

      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
        🎮 Choose a Game
      </h1>

      {/* Game Boxes */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">

        {/* Memory Game */}

        <Link href="/game/MemoryGame">

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="cursor-pointer p-8 rounded-2xl shadow-xl text-white text-center bg-gradient-to-r from-pink-500 to-purple-600 transition"
          >
            <div className="text-5xl mb-4">
              🧠
            </div>

            <h2 className="text-xl font-semibold">
              Memory Game
            </h2>

            <p className="mt-2 text-sm opacity-90">
              Test your memory skills
            </p>

          </motion.div>

        </Link>

        {/* Catch Game */}

        <Link href="/game/catch">

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="cursor-pointer p-8 rounded-2xl shadow-xl text-white text-center bg-gradient-to-r from-yellow-500 to-orange-600 transition"
          >
            <div className="text-5xl mb-4">
              🎯
            </div>

            <h2 className="text-xl font-semibold">
              Catch Game
            </h2>

            <p className="mt-2 text-sm opacity-90">
              Catch the falling objects
            </p>

          </motion.div>

        </Link>

      </div>

    </main>
  )
}