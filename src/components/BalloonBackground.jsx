"use client"

import { motion } from "framer-motion"

const balloons = ["🎈","🎈","🎈","🎈","🎈","🎈"]

export default function BalloonBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {balloons.map((b, i) => (
        <motion.div
          key={i}
          initial={{ y: 600, x: i * 80 }}
          animate={{ y: -200 }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute text-4xl"
        >
          {b}
        </motion.div>
      ))}

    </div>
  )
}