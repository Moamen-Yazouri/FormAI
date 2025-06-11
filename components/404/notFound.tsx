"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Zap, Star, Circle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"

export default function NotFoundPage() {
    const [isMounted, setIsMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])


    const floatingShapes = useMemo(() => {
        if (!isMounted) return []

        return Array.from({ length: 8 }, (_, i) => {

        const seed = i * 1000 + 42 
        const random = (multiplier = 1, offset = 0) => 
          (Math.sin(seed * (i + 1)) * 0.5 + 0.5) * multiplier + offset

            return {
                id: i,
                size: random(60, 20),
                x: random(100),
                y: random(100),
                duration: random(10, 10),
                delay: random(5),
                icon: i % 3 === 0 ? Circle : i % 3 === 1 ? Star : Zap,
                color: i % 3 === 0 ? "text-cyan-500" : i % 3 === 1 ? "text-blue-400" : "text-indigo-400"
            }
        })
    }, [isMounted])

    const animatedDots = useMemo(() => {
        if (!isMounted) return []

        return Array.from({ length: 20 }, (_, i) => {
            const seed = i * 500 + 123
            const random = () => (Math.sin(seed) * 0.5 + 0.5)

            return {
            id: `dot-${i}`,
            left: random() * 100,
            top: random() * 100,
            duration: random() * 3 + 2,
            delay: random() * 5
            }

        })
    }, [isMounted])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-slate-900 relative overflow-hidden flex items-center justify-center text-slate-200">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-blue-900/30 to-slate-900/40" />


            {floatingShapes.map((shape) => {
            const Icon = shape.icon
            return (
                <motion.div
                key={shape.id}
                className={`absolute opacity-10 ${shape.color}`}
                style={{
                    left: `${shape.x}%`,
                    top: `${shape.y}%`,
                    width: shape.size,
                    height: shape.size,
                }}
                animate={{
                    y: [0, -30, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: shape.duration,
                    delay: shape.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                >
                <Icon className="w-full h-full" />
                </motion.div>
            )
            })}


            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isMounted ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8"
            >
                <motion.h1
                className="text-8xl md:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent leading-none"
                animate={isMounted ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
                >
                404
                </motion.h1>
            </motion.div>

            {isMounted && (
                <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0, 0.3, 0], x: [0, 2, -2, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                >
                <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-cyan-400/30 leading-none">404</h1>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-8"
            >
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-200 mb-4">Oops! Page Not Found</h2>
                <motion.p
                initial={{ opacity: 0 }}
                animate={isMounted ? { opacity: 1 } : {}}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-lg text-slate-400 max-w-2xl mx-auto"
                >
                The page you're looking for seems to have drifted into the digital void. Don't worry, even the best
                explorers sometimes take a wrong turn in cyberspace.
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-400 hover:via-blue-400 hover:to-indigo-400 text-white shadow-xl hover:shadow-2xl"
                >
                    <Link href="/" className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Back to Home
                    </Link>
                </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => router.back()}
                    className="border-cyan-500/30 text-slate-300 hover:bg-slate-800/30 hover:text-cyan-200 hover:border-cyan-400/60"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Go Back
                </Button>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={isMounted ? { opacity: 1 } : {}}
                transition={{ delay: 2, duration: 0.8 }}
                className="mt-12 p-4 rounded-lg bg-gradient-to-r from-slate-900/40 via-blue-900/30 to-slate-800/40 border border-cyan-500/20 backdrop-blur-md"
            >
                <motion.p
                animate={isMounted ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-sm text-slate-400"
                >
                💡 Fun fact: The first 404 error was discovered at CERN in 1992. You're now part of internet history!
                </motion.p>
            </motion.div>
            </div>


            {isMounted && (
            <div className="absolute inset-0 pointer-events-none">
                {animatedDots.map((dot) => (
                <motion.div
                    key={dot.id}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    style={{
                    left: `${dot.left}%`,
                    top: `${dot.top}%`,
                    }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                    transition={{
                    duration: dot.duration,
                    delay: dot.delay,
                    repeat: Infinity,
                    }}
                />
                ))}
            </div>
            )}
        </div>
    )
}   