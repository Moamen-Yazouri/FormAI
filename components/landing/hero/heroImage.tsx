import React from 'react';
import Image from "next/image";
const heroImage = () => {
    return (
        <div className="relative w-fit rounded-xl border border-cyan-700/30 shadow-[0_0_50px_-12px] shadow-cyan-700/30 transition-all duration-500 group-hover:shadow-[0_0_80px_-6px] group-hover:shadow-sky-700/40 group-hover:border-cyan-600/50">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-800/5 to-sky-800/5 rounded-xl" />
            <Image
                src="/hero.png"
                alt="Hero Section"
                className="rounded-xl ring-1 ring-cyan-700/20 relative z-10 object-cover"
                width={600}
                height={400}
                priority
            />
            <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-cyan-700/20 z-20">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-slate-300">AI Processing</span>
                </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-cyan-700/20 z-20">
                <div className="text-xs text-slate-300">
                    <div className="text-cyan-400 font-semibold">+127% conversion</div>
                    <div>vs traditional forms</div>
                </div>
            </div>
            <div className="absolute top-1/2 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-2 border border-cyan-700/20 z-20">
                <div className="flex items-center gap-1">
                    <div className="w-1 h-3 bg-cyan-400 rounded" />
                    <div className="w-1 h-2 bg-sky-400 rounded" />
                    <div className="w-1 h-4 bg-cyan-500 rounded" />
                    <span className="text-xs text-slate-300 ml-1">Live Data</span>
                </div>
            </div>
    </div>
    )
}

export default heroImage