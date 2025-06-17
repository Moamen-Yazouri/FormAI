"use client";
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { features } from './constants'

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

const featuresCards = () => {
    return (
        <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
        {features.map((feature) => {
            const Icon = feature.icon
            return (
            <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
            >
                <Card className="relative h-full bg-slate-900/60 border border-cyan-700/30 backdrop-blur-sm overflow-hidden hover:border-cyan-400 transition-all duration-500 shadow-[0_0_40px_-10px_rgba(6,182,212,0.15)]">
                
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
                    <a href="#about" className="text-sm">Learn more</a>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                </CardContent>
                </Card>
            </motion.div>
            )
        })}
        </motion.div>
    )
}
const MemoizedCards = React.memo(featuresCards);
export default MemoizedCards;