"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, ArrowLeft, Shield, Lock, AlertTriangle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Unauthorized() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const floatingShapes = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 50 + 30,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 12,
    delay: Math.random() * 3,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-700 to-cyan-500 relative overflow-hidden flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-800/15 to-cyan-600/20"></div>

      {/* Animated floating security icons */}
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute opacity-8"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {shape.id % 3 === 0 ? (
            <Shield className="w-full h-full text-cyan-400/30" />
          ) : shape.id % 3 === 1 ? (
            <Lock className="w-full h-full text-blue-400/30" />
          ) : (
            <AlertTriangle className="w-full h-full text-indigo-400/30" />
          )}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Animated 401 with lock icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative"
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-4"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="p-4 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30"
            >
              <Lock className="h-16 w-16 md:h-20 md:w-20 text-red-400" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent leading-none"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            401
          </motion.h1>
        </motion.div>

        {/* Glitch effect overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: [0, 0.4, 0],
            x: [0, 3, -3, 0],
          }}
          transition={{
            duration: 0.15,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 4,
          }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-cyan-400/40 leading-none pt-24">401</h1>
        </motion.div>

        {/* Subtitle with typewriter effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-200 mb-4">Access Denied</h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            You don't have permission to access this resource. It seems like you're trying to enter a restricted area of
            our digital fortress.
          </motion.p>
        </motion.div>

        {/* Security status card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-8 p-6 rounded-lg bg-gradient-to-r from-red-900/40 via-orange-800/30 to-yellow-700/40 border border-red-500/30 backdrop-blur-sm max-w-md mx-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="p-2 rounded-full bg-red-500/20"
            >
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </motion.div>
            <h3 className="text-lg font-semibold text-red-300">Security Alert</h3>
          </div>
          <p className="text-sm text-slate-300">
            Your current credentials don't grant access to this page. Please contact an administrator or sign in with
            appropriate permissions.
          </p>
        </motion.div>

        {/* Quick login form */}


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
              className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 text-white shadow-xl hover:shadow-2xl transition-all duration-200"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cyan-500/40 text-slate-300 hover:bg-blue-800/30 hover:text-cyan-200 hover:border-cyan-400/60 transition-all duration-200"
            >
              <Link href="/sign-in">
                <Shield className="h-5 w-5 mr-2" />
                Sign In
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.back()}
              className="border-orange-500/40 text-slate-300 hover:bg-orange-800/30 hover:text-orange-200 hover:border-orange-400/60 transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </motion.div>
        </motion.div>

        {/* Security tip */}

      </div>

      {/* Animated security particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              delay: Math.random() * 6,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ))}
      </div>
    </div>
  )
}
