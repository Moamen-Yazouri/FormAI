import React from 'react'

const BackgroundsColors = () => {
    return (
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-cyan-600/15 to-blue-700/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-bl from-blue-700/15 to-cyan-600/15 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
        </div>

    )
}

export default BackgroundsColors;
