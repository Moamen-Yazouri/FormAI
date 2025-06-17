import {motion} from 'framer-motion'
import {Sparkles} from 'lucide-react'
import React from 'react'

export const containerVariants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8
        }
    }
}

export const badgeVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            delay: 0.2
        }
    }
}

const AboutHeader = () => {
    return (
        <motion.div variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={
                {once: true}
            }
            className="text-center mb-16"
        >

            <motion.div variants={badgeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={
                    {once: true}
                }
                className="inline-flex items-center rounded-full border border-cyan-700/30 bg-slate-900/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6">
                <Sparkles className="mr-2 h-4 w-4 text-cyan-400"/>
                <span className="text-slate-300">About FormAI</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Revolutionizing forms with
                <br/>
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent">
                    artificial intelligence
                </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                We're on a mission to transform how businesses collect, analyze, and act on data through intelligent form technology that adapts and learns.
            </p>
        </motion.div>
    )
}

const MemoizedAboutHeader = React.memo(AboutHeader);
export default MemoizedAboutHeader;
