"use client"

import { useEffect, useRef, useState } from "react"
import { useMousePosition } from "./hook/use-mouse-position"

interface FormDataFlowProps {
  id?: string
  className?: string
}

export const FormDataFlow = ({ id = "form-data-flow", className = "h-full w-full" }: FormDataFlowProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useMousePosition()
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    if (typeof window === "undefined") return

    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let dataPoints: DataPoint[] = []
    let connections: Connection[] = []
    let animationFrameId: number

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class DataPoint {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      type: "input" | "checkbox" | "select" | "analytics"
      opacity: number
      pulsePhase: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 3 + 2
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.type = ["input", "checkbox", "select", "analytics"][Math.floor(Math.random() * 4)] as any
        this.opacity = Math.random() * 0.5 + 0.3
        this.pulsePhase = Math.random() * Math.PI * 2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.pulsePhase += 0.02
        if(!canvas) return
        // Wrap around edges
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height

        // Mouse interaction
        const dx = mousePosition.x - this.x
        const dy = mousePosition.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 150) {
          const angle = Math.atan2(dy, dx)
          const force = (150 - distance) / 150
          this.x -= Math.cos(angle) * force * 2
          this.y -= Math.sin(angle) * force * 2
        }
      }

      draw() {
        if (!ctx) return

        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7
        const currentOpacity = this.opacity * pulse

        ctx.save()
        ctx.globalAlpha = currentOpacity

        switch (this.type) {
          case "input":
            // Draw input field
            ctx.strokeStyle = "#22D3EE" // cyan-400
            ctx.lineWidth = 1
            ctx.strokeRect(this.x - 8, this.y - 3, 16, 6)
            ctx.fillStyle = "#0891B2" // cyan-600
            ctx.fillRect(this.x - 6, this.y - 1, 4, 2)
            break

          case "checkbox":
            // Draw checkbox
            ctx.strokeStyle = "#0EA5E9" // sky-500
            ctx.lineWidth = 1
            ctx.strokeRect(this.x - 3, this.y - 3, 6, 6)
            ctx.fillStyle = "#0284C7" // sky-600
            ctx.fillRect(this.x - 1, this.y - 1, 2, 2)
            break

          case "select":
            // Draw dropdown
            ctx.strokeStyle = "#22D3EE" // cyan-400
            ctx.lineWidth = 1
            ctx.strokeRect(this.x - 6, this.y - 3, 12, 6)
            ctx.fillStyle = "#0891B2" // cyan-600
            ctx.beginPath()
            ctx.moveTo(this.x + 3, this.y - 1)
            ctx.lineTo(this.x + 5, this.y + 1)
            ctx.lineTo(this.x + 1, this.y + 1)
            ctx.closePath()
            ctx.fill()
            break

          case "analytics":
            // Draw chart bar
            ctx.fillStyle = "#0EA5E9" // sky-500
            for (let i = 0; i < 3; i++) {
              const height = Math.random() * 4 + 2
              ctx.fillRect(this.x - 4 + i * 3, this.y + 2 - height, 2, height)
            }
            break
        }

        ctx.restore()
      }
    }

    class Connection {
      point1: DataPoint
      point2: DataPoint
      opacity: number
      flowProgress: number

      constructor(p1: DataPoint, p2: DataPoint) {
        this.point1 = p1
        this.point2 = p2
        this.opacity = 0.1
        this.flowProgress = 0
      }

      update() {
        this.flowProgress += 0.01
        if (this.flowProgress > 1) this.flowProgress = 0
      }

      draw() {
        if (!ctx) return

        const distance = Math.sqrt(
          Math.pow(this.point2.x - this.point1.x, 2) + Math.pow(this.point2.y - this.point1.y, 2),
        )

        if (distance < 120) {
          ctx.save()
          ctx.globalAlpha = this.opacity * (1 - distance / 120)

          // Draw connection line
          ctx.strokeStyle = "#22D3EE" // cyan-400
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(this.point1.x, this.point1.y)
          ctx.lineTo(this.point2.x, this.point2.y)
          ctx.stroke()

          // Draw data flow
          const flowX = this.point1.x + (this.point2.x - this.point1.x) * this.flowProgress
          const flowY = this.point1.y + (this.point2.y - this.point1.y) * this.flowProgress

          ctx.fillStyle = "#7DD3FC" // sky-300
          ctx.beginPath()
          ctx.arc(flowX, flowY, 1, 0, Math.PI * 2)
          ctx.fill()

          ctx.restore()
        }
      }
    }

    const init = () => {
      dataPoints = []
      connections = []

      // Create data points
      for (let i = 0; i < 40; i++) {
        dataPoints.push(new DataPoint())
      }

      // Create connections
      for (let i = 0; i < dataPoints.length; i++) {
        for (let j = i + 1; j < dataPoints.length; j++) {
          if (Math.random() < 0.1) {
            connections.push(new Connection(dataPoints[i], dataPoints[j]))
          }
        }
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw connections
      connections.forEach((connection) => {
        connection.update()
        connection.draw()
      })

      // Update and draw data points
      dataPoints.forEach((point) => {
        point.update()
        point.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      if (typeof window === "undefined") return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      init()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition.x, mousePosition.y])

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        background: "transparent",
        width: dimensions.width,
        height: dimensions.height,
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  )
}
