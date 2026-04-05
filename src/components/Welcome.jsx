"use client"

import { motion } from "framer-motion"
import Link from "next/link"


export default function Welcome() {
  return (
    <div className="flex h-screen items-center justify-center bg-pink-100">

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >

        <h1 className="text-4xl font-bold text-pink-600">
          Happy Birthday My wife ❤️
        </h1>

        <Link  href={"/Quiz"} className="mt-20 px-6 py-3 bg-pink-500 text-white rounded-xl">
          quiz
        </Link>

      </motion.div>

    </div>
  )
}