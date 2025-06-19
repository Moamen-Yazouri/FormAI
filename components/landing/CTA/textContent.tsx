"use client";
import { motion } from 'framer-motion'
import { Sparkles, Zap } from 'lucide-react'
import React from 'react'
import MemoizedCTActions from './CTActions';
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
    }
};

const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.8 }
    }
};

const TextContent = () => {

    return (
        <motion.div
            variants={slideVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 text-center lg:text-left text-white"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center rounded-full border border-cyan-700/30 bg-slate-900/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6"
                >
                    <Sparkles className="mr-2 h-4 w-4 text-cyan-400" />
                    <span className="text-slate-300">Join us now</span>
                </motion.div>

                
                <motion.h2
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                >
                    Ready to{" "}
                    <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent">
                        Build
                    </span>
                    <br />
                    your first form?
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    className="mb-8 text-lg text-slate-400 max-w-lg mx-auto lg:mx-0"
                >
                    <strong>Build your first form today by joining us as a creator. </strong> 
                    Effortlessly design and share forms, manage access with full control, and receive real-time responses from your users — 
                    all in one powerful platform.
                </motion.p>

                <motion.div
                    variants={itemVariants}
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

                <MemoizedCTActions />

                <motion.div
                    variants={itemVariants}
                    className="mt-8 text-xs text-slate-500"
                >
                    ✨ No credit card required • 🚀 Only provide Your prompt • 🔒 Enterprise-grade security
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
const MemoizedCTAText = React.memo(TextContent);
export default MemoizedCTAText;