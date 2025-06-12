const DashboardHeader = () => {
    return (
        <header className="bg-slate-950/9 border-b border-cyan-500/30 shadow-2xl sticky top-0 z-20 mt-14 md:mt-0 backdrop-blur-md ring-1 ring-cyan-500/20">
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
            Admin Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">Manage your platform with AI-powered insights</p>
        </div>
        </header>
    )
}

export default DashboardHeader
