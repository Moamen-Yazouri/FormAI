"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Shield, Lock, AlertTriangle } from "lucide-react";
interface IShape {
  id: number,
  size: number,
  x: number,
  y: number,
  duration: number,
  delay: number,
}
export default function Forbidden() {
  const router = useRouter();
  const [floatingShapes, setFloatingShapes] = useState<IShape[]>([]);

  useEffect(() => {
    const shapes = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 40,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 4,
    }));
    setFloatingShapes(shapes);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-900/20 to-cyan-800/20"></div>

      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-800/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-bl from-indigo-700/20 to-cyan-500/20 rounded-full blur-3xl"></div>

      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute opacity-10"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{ y: [0, -30, 0], rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {shape.id % 3 === 0 ? (
            <Shield className="w-full h-full text-cyan-400/30" />
          ) : shape.id % 3 === 1 ? (
            <Lock className="w-full h-full text-indigo-400/30" />
          ) : (
            <AlertTriangle className="w-full h-full text-blue-400/30" />
          )}
        </motion.div>
      ))}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-slate-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="p-6 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-700/10 border-2 border-cyan-500/20 backdrop-blur-sm"
            >
              <Lock className="h-20 w-20 md:h-24 md:w-24 text-cyan-400" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-blue-800 via-indigo-700 to-cyan-500 bg-clip-text text-transparent leading-none mb-2"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            403
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-4">Forbidden</h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            You don&apos;t have permission to access this page. Contact your admin if you believe this is a mistake.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-cyan-500 hover:bg-cyan-400 text-white shadow-xl px-6 py-3"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" /> Home
            </Link>
          </Button>

          <Button
            
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            className="text-blue-300 border border-blue-700  hover:bg-blue-900/20 hover:text-white transition"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Go Back
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
