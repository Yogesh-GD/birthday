"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Confetti from "react-confetti"

import BalloonBackground from "./BalloonBackground"
import Countdown from "./Countdown"
import PhotoSlideshow from "./PhotoSlideshow"
import WishMessage from "./WishMessage"

import "../styles/cake.css"

const generateParticles = () => {
  const arr = []
  for (let i = 0; i < 25; i++) {
    arr.push({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3
    })
  }
  return arr
}

export default function BirthdayExperience({ name = "mukku 💕" }) {

  const [candlesOut, setCandlesOut] = useState(false)
  const [cakeCut, setCakeCut] = useState(false)
  const [startCountdown, setStartCountdown] = useState(true)
  const [showFireworks, setShowFireworks] = useState(false)

  const startXRef = useRef(0)

  /* MUSIC REF */

  const audioRef = useRef(null)

  /* FIX HYDRATION ERROR */

  const [particles, setParticles] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setParticles(generateParticles())
  }, [])

  /* START MUSIC */

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  /* SIMPLE BLOW DETECTION */

  const startListening = async () => {

    try {

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      const audioContext =
        new (window.AudioContext || window.webkitAudioContext)()

      const source =
        audioContext.createMediaStreamSource(stream)

      const analyser =
        audioContext.createAnalyser()

      analyser.fftSize = 256

      const dataArray =
        new Uint8Array(analyser.frequencyBinCount)

      source.connect(analyser)

      const detect = () => {

        analyser.getByteFrequencyData(dataArray)

        let volume = 0

        for (let i = 0; i < dataArray.length; i++) {
          volume += dataArray[i]
        }

        volume = volume / dataArray.length

        if (volume > 45) {

          setCandlesOut(true)

          playMusic()

          return
        }

        requestAnimationFrame(detect)

      }

      detect()

    } catch (err) {

      alert("Microphone permission needed")

    }

  }

  /* CUT DETECTION */

  const handleStart = (x) => {
    startXRef.current = x
  }

  const handleEnd = (x) => {

    const distance =
      Math.abs(x - startXRef.current)

    if (distance > 40 && candlesOut) {

      setCakeCut(true)

      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200])
      }

      setTimeout(() => {
        setShowFireworks(true)
      }, 1200)

    }

  }

  /* RESTART */

  const restart = () => {

    setCandlesOut(false)
    setCakeCut(false)
    setShowFireworks(false)
    setStartCountdown(true)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

  }

  return (

    <div className="flex flex-col items-center text-center relative select-none">

      {/* AUDIO */}

      <audio
        ref={audioRef}
        src="/birthday.mp3"
        loop
        preload="auto"
      />

      {/* PARTICLES */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted && particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <BalloonBackground />

      {candlesOut && <Confetti />}

      {showFireworks && (
        <div className="fixed inset-0 flex items-center justify-center text-7xl pointer-events-none animate-pulse">
          🎆 🎇 🎆 🎇 🎆
        </div>
      )}

      <h1 className="text-4xl font-bold mb-6">
        🎉 Happy 20th Birthday {name}
      </h1>

      {startCountdown && (
        <Countdown
          onDone={() =>
            setStartCountdown(false)
          }
        />
      )}

      {!startCountdown && (
        <>

          {/* CANDLES */}

          <div className="flex gap-10 mb-4">

            <div className="candle">
              {!candlesOut &&
                <div className="flame" />
              }
            </div>

            <div className="candle">
              {!candlesOut &&
                <div className="flame" />
              }
            </div>

          </div>

          {/* CAKE */}

          <div
            className="cake-container"
            onMouseDown={(e) =>
              handleStart(e.clientX)
            }
            onMouseUp={(e) =>
              handleEnd(e.clientX)
            }
            onTouchStart={(e) =>
              handleStart(e.touches[0].clientX)
            }
            onTouchEnd={(e) =>
              handleEnd(e.changedTouches[0].clientX)
            }
          >

            <motion.div
              animate={{
                scale: cakeCut ? 0.94 : 1
              }}
              transition={{
                duration: 0.3
              }}
            >

              {/* LEFT HALF */}

              <motion.div
                animate={
                  cakeCut
                    ? {
                        x: -18,
                        rotate: -2
                      }
                    : { x: 0 }
                }
                transition={{
                  duration: 0.4
                }}
              >
                <div className="layer-top cake-layer" />
                <div className="layer-middle cake-layer" />
                <div className="layer-bottom cake-layer" />
              </motion.div>

              {/* RIGHT HALF */}

              <motion.div
                animate={
                  cakeCut
                    ? {
                        x: 18,
                        rotate: 2
                      }
                    : { x: 0 }
                }
                transition={{
                  duration: 0.4
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  width: "100%"
                }}
              >
                <div className="layer-top cake-layer" />
                <div className="layer-middle cake-layer" />
                <div className="layer-bottom cake-layer" />
              </motion.div>

              {/* CUT LINE */}

              {cakeCut && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 270 }}
                  transition={{ duration: 0.5 }}
                  className="cut-line"
                />
              )}

              {/* KNIFE */}

              {cakeCut && (
                <motion.div
                  initial={{ y: -90 }}
                  animate={{ y: 210 }}
                  transition={{ duration: 0.8 }}
                  className="knife"
                >
                  🔪
                </motion.div>
              )}

            </motion.div>

          </div>

          {/* BLOW BUTTON */}

          {!candlesOut && (
            <button
              onClick={startListening}
              className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-xl shadow-lg hover:scale-105 transition"
            >
              🎤 Blow Candles
            </button>
          )}

          {/* SKIP BUTTON */}

          {!candlesOut && (
            <button
              onClick={() => {
                setCandlesOut(true)
                playMusic()
              }}
              className="mt-3 px-5 py-2 bg-gray-700 text-white rounded-lg"
            >
              Skip Blow
            </button>
          )}

          {cakeCut && (
            <>
              <WishMessage />
              <PhotoSlideshow />
            </>
          )}

          {/* RESTART */}

          <button
            onClick={restart}
            className="mt-6 px-5 py-2 bg-black text-white rounded-lg"
          >
            Restart
          </button>

        </>
      )}

    </div>
  )
}