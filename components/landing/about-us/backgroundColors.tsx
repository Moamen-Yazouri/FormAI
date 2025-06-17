import React from 'react'

const BackgroundColors = () => {
    return (
        <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid-white/[0.02]"></div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-600/15 to-blue-600/15 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>

            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-2xl -translate-x-32 -translate-y-32 transform animate-pulse [animation-delay:1s]"></div>
        </div>


    )
}

export default BackgroundColors;