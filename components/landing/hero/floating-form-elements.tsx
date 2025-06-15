"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formElements } from "./constants";

export function FloatingFormElements() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      setPositions(
        Array.from({ length: 12 }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
        }))
      );
      setIsReady(true);
    };

    if (typeof window !== "undefined") {
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  if (!isReady) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {positions.map((pos, i) => {
        const element = formElements[i % formElements.length];
        const Icon = element.icon;

        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: pos.x, y: pos.y }}
            animate={{
              x: [pos.x, Math.random() * dimensions.width, Math.random() * dimensions.width],
              y: [pos.y, Math.random() * dimensions.height, Math.random() * dimensions.height],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-14 h-14 bg-slate-900/40 backdrop-blur-sm rounded-lg border border-cyan-700/30 flex items-center justify-center shadow-lg">
                <Icon className={`w-6 h-6 ${element.color}`} />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-cyan-700/20">
                {element.label}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
