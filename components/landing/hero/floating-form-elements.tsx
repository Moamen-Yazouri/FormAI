"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formElements } from "./constants";

export function FloatingFormElements() {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const element = formElements[i % formElements.length]
        const Icon = element.icon

        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
            }}
            animate={{
              x: [Math.random() * dimensions.width, Math.random() * dimensions.width, Math.random() * dimensions.width],
              y: [
                Math.random() * dimensions.height,
                Math.random() * dimensions.height,
                Math.random() * dimensions.height,
              ],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ zIndex: 0 }}
          >
            <div className="relative group">
              
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              
              <div className="relative w-14 h-14 bg-slate-900/40 backdrop-blur-sm rounded-lg border border-cyan-700/30 flex items-center justify-center shadow-lg">
                <Icon className={`w-6 h-6 ${element.color}`} />
              </div>

              
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-cyan-700/20">
                {element.label}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
