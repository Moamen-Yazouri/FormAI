"use client";
import { AuthContext } from '@/providers/auth/authProvider';
import { motion } from 'framer-motion'
import { Bot, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useCallback, useContext } from 'react'
const fadeUp = {
    fadeUp: {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    },
}
const actionButtons = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    
    const handleStart = useCallback(() => {
        router.push(user ? "/form-generator" : "/sign-in");
    }, [user, router]);

    const handleDemo = useCallback(() => {
        
        console.log("Demo clicked");
    }, []);
    return (
        <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 w-full max-w-md mx-auto lg:mx-0"
        >
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 hover:from-cyan-500 hover:via-blue-500 hover:to-sky-500 text-white px-8 py-3 rounded-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto relative overflow-hidden will-change-transform"
                onClick={handleStart}
            >
                <span className="relative z-10 flex items-center justify-center">
                    <Bot className="mr-2 h-4 w-4" /> Start Building
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDemo}
                className="group border border-cyan-700/30 text-slate-300 hover:bg-cyan-900/20 hover:text-white hover:border-cyan-600 px-8 py-3 rounded-lg font-medium w-full sm:w-auto transition-all duration-300 backdrop-blur-sm will-change-transform"
            >
                <span className="flex items-center justify-center">
                    <Zap className="mr-2 h-4 w-4 group-hover:text-cyan-400 transition-colors" /> Watch Demo
                </span>
            </motion.button>
        </motion.div>
    )
}
const MemoizedActionButtons = React.memo(actionButtons);
export default MemoizedActionButtons;