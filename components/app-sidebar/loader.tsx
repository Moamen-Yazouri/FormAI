import React from 'react'

const Loader = () => {
    return (
        <div className="w-60 h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600" />
        </div>
    )
}

export default Loader