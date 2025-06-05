"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import Image from "next/image"

export default function CTASection() {
    return (
        <section className="w-full py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950">
        {/* Decorative Background Effects */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-2xl -translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-cyan-600/10 to-blue-600/10 rounded-full blur-2xl translate-x-40 translate-y-40" />
        <div className="absolute top-1/2 left-10 w-40 h-40 bg-gradient-to-br from-cyan-700/20 to-blue-700/20 rounded-full blur-3xl -translate-y-1/2 animate-pulse" />
        
        <div className="relative w-full max-w-7xl mx-auto px-6 z-10">
            
            <div className="rounded-2xl px-8 py-16 md:px-16 bg-slate-900/50 backdrop-blur-md border border-cyan-700/30 shadow-[0_0_60px_-15px_rgba(6,182,212,0.1)]">
                
            <div className="flex flex-col lg:flex-row items-center gap-12">
                                <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 text-center lg:text-left text-white"
                >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="inline-flex items-center rounded-full border border-cyan-700/30 bg-slate-900/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6"
                >
                    <Sparkles className="mr-2 h-4 w-4 text-cyan-400" />
                    <span className="text-slate-300">Join us now</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                >
                    Ready to{" "}
                    <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent">
                    Build
                    </span>
                    <br />
                    your first form?
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mb-8 text-lg text-slate-400 max-w-lg mx-auto lg:mx-0"
                >

                        <strong>Build your first form today by joining us as a creator. </strong> 
                        Effortlessly design and share forms, manage access with full control, and receive real-time responses from your users — 
                        all in one powerful platform.

                </motion.p>

                {/* Features List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 mb-8 text-sm text-slate-300"
                >
                    <div className="flex items-center">
                    <Zap className="mr-2 h-4 w-4 text-cyan-400" />
                    <span>AI-Powered Intelligence</span>
                    </div>
                    <div className="flex items-center">
                    <Zap className="mr-2 h-4 w-4 text-cyan-400" />
                    <span>Real-time Analytics</span>
                    </div>
                    <div className="flex items-center">
                    <Zap className="mr-2 h-4 w-4 text-cyan-400" />
                    <span>Zero Setup Time</span>
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                    <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 hover:from-cyan-500 hover:via-blue-500 hover:to-sky-500 text-white px-8 py-4 rounded-lg font-medium shadow-xl hover:shadow-cyan-900/30 transition-all duration-300 relative overflow-hidden"
                    >
                    <span className="relative z-10 flex items-center justify-center">
                        Start Your Free Trial
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.button>

                    <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-cyan-700/30 text-slate-300 hover:bg-cyan-900/20 hover:text-white hover:border-cyan-600 px-8 py-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm"
                    >
                    Watch Demo
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-8 text-xs text-slate-500"
                >
                    ✨ No credit card required • 🚀 Only provide Your prompt • 🔒 Enterprise-grade security
                </motion.div>
                </motion.div>
                {/* Left Image */}
                <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1 relative"
                >
                <div className="relative w-full max-w-md mx-auto lg:mx-0">

                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl scale-110"></div>

                    <div className="relative rounded-2xl overflow-hidden border border-cyan-700/30 shadow-2xl">
                    <Image
                        src="/cta.webp"
                        alt="FormAI Dashboard Preview"
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover"
                        priority
                    />

                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-2 border border-cyan-700/20">
                        <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-300">Live</span>
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-2 border border-cyan-700/20">
                        <div className="text-xs text-slate-300">
                        <div className="text-cyan-400 font-semibold">+247%</div>
                        <div>Conversion Rate</div>
                        </div>
                    </div>
                    </div>
                </div>
                </motion.div>

            </div>
            </div>
        </div>
        </section>
    )
}
