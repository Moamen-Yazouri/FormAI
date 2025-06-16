"use client";

import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "./hook/use-mouse-position";

interface FormDataFlowProps {
  id?: string;
  className?: string;
}

export const FormDataFlow = ({ id = "form-data-flow", className = "h-full w-full" }: FormDataFlowProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      canvas.width = width;
      canvas.height = height;
      init();
    };

    let dataPoints: DataPoint[] = [];
    let connections: Connection[] = [];
    let animationFrameId: number;

    class DataPoint {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      type: string;
      opacity: number;
      pulsePhase: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.type = ["input", "checkbox", "select", "analytics"][Math.floor(Math.random() * 4)];
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulsePhase += 0.02;
        if(!canvas) return;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - distance) / 150;
          this.x -= Math.cos(angle) * force * 2;
          this.y -= Math.sin(angle) * force * 2;
        }
      }

      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const currentOpacity = this.opacity * pulse;
        if(!ctx) return;
        ctx.save();
        ctx.globalAlpha = currentOpacity;

        switch (this.type) {
          case "input":
            ctx.strokeStyle = "#22D3EE";
            ctx.lineWidth = 1;
            ctx.strokeRect(this.x - 8, this.y - 3, 16, 6);
            ctx.fillStyle = "#0891B2";
            ctx.fillRect(this.x - 6, this.y - 1, 4, 2);
            break;
          case "checkbox":
            ctx.strokeStyle = "#0EA5E9";
            ctx.lineWidth = 1;
            ctx.strokeRect(this.x - 3, this.y - 3, 6, 6);
            ctx.fillStyle = "#0284C7";
            ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
            break;
          case "select":
            ctx.strokeStyle = "#22D3EE";
            ctx.lineWidth = 1;
            ctx.strokeRect(this.x - 6, this.y - 3, 12, 6);
            ctx.fillStyle = "#0891B2";
            ctx.beginPath();
            ctx.moveTo(this.x + 3, this.y - 1);
            ctx.lineTo(this.x + 5, this.y + 1);
            ctx.lineTo(this.x + 1, this.y + 1);
            ctx.closePath();
            ctx.fill();
            break;
          case "analytics":
            ctx.fillStyle = "#0EA5E9";
            for (let i = 0; i < 3; i++) {
              const height = Math.random() * 4 + 2;
              ctx.fillRect(this.x - 4 + i * 3, this.y + 2 - height, 2, height);
            }
            break;
        }

        ctx.restore();
      }
    }

    class Connection {
      constructor(public point1: DataPoint, public point2: DataPoint) {
        this.opacity = 0.1;
        this.flowProgress = 0;
      }
      opacity: number;
      flowProgress: number;

      update() {
        this.flowProgress += 0.01;
        if (this.flowProgress > 1) this.flowProgress = 0;
      }

      draw() {
        const distance = Math.sqrt((this.point2.x - this.point1.x) ** 2 + (this.point2.y - this.point1.y) ** 2);
        if(!ctx) return;
        if (distance < 120) {
          ctx.save();
          ctx.globalAlpha = this.opacity * (1 - distance / 120);
          ctx.strokeStyle = "#22D3EE";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(this.point1.x, this.point1.y);
          ctx.lineTo(this.point2.x, this.point2.y);
          ctx.stroke();

          const flowX = this.point1.x + (this.point2.x - this.point1.x) * this.flowProgress;
          const flowY = this.point1.y + (this.point2.y - this.point1.y) * this.flowProgress;
          ctx.fillStyle = "#7DD3FC";
          ctx.beginPath();
          ctx.arc(flowX, flowY, 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }

    const init = () => {
      dataPoints = Array.from({ length: 40 }, () => new DataPoint());
      connections = [];
      for (let i = 0; i < dataPoints.length; i++) {
        for (let j = i + 1; j < dataPoints.length; j++) {
          if (Math.random() < 0.1) {
            connections.push(new Connection(dataPoints[i], dataPoints[j]));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      connections.forEach((c) => {
        c.update();
        c.draw();
      });
      dataPoints.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    animate();
    setIsReady(true);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition.x, mousePosition.y]);

  if (!isReady) return null;

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
  );
};
