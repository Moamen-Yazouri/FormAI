"use client";
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import React from 'react'

const FeaturesHeader = () => {

    return (
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
    )
}
const MemoizedHeader = React.memo(FeaturesHeader);
export default MemoizedHeader;