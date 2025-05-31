"use client"

import { FileText } from "lucide-react"
import { useEffect, useState } from "react"

export default function LoadingPage() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      setRotation((prev) => (prev + 1) % 360)
      requestAnimationFrame(animate)
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent">
      
      <div className="relative w-24 h-24 mb-8">
        
        <div
          className="absolute inset-0 rounded-full border-4 border-t-blue-800 border-r-indigo-700 border-b-cyan-500 border-l-slate-200"
          style={{ transform: `rotate(${rotation}deg)` }}
        />

        
        <div
          className="absolute inset-2 rounded-full border-4 border-t-slate-200 border-r-cyan-500 border-b-indigo-700 border-l-blue-800"
          style={{ transform: `rotate(${-rotation * 1.5}deg)` }}
        />

        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-cyan-500 rounded-full animate-pulse" />
        </div>

        
        {[0, 90, 180, 270].map((angle) => (
          <div
            key={angle}
            className="absolute w-3 h-3 bg-blue-800 rounded-full"
            style={{
              top: `calc(50% - 1.5px + ${Math.sin(((rotation + angle) * Math.PI) / 180) * 40}px)`,
              left: `calc(50% - 1.5px + ${Math.cos(((rotation + angle) * Math.PI) / 180) * 40}px)`,
              opacity: 0.6 + 0.4 * Math.sin(((rotation + angle) * Math.PI) / 180),
            }}
          />
        ))}
      </div>

      
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6 text-cyan-500" />
        <span className="text-2xl font-bold text-slate-200">FormAI</span>
      </div>
    </div>
  )
}
