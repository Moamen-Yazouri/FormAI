"use client"
import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'
const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.8 }
    }
};
const CTAImage = () => {
    return (
        <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 relative"
        >
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl scale-110 will-change-transform" />

                <div className="relative rounded-2xl overflow-hidden border border-cyan-700/30 shadow-2xl">
                    <Image
                        src="/cta.webp"
                        alt="FormAI Dashboard Preview"
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />

                    
                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-2 border border-cyan-700/20">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-xs text-slate-300">Live</span>
                        </div>
                    </div>

                    
                    <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-2 border border-cyan-700/20">
                        <div className="text-xs text-slate-300">
                            <div className="text-cyan-400 font-semibold">+247%</div>
                            <div>Conversion Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
const MemoizedCTAImage = React.memo(CTAImage);
export default MemoizedCTAImage;