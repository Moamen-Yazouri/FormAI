import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import React from 'react';
const animationVariants = {
        fadeRight: {
        hidden: { opacity: 0, x: 30 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    },
}
const Badge = () => {
    return (
    <motion.div
        variants={animationVariants.fadeRight}
        className="inline-flex items-center rounded-full border border-cyan-700/30 bg-slate-900/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6 shadow-lg"
    >
        <span className="bg-gradient-to-r from-cyan-600 to-sky-600 text-white rounded-full px-3 py-0.5 text-xs font-semibold mr-2 shadow-md">
            <Sparkles className="inline w-3 h-3 mr-1" /> NEW
        </span>
        <span className="text-sm text-slate-300">AI-powered form intelligence</span>
        <ArrowRight className="ml-1 h-3.5 w-3.5 text-cyan-400" />
    </motion.div>
    )
}
const MemoizedBadge = React.memo(Badge)
export default MemoizedBadge;