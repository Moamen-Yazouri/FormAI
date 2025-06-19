import React from 'react'

const BackgroundColors = () => {
    return (
        <div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-2xl -translate-x-32 -translate-y-32 will-change-transform" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-cyan-600/10 to-blue-600/10 rounded-full blur-2xl translate-x-40 translate-y-40 will-change-transform" />
            <div className="absolute top-1/2 left-10 w-40 h-40 bg-gradient-to-br from-cyan-700/20 to-blue-700/20 rounded-full blur-3xl -translate-y-1/2 animate-pulse will-change-transform" />
        </div>
    )
}

export default BackgroundColors;