"use client"

import type React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Shield, Lock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
    
    const router = useRouter()

    const floatingShapes = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        size: Math.random() * 50 + 30,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 3,
    }))

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-blue-900 to-slate-900 relative overflow-hidden flex items-center justify-center text-slate-200">
        
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-blue-900/30 to-slate-900/40" />

            
                {floatingShapes.map((shape) => (
                    <motion.div
                    key={shape.id}
                    className="absolute opacity-10"
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
                        repeat: Infinity,
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

                
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8 relative"
                    >
                    <motion.div
                        className="flex items-center justify-center gap-4 mb-4"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="p-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30"
                        >
                        <Lock className="h-16 w-16 md:h-20 md:w-20 text-cyan-400" />
                        </motion.div>
                    </motion.div>

                    <motion.h1
                        className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent leading-none"
                        animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                        }}
                        style={{
                        backgroundSize: "200% 200%",
                        }}
                    >
                        401
                    </motion.h1>
                    </motion.div>

                    <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                        opacity: [0, 0.3, 0],
                        x: [0, 3, -3, 0],
                    }}
                    transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        repeatDelay: 3,
                    }}
                    >
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-cyan-400/30 leading-none pt-24">401</h1>
                    </motion.div>

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
                        You don't have permission to access this resource. It seems like you're trying to enter a restricted area of our digital fortress.
                    </motion.p>
                    </motion.div>

                    
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="mb-8 p-6 rounded-lg bg-gradient-to-r from-slate-900/40 via-blue-900/30 to-slate-800/40 border border-cyan-500/20 backdrop-blur-sm max-w-md mx-auto"
                    >
                    <div className="flex items-center gap-3 mb-4">
                        <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="p-2 rounded-full bg-cyan-500/20"
                        >
                        <AlertTriangle className="h-5 w-5 text-cyan-400" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-cyan-300">Security Alert</h3>
                    </div>
                    <p className="text-sm text-slate-300">
                        Your current credentials don't grant access to this page. Please contact an administrator or sign in with appropriate permissions.
                    </p>
                    </motion.div>

                    
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
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-cyan-500/40 text-[#8bc9ff] hover:bg-slate-800/30 hover:text-cyan-200 hover:border-cyan-400/60"
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
                        className="border-blue-500/30 text-[#8bc9ff] hover:bg-blue-800/30 hover:text-blue-200 hover:border-blue-400/60"
                        >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Go Back
                        </Button>
                    </motion.div>
                    </motion.div>
                </div>

                
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
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
                        repeat: Infinity,
                        }}
                    />
                    ))}
            </div>
        </div>
    )
}
