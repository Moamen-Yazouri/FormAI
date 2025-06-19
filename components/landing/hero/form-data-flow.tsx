"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface FormDataFlowProps {
  id?: string;
  className?: string;
}

interface DataPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: number;
  opacity: number;
  pulsePhase: number;
}

interface Connection {
  point1Index: number;
  point2Index: number;
  opacity: number;
  flowProgress: number;
}

export const FormDataFlow = ({ 
  id = "form-data-flow", 
  className = "h-full w-full" 
}: FormDataFlowProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const dataPointsRef = useRef<DataPoint[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastScrollY = useRef(0);
  const isScrolling = useRef(false);

  
  const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 15 : 25;
  const maxConnections = Math.floor(particleCount * 0.3);

  const colors = {
    primary: "#22D3EE",
    secondary: "#0EA5E9", 
    accent: "#0891B2",
    flow: "#7DD3FC"
  };

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    
    ctx.scale(dpr, dpr);
    setDimensions({ width: rect.width, height: rect.height });

    
    dataPointsRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1.5,
      type: Math.floor(Math.random() * 4),
      opacity: Math.random() * 0.4 + 0.2,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    
    connectionsRef.current = [];
    for (let i = 0; i < maxConnections; i++) {
      const point1Index = Math.floor(Math.random() * particleCount);
      let point2Index = Math.floor(Math.random() * particleCount);
      while (point2Index === point1Index) {
        point2Index = Math.floor(Math.random() * particleCount);
      }
      
      connectionsRef.current.push({
        point1Index,
        point2Index,
        opacity: 0.05,
        flowProgress: Math.random(),
      });
    }

    setIsReady(true);
  }, [particleCount, maxConnections]);

  const drawDataPoint = useCallback((ctx: CanvasRenderingContext2D, point: DataPoint) => {
    const pulse = Math.sin(point.pulsePhase) * 0.2 + 0.8;
    const currentOpacity = point.opacity * pulse;
    
    ctx.save();
    ctx.globalAlpha = currentOpacity;

    switch (point.type) {
      case 0: 
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(point.x - 6, point.y - 2, 12, 4);
        ctx.fillStyle = colors.accent;
        ctx.fillRect(point.x - 4, point.y - 0.5, 3, 1);
        break;
      case 1: 
        ctx.strokeStyle = colors.secondary;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(point.x - 2.5, point.y - 2.5, 5, 5);
        ctx.fillStyle = colors.accent;
        ctx.fillRect(point.x - 1, point.y - 1, 2, 2);
        break;
      case 2: 
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(point.x - 5, point.y - 2, 10, 4);
        ctx.fillStyle = colors.accent;
        ctx.beginPath();
        ctx.moveTo(point.x + 2, point.y - 0.5);
        ctx.lineTo(point.x + 3.5, point.y + 0.5);
        ctx.lineTo(point.x + 0.5, point.y + 0.5);
        ctx.closePath();
        ctx.fill();
        break;
      case 3: 
        ctx.fillStyle = colors.secondary;
        for (let i = 0; i < 3; i++) {
          const height = Math.random() * 3 + 1;
          ctx.fillRect(point.x - 3 + i * 2, point.y + 1 - height, 1.5, height);
        }
        break;
    }

    ctx.restore();
  }, [colors]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible || isScrolling.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    
    connectionsRef.current.forEach((connection) => {
      const point1 = dataPointsRef.current[connection.point1Index];
      const point2 = dataPointsRef.current[connection.point2Index];
      
      if (!point1 || !point2) return;

      const distance = Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
      
      if (distance < 80) {
        connection.flowProgress += 0.008;
        if (connection.flowProgress > 1) connection.flowProgress = 0;

        ctx.save();
        ctx.globalAlpha = connection.opacity * (1 - distance / 80);
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 0.3;
        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.stroke();

        
        const flowX = point1.x + (point2.x - point1.x) * connection.flowProgress;
        const flowY = point1.y + (point2.y - point1.y) * connection.flowProgress;
        ctx.fillStyle = colors.flow;
        ctx.beginPath();
        ctx.arc(flowX, flowY, 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    
    dataPointsRef.current.forEach((point) => {
      
      point.x += point.vx;
      point.y += point.vy;
      point.pulsePhase += 0.015;

      
      if (point.x > dimensions.width) point.x = 0;
      if (point.x < 0) point.x = dimensions.width;
      if (point.y > dimensions.height) point.y = 0;
      if (point.y < 0) point.y = dimensions.height;

      
      const dx = mouseRef.current.x - point.x;
      const dy = mouseRef.current.y - point.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        const force = (100 - distance) / 100;
        point.x -= Math.cos(angle) * force * 0.5;
        point.y -= Math.sin(angle) * force * 0.5;
      }

      drawDataPoint(ctx, point);
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [dimensions, isVisible, drawDataPoint, colors]);

  
  useEffect(() => {
    let mouseTimeout: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }, 16); 
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseTimeout);
    };
  }, []);

  
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      
      if (scrollDelta > 3) {
        isScrolling.current = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling.current = false;
        }, 100);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    const handleResize = () => {
      initializeCanvas();
    };

    if (typeof window !== "undefined") {
      initializeCanvas();
      window.addEventListener("resize", handleResize);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      
      return () => {
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, [initializeCanvas]);

  
  useEffect(() => {
    if (isReady && isVisible) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isReady, isVisible, animate]);

  if (!isReady) return null;

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        background: "transparent",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};