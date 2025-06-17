import React from 'react'
import MemoizedHeroImage from './hero-image'
import { motion } from 'framer-motion'

const RightMotionsElements = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 relative w-full group flex items-center justify-center"
        >
        
            <MemoizedHeroImage />
        </motion.div>
    )
}

export default RightMotionsElements