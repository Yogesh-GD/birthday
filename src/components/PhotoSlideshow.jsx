"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const photos = [
  "/photos/1.jpg",
  "/photos/2.jpg",
  "/photos/3.jpg"
]

export default function PhotoSlideshow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.img
      key={index}
      src={photos[index]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="mt-6 w-72 h-72 object-cover rounded-2xl shadow-xl"
    />
  )
}