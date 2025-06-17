import { ContainerTextFlip } from '@/components/ui/container-text-flip'
import { motion } from 'framer-motion'
import React from 'react'
import { textFlipWords } from './constants'
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
const title = () => {
    return (
        <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl mb-6 text-white"
        >
            <ContainerTextFlip
                words={textFlipWords}
                className="text-white"
            />
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent">
                powered by AI
            </span>
        </motion.h1>
    )
}
const MemoizedTitle = React.memo(title)
export default MemoizedTitle;