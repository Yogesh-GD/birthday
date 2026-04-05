"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function WishMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        mt-8
        max-w-xl
        text-center
        bg-black/60
        backdrop-blur-lg
        border border-white/10
        p-6
        rounded-2xl
        shadow-2xl
        text-white
      "
    >
      <h2 className="text-2xl font-bold mb-4 text-pink-400">
        💖 Happy 20th Birthday
      </h2>

      <p className="leading-relaxed text-lg text-gray-200">
        Mahadev always keeps you happy, the lord saves you bad people like me, don't have to overthing, always love yourself and care.
        <br /><br />
        May your life be filled with happiness, success, and love.
        Keep shining and keep smiling.
        <br /><br />
        🎂 Happy Birthday 🎂
      </p>


        <Link  href={"/game"} className="mt-20 px-6 py-3 bg-pink-500 text-white rounded-xl">
          Next
        </Link>
    </motion.div>
  )
}