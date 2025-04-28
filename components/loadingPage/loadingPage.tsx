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
      {/* Cool Spinner */}
      <div className="relative w-24 h-24 mb-8">
        {/* Outer spinning circle */}
        <div
          className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-purple-400 border-b-purple-300 border-l-purple-200"
          style={{ transform: `rotate(${rotation}deg)` }}
        />

        {/* Inner spinning circle (opposite direction) */}
        <div
          className="absolute inset-2 rounded-full border-4 border-t-purple-200 border-r-purple-300 border-b-purple-400 border-l-purple-500"
          style={{ transform: `rotate(${-rotation * 1.5}deg)` }}
        />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse" />
        </div>

        {/* Orbiting dots */}
        {[0, 90, 180, 270].map((angle) => (
          <div
            key={angle}
            className="absolute w-3 h-3 bg-purple-500 rounded-full"
            style={{
              top: `calc(50% - 1.5px + ${Math.sin(((rotation + angle) * Math.PI) / 180) * 40}px)`,
              left: `calc(50% - 1.5px + ${Math.cos(((rotation + angle) * Math.PI) / 180) * 40}px)`,
              opacity: 0.6 + 0.4 * Math.sin(((rotation + angle) * Math.PI) / 180),
            }}
          />
        ))}
      </div>

      {/* Website Name */}
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6 text-purple-500" />
        <span className="text-2xl font-bold text-gray-800">FormAI</span>
      </div>
    </div>
  )
}
