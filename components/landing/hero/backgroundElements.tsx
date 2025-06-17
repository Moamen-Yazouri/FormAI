import React from 'react'

const BackgroundElements = () => {
    return (
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/60 via-blue-900/50 to-sky-900/60 -z-10"></div>
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 rounded-full blur-3xl -z-10 will-change-transform"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-600/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse [animation-delay:1s] -z-10 will-change-transform"></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-t from-blue-600/25 to-cyan-600/25 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse [animation-delay:2s] -z-10 will-change-transform"></div>
        </div>

    )
}
const MemoizedBackgroundElements = React.memo(BackgroundElements);
export default MemoizedBackgroundElements
