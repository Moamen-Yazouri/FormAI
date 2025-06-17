import { motion } from 'framer-motion'
import React from 'react'
const fadeRight = {
    fadeRight: {
        hidden: { opacity: 0, x: 30 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    },
}
const description = () => {
    return (
        <motion.p
            variants={fadeRight}
            className="max-w-[42rem] text-slate-300 sm:text-xl mb-8 leading-relaxed"
        >
            Build, deploy, and analyze forms with the help of artificial intelligence. Transform user
            interactions into actionable insights with real-time data flow visualization.
        </motion.p>
    )
}
const MemoizedDescription = React.memo(description)
export default MemoizedDescription;