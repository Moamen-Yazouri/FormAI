import type React from "react"
import Image from "next/image"

interface LogoProps {
  size?: number
  className?: string
  showGlow?: boolean
}

const Logo = ({ size = 120, className = "", showGlow = true }: LogoProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">

        {showGlow && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-xl"
            style={{ width: size + 20, height: size + 20, left: -10, top: -10 }}
          />
        )}

        <div
          className="relative rounded-full bg-gradient-to-br from-blue-900/60 via-indigo-800/50 to-cyan-600/60 backdrop-blur-md border-2 border-cyan-500/40 shadow-2xl overflow-hidden"
          style={{ width: size, height: size }}
        >

          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/10 to-cyan-400/20 rounded-full" />

          <div className="relative w-full h-full flex items-center justify-center p-1">
            <Image
              src="/logo.png"
              alt="FormAI Logo"
              width={size - 8}
              height={size - 8}
              className="object-cover rounded-full drop-shadow-lg"
              priority
            />
          </div>

          <div className="absolute inset-2 rounded-full border border-cyan-400/20" />
        </div>
      </div>
    </div>
  )
}

export default Logo
