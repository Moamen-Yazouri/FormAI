import React from "react";

const BackgroundColors = () => (
    <>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-950 to-cyan-950 -z-10"/>
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"/>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-cyan-600/10 rounded-full blur-2xl -z-10"/>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-600/10 to-blue-600/10 rounded-full blur-2xl -z-10"/>
    </>
);

export const MemoizedBackgroundColors = React.memo(BackgroundColors);
