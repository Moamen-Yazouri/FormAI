"use client" 
import {motion} from "framer-motion";
import React from "react";

const containerVariants = {
    hidden: {
        opacity: 0,
        x: -50
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8
        }
    }
}

const missionBoxVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: 0.3
        }
    }
}

const OurStory = () => {
    return (
        <motion.div variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={
                {
                    once: true
                }
            }
            className="space-y-8">
            <div>
                <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                    <p>
                        Founded in 2023 by a team of AI researchers and UX designers, FormAI emerged from a simple observation: traditional forms were failing businesses and frustrating users.
                    </p>
                    <p>
                        We envisioned a world where forms could be intelligent, adaptive, and genuinely helpful. Where every interaction would provide valuable insights, and where the barrier between businesses and their customers would dissolve into seamless, meaningful conversations.
                    </p>
                    <p>
                        In 2025, Moamen Al Yazouri, a passionate frontend developer, 
                        joined the mission with a bold vision: to make form creation radically faster and smarter. 
                        Recognizing how widespread form usage is—and how valuable time has become—he introduced an AI-driven experience where users simply describe their form in a prompt, 
                        click a button, and instantly receive a beautifully designed form with smart validation rules, ready to share.
                    </p>
                </div>
            </div>

            <motion.div variants={missionBoxVariants}
                initial="hidden"
                whileInView="visible"
                viewport={
                    {
                        once: true
                    }
                }
                className="bg-slate-900/50 backdrop-blur-sm border border-cyan-600/30 rounded-xl p-6">
                <h4 className="text-xl font-semibold text-cyan-300 mb-3">Our Mission</h4>
                <p>
                    To make intelligent form creation accessible to everyone. By harnessing the power of AI, 
                    we enable businesses and individuals to generate, style, and validate forms instantly—without needing technical expertise. 
                    Our goal is to save time, boost productivity, and turn every form into a powerful tool for meaningful data collection.
                </p>
            </motion.div>
        </motion.div>
    )
}

const MemoizedOurStory = React.memo(OurStory);
export default MemoizedOurStory
