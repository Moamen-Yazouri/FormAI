"use client"

import { motion } from "framer-motion"
import { Users, Target, Lightbulb, Award, ArrowRight, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function AboutSection() {
    const stats = [
        { number: "10K+", label: "Active Users", icon: Users },
        { number: "99.9%", label: "Uptime", icon: Target },
        { number: "50M+", label: "Forms Created", icon: Lightbulb },
        { number: "150+", label: "Countries", icon: Award },
    ]

    const values = [
        {
        icon: Lightbulb,
        title: "Innovation First",
        description: "We push the boundaries of what's possible with AI-powered form technology.",
        gradient: "from-cyan-500 to-blue-600",
        },
        {
        icon: Users,
        title: "User-Centric",
        description: "Every feature we build starts with understanding our users' real needs.",
        gradient: "from-blue-500 to-sky-600",
        },
        {
        icon: Target,
        title: "Results Driven",
        description: "We measure success by the conversion rates and insights our users achieve.",
        gradient: "from-sky-500 to-cyan-600",
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
        },
    }

    return (
        <section id="about" className="relative py-20 md:py-28 bg-gradient-to-tr from-slate-950 via-blue-950 to-cyan-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-600/15 to-blue-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-2xl transform -translate-x-32 -translate-y-32 animate-pulse [animation-delay:1s]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center rounded-full border border-cyan-700/30 bg-slate-900/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6">
                <Sparkles className="mr-2 h-4 w-4 text-cyan-400" />
                <span className="text-slate-300">About FormAI</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Revolutionizing forms with <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent">
                artificial intelligence
                </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                We're on a mission to transform how businesses collect, analyze, and act on data through intelligent form technology that adapts and learns.
            </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-8">
                <div>
                <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                    <p>
                    Founded in 2023 by a team of AI researchers and UX designers, FormAI emerged from a simple observation: traditional forms were failing businesses and frustrating users.
                    </p>
                    <p>
                    We envisioned a world where forms could be intelligent, adaptive, and genuinely helpful. Where every interaction would provide valuable insights, and where the barrier between businesses and their customers would dissolve into seamless, meaningful conversations.
                    </p>
                    <p>
                    Today, we're proud to serve over 10,000 businesses worldwide, helping them achieve conversion rates that seemed impossible just a few years ago.
                    </p>
                </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-slate-900/50 backdrop-blur-sm border border-cyan-600/30 rounded-xl p-6">
                <h4 className="text-xl font-semibold text-cyan-300 mb-3">Our Mission</h4>
                <p className="text-slate-300 leading-relaxed">
                    To democratize intelligent data collection by making AI-powered forms accessible to every business, regardless of size or technical expertise.
                </p>
                </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
                <div className="relative rounded-2xl overflow-hidden border border-cyan-600/30 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-2xl scale-110" />
                <div className="relative">
                    <Image src="/about-us.png" alt="FormAI Team" width={600} height={400} className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-cyan-600/20">
                        <div className="text-cyan-400 font-bold text-lg">2023</div>
                        <div className="text-slate-300 text-sm">Founded</div>
                    </div>
                    <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-cyan-600/20">
                        <div className="text-cyan-400 font-bold text-lg">25+</div>
                        <div className="text-slate-300 text-sm">Team Members</div>
                    </div>
                    </div>
                </div>
                </div>
            </motion.div>
            </div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat) => {
                const Icon = stat.icon
                return (
                <motion.div key={stat.label} variants={itemVariants} className="text-center group">
                    <div className="bg-slate-900/60 backdrop-blur-sm border border-cyan-600/30 rounded-xl p-6 hover:border-cyan-400 transition-all duration-300 group-hover:bg-slate-900/70">
                    <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
                        {stat.number}
                    </div>
                    <div className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors duration-300">
                        {stat.label}
                    </div>
                    </div>
                </motion.div>
                )
            })}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
                The principles that guide everything we do and every decision we make.
            </p>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {values.map((value) => {
                const Icon = value.icon
                return (
                <motion.div key={value.title} variants={itemVariants} whileHover={{ y: -5 }} className="group">
                    <Card className="h-full bg-slate-900/50 border-cyan-600/30 backdrop-blur-sm hover:border-cyan-400 transition-all duration-500">
                    <CardContent className="p-8 text-center">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-colors duration-300">
                        {value.title}
                        </h4>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                        {value.description}
                        </p>
                    </CardContent>
                    </Card>
                </motion.div>
                )
            })}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 hover:from-cyan-500 hover:via-blue-500 hover:to-sky-500 text-white px-8 py-4 rounded-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                Join Our Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
            </motion.div>
        </div>
        </section>
    )
}
