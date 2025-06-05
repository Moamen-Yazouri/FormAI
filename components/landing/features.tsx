"use client"

import { motion } from "framer-motion"
import { FormInput, Share2, MessageSquareText, ArrowRight, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturesSection() {
  const features = [
    {
      icon: FormInput,
      title: "Create Forms",
      description: "Build intelligent forms with AI-powered field suggestions and smart validation rules.",
      details: [
        "Drag & drop form builder",
        "AI-powered field suggestions",
        "Smart validation rules",
        "Custom styling options",
      ],
      gradient: "from-cyan-600 to-blue-600",
      bgGradient: "from-cyan-700/20 to-blue-800/20",
      delay: 0.1,
    },
    {
      icon: Share2,
      title: "Share Forms",
      description: "Distribute your forms instantly with secure links and embed options for any platform.",
      details: ["Instant secure sharing", "Embeddable widgets", "QR code generation", "Access control settings"],
      gradient: "from-blue-600 to-cyan-700",
      bgGradient: "from-blue-700/20 to-cyan-800/20",
      delay: 0.2,
    },
    {
      icon: MessageSquareText,
      title: "Answer Forms",
      description: "Provide seamless form completion experience with real-time validation and progress tracking.",
      details: ["Real-time validation", "Progress tracking", "Auto-save functionality", "Mobile-optimized interface"],
      gradient: "from-cyan-500 to-sky-600",
      bgGradient: "from-cyan-600/20 to-sky-700/20",
      delay: 0.3,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
        <section id="features" className="relative py-20 md:py-28 bg-gradient-to-tr from-slate-950 via-blue-950 to-cyan-950 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-cyan-600/15 to-blue-700/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-bl from-blue-700/15 to-cyan-600/15 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
            >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center rounded-full border border-cyan-700/30 bg-slate-900/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6"
            >
                <Sparkles className="mr-2 h-4 w-4 text-cyan-400" />
                <span className="text-slate-300">Powerful Features</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Everything you need to
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent">
                build better forms
                </span>
            </h2>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                From creation to completion, our AI-powered platform streamlines every step of the form lifecycle
            </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
            {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                <motion.div
                    key={feature.title}
                    variants={cardVariants}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="group relative"
                >
                    <Card className="relative h-full bg-slate-900/60 border border-cyan-700/30 backdrop-blur-sm overflow-hidden hover:border-cyan-400 transition-all duration-500 shadow-[0_0_40px_-10px_rgba(6,182,212,0.15)]">
                    {/* Gradient background like the header */}
                    <div className="absolute inset-0 -z-10">
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-40`} />
                        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full blur-xl -translate-x-8 -translate-y-8" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-sky-600/20 to-cyan-600/20 rounded-full blur-xl translate-x-8 translate-y-8" />
                    </div>

                    <CardContent className="relative p-8 h-full flex flex-col">
                        <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-500/25 transition-all duration-500`}
                        >
                        <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-colors duration-300">
                            {feature.title}
                        </h3>
                        <p className="text-slate-400 mb-6 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                            {feature.description}
                        </p>
                        <ul className="space-y-3 mb-6">
                            {feature.details.map((detail, detailIndex) => (
                            <motion.li
                                key={detail}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                duration: 0.4,
                                delay: feature.delay + detailIndex * 0.1,
                                }}
                                className="flex items-center text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3 group-hover:bg-cyan-300 transition-colors duration-300"></div>
                                {detail}
                            </motion.li>
                            ))}
                        </ul>
                        </div>

                        <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center text-cyan-400 group-hover:text-cyan-300 font-medium cursor-pointer transition-colors duration-300"
                        >
                        <span className="text-sm">Learn more</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.div>
                    </CardContent>
                    </Card>
                </motion.div>
                )
            })}
            </motion.div>

            {/* CTA Button */}
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
            >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 hover:from-cyan-500 hover:via-blue-500 hover:to-sky-500 text-white px-8 py-4 rounded-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
                <span className="relative z-10 flex items-center">
                Start Building Forms
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
            </motion.div>
        </div>
        </section>
    )
}
