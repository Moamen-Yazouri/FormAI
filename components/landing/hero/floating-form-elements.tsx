"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { formElements } from "./constants";

interface FloatingElement {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  scaleDirection: number;
  elementIndex: number;
}

export function FloatingFormElements() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const elementsRef = useRef<FloatingElement[]>([]);
  const animationRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const scrollThreshold = 5;

  
  const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 12 : 16;

  const initializeElements = useCallback((width: number, height: number) => {
    
    const centerMarginX = width * 0.2; 
    const centerMarginY = height * 0.2; 
    const centerWidth = width - (centerMarginX * 2);
    const centerHeight = height - (centerMarginY * 2);

    elementsRef.current = Array.from({ length: particleCount }, (_, i) => ({
      
      x: centerMarginX + Math.random() * centerWidth,
      y: centerMarginY + Math.random() * centerHeight,
      
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * 360,
      
      rotationSpeed: (Math.random() - 0.5) * 0.8,
      scale: 0.8 + Math.random() * 0.4,
      scaleDirection: Math.random() > 0.5 ? 1 : -1,
      elementIndex: i % formElements.length,
    }));
  }, [particleCount]);

  const animate = useCallback(() => {
    if (!containerRef.current || !isVisible) return;

    const { width, height } = dimensions;
    
    
    const centerMarginX = width * 0.15; 
    const centerMarginY = height * 0.15;
    const centerWidth = width - (centerMarginX * 2);
    const centerHeight = height - (centerMarginY * 2);
    
    elementsRef.current.forEach((element) => {
      
      element.x += element.vx;
      element.y += element.vy;

      
      if (element.x > centerMarginX + centerWidth || element.x < centerMarginX) {
        element.vx *= -1;
        element.x = Math.max(centerMarginX, Math.min(centerMarginX + centerWidth, element.x));
      }
      if (element.y > centerMarginY + centerHeight || element.y < centerMarginY) {
        element.vy *= -1;
        element.y = Math.max(centerMarginY, Math.min(centerMarginY + centerHeight, element.y));
      }

      element.rotation += element.rotationSpeed;

      element.scale += element.scaleDirection * 0.001;
      if (element.scale > 1.2 || element.scale < 0.8) {
        element.scaleDirection *= -1;
      }
    });

    const elements = containerRef.current.children;
    elementsRef.current.forEach((element, i) => {
      const domElement = elements[i] as HTMLElement;
      if (domElement) {
        domElement.style.transform = `translate3d(${element.x}px, ${element.y}px, 0) rotate(${element.rotation}deg) scale(${element.scale})`;
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [dimensions, isVisible]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      
      if (scrollDelta > scrollThreshold) {
        setIsVisible(false);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => setIsVisible(true), 150);
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
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      initializeElements(width, height);
      setIsReady(true);
    };

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    if (typeof window !== "undefined") {
      updateSize();
      window.addEventListener("resize", updateSize);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      
      return () => {
        window.removeEventListener("resize", updateSize);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, [initializeElements]);

  
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
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none" 
      style={{ zIndex: 0 }}
    >
      {elementsRef.current.map((element, i) => {
        const formElement = formElements[element.elementIndex];
        const Icon = formElement.icon;

        return (
          <div
            key={i}
            className="absolute will-change-transform"
            style={{
              transform: `translate3d(${element.x}px, ${element.y}px, 0) rotate(${element.rotation}deg) scale(${element.scale})`,
            }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 bg-slate-900/30 backdrop-blur-sm rounded-lg border border-cyan-700/20 flex items-center justify-center shadow-md">
                <Icon className={`w-5 h-5 ${formElement.color}`} />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800/80 backdrop-blur-sm rounded px-2 py-1 text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap border border-cyan-700/10 pointer-events-none">
                {formElement.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}