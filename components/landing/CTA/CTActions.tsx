"use client";
import { AuthContext } from '@/providers/auth/authProvider';
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useCallback, useContext } from 'react'
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
    }
};
const CTActions = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    
    const handleStart = useCallback(() => {
        if (user) {
            router.push("/form-generator")
        } else {
            router.push("/sign-in")
        }
    }, [user, router]);

    const handleDemo = useCallback(() => {
        console.log("Demo clicked");
    }, []);
    return (
        <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStart}
                className="group bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 hover:from-cyan-500 hover:via-blue-500 hover:to-sky-500 text-white px-8 py-4 rounded-lg font-medium shadow-xl hover:shadow-cyan-900/30 transition-all duration-300 relative overflow-hidden will-change-transform"
            >
                <span className="relative z-10 flex items-center justify-center">
                    Start for free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDemo}
                className="border border-cyan-700/30 text-slate-300 hover:bg-cyan-900/20 hover:text-white hover:border-cyan-600 px-8 py-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm will-change-transform"
            >
                <a 
                    href ="https://www.youtube.com/watch?v=1FZRk-t1zFc" 
                    className="flex items-center justify-center"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <Zap className="mr-2 h-4 w-4 group-hover:text-cyan-400 transition-colors" /> Watch Demo
                </a>
            </motion.button>
        </motion.div>
    )
}
const MemoizedCTActions = React.memo(CTActions);
export default MemoizedCTActions;