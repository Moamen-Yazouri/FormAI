"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, RefreshCcw, AlertCircle, ServerCrash, Wifi, WifiOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Logo from "@/components/header/logo"


export default function ErrorPage() {
  const router = useRouter()
  const [isOnline, setIsOnline] = useState(true)
  const [countdown, setCountdown] = useState(15)

  // Check if user is online
  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return

    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown])

  // Floating elements
  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 40,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 4,
  }))

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 relative overflow-hidden flex items-center justify-center">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-indigo-800/20 to-cyan-600/25"></div>

        {/* Additional background blur effects */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-bl from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"></div>

        {/* Animated floating elements */}
        {floatingElements.map((element) => (
            <motion.div
            key={element.id}
            className="absolute opacity-10"
            style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                width: element.size,
                height: element.size,
            }}
            animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: element.duration,
                delay: element.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
            }}
            >
            {element.id % 3 === 0 ? (
                <ServerCrash className="w-full h-full text-purple-400/40" />
            ) : element.id % 3 === 1 ? (
                <AlertCircle className="w-full h-full text-blue-400/40" />
            ) : (
                <WifiOff className="w-full h-full text-cyan-400/40" />
            )}
            </motion.div>
        ))}

        {/* Main content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            {/* Logo */}
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
            >
            <Logo size={80} showGlow={true} />
            </motion.div>

            {/* Animated 500 with server crash icon */}
            <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 relative"
            >
            <motion.div
                className="flex items-center justify-center gap-4 mb-6"
                animate={{
                scale: [1, 1.05, 1],
                }}
                transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                }}
            >
                <motion.div
                animate={{
                    rotate: [0, 15, -15, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                className="p-6 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 border-2 border-purple-500/40 backdrop-blur-sm"
                >
                <ServerCrash className="h-20 w-20 md:h-24 md:w-24 text-purple-400" />
                </motion.div>
            </motion.div>

            <motion.h1
                className="text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent leading-none mb-2"
                animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                }}
                style={{
                backgroundSize: "200% 200%",
                }}
            >
                500
            </motion.h1>

            {/* Glitch effect overlay */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                opacity: [0, 0.6, 0],
                x: [0, 4, -4, 0],
                }}
                transition={{
                duration: 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 5,
                }}
            >
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-cyan-400/50 leading-none pt-28">500</h1>
            </motion.div>
            </motion.div>

            {/* Subtitle with typewriter effect */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-8"
            >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Server Error
                </span>
            </h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
                Something went wrong on our servers. We're working to fix the issue as quickly as possible.
            </motion.p>
            </motion.div>

            {/* Status card */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mb-10 p-8 rounded-xl bg-gradient-to-r from-slate-900/70 via-blue-900/50 to-slate-900/70 border border-blue-500/40 backdrop-blur-md max-w-lg mx-auto shadow-2xl"
            >
            <div className="flex items-center gap-4 mb-6">
                <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                className="p-3 rounded-full bg-blue-500/30 border border-blue-400/50"
                >
                {isOnline ? <Wifi className="h-6 w-6 text-blue-300" /> : <WifiOff className="h-6 w-6 text-red-300" />}
                </motion.div>
                <h3 className="text-xl font-bold text-blue-200">{isOnline ? "You're connected" : "You're offline"}</h3>
            </div>
            <p className="text-slate-200 leading-relaxed mb-4">
                {isOnline
                ? "The issue is on our end. Our team has been notified and is working on a fix."
                : "Please check your internet connection and try again."}
            </p>

            {countdown > 0 && (
                <div className="mt-4 text-sm text-slate-400">
                Returning to home page in <span className="text-cyan-400 font-bold">{countdown}</span> seconds...
                </div>
            )}
            </motion.div>

            {/* Action buttons */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3"
                >
                <Link href="/" className="flex items-center gap-3">
                    <Home className="h-5 w-5" />
                    Back to Home
                </Link>
                </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.reload()}
                className="border-cyan-500/50 text-slate-200 hover:bg-cyan-800/30 hover:text-cyan-100 hover:border-cyan-400/70 transition-all duration-300 px-8 py-3"
                >
                <RefreshCcw className="h-5 w-5 mr-2" />
                Try Again
                </Button>
            </motion.div>
            </motion.div>

            {/* Error details */}
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-12 p-4 rounded-lg bg-slate-800/40 border border-slate-600/30 backdrop-blur-sm max-w-md mx-auto"
            >
            <p className="text-sm text-slate-400">
                <strong className="text-slate-300">Error ID:</strong>{" "}
                {Math.random().toString(36).substring(2, 10).toUpperCase()}
                <br />
                <span className="text-xs">
                If this issue persists, please contact our support team and provide this error ID.
                </span>
            </p>
            </motion.div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-blue-400/60 rounded-full"
                style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                }}
                animate={{
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
                }}
                transition={{
                duration: Math.random() * 5 + 4,
                delay: Math.random() * 8,
                repeat: Number.POSITIVE_INFINITY,
                }}
            />
            ))}
        </div>
        </div>
    )
}
