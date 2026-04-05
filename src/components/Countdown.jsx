"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Countdown({ onDone }) {
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count === 0) {
      onDone()
      return
    }

    const timer = setTimeout(() => {
      setCount((c) => c - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [count, onDone])

  return (
    <motion.div
      key={count}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1.5, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-6xl font-bold mb-6"
    >
      {count}
    </motion.div>
  )
}