import React from "react"

const DashboardHeader = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-violet-900 to-indigo-900 border-b border-violet-800/40 shadow-md sticky top-0 z-10 mt-14 md:mt-0 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-violet-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
      </div>
    </header>
  )
}

export default DashboardHeader
