"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { questions } from "../data/questions"

export default function Quiz() {

  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const handleAnswer = (option) => {
    if (answered) return

    setAnswered(true)

    if (option === questions[index].answer) {
      setScore((prev) => prev + 1)
    }

    setTimeout(() => {
      setIndex((prev) => prev + 1)
      setAnswered(false)
    }, 450)
  }

  const restartQuiz = () => {
    setIndex(0)
    setScore(0)
    setAnswered(false)
  }

  const progress = Math.min(
    Math.round((index / questions.length) * 100),
    100
  )

  const getMessage = () => {
    const percent = (score / questions.length) * 100

    if (percent === 100) return "Perfect Score! 🏆"
    if (percent >= 70) return "Great Job! 🎉"
    if (percent >= 40) return "Nice Try 👍"
    return "Keep Practicing 💪"
  }

  /* SCORE SCREEN */

  if (index >= questions.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto text-center p-6 sm:p-8 bg-white/80 backdrop-blur rounded-2xl shadow-2xl"
      >

        <h2 className="text-3xl font-bold mb-3">
          🎉 Quiz Completed
        </h2>

        <p className="text-lg mb-2">
          {getMessage()}
        </p>

        <p className="text-xl mb-6">
          Your Score:
          <span className="font-bold text-pink-600">
            {" "}
            {score} / {questions.length}
          </span>
        </p>

        {/* NEXT LINK */}

        <Link
          href="/birthday"
          className="inline-block px-6 py-3 mb-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition"
        >
          Next
        </Link>

        {/* RESTART */}

        <button
          onClick={restartQuiz}
          className="block mx-auto mt-3 px-5 py-2 bg-gray-800 text-white rounded-lg hover:scale-105 active:scale-95 transition"
        >
          Restart Quiz
        </button>

      </motion.div>
    )
  }

  /* QUESTION SCREEN */

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-5 sm:p-6 bg-white/80 backdrop-blur rounded-2xl shadow-xl"
    >

      {/* PROGRESS */}

      <div className="mb-5">

        <div className="flex justify-between text-sm mb-1">
          <span>
            Question {index + 1}
          </span>

          <span>
            {questions.length}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
          />

        </div>

      </div>

      {/* QUESTION */}

      <h2 className="text-lg sm:text-xl font-semibold mb-5 leading-relaxed">
        {questions[index].question}
      </h2>

      {/* OPTIONS */}

      <div className="space-y-3">

        {questions[index].options.map((opt) => (

          <button
            key={opt}
            disabled={answered}
            onClick={() => handleAnswer(opt)}
            className="w-full py-3 px-4 text-left bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-md hover:scale-[1.03] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {opt}
          </button>

        ))}

      </div>

    </motion.div>
  )
}