"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2, Menu, User } from "lucide-react"
import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { AuthContext } from "@/providers/auth/authProvider"
import { useRouter } from "next/navigation"

const Header = () => {
  const { user, isLoading } = useContext(AuthContext)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/sign-in")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-800/30 bg-gradient-to-r from-slate-950 via-cyan-950 to-blue-950 shadow-2xl backdrop-blur-md relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/60 via-blue-900/50 to-sky-900/60"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 rounded-full blur-xl -translate-x-16 -translate-y-16"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-sky-600/30 to-cyan-600/30 rounded-full blur-xl translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 left-1/2 w-24 h-24 bg-gradient-to-t from-blue-600/25 to-cyan-600/25 rounded-full blur-lg transform -translate-x-12 translate-y-12"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative w-full max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <motion.img
            src="/logo.png"
            alt="FormAI Logo"
            className="w-[50px] h-[50px] rounded-full border-2 border-cyan-400 shadow-xl ring-2 ring-cyan-400/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <motion.span
            className="text-2xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent tracking-tight"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            FormAI
          </motion.span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-6">
          {["features", "how-it-works", "pricing"].map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className="text-sm font-medium text-slate-300 hover:text-cyan-300 transition-all duration-200 hover:scale-105"
            >
              {section.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join(" ")}
            </Link>
          ))}
        </nav>

        {/* Auth Area */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-cyan-800/30 text-slate-300 hover:text-cyan-200 border border-cyan-700/30"
                >
                  <User className="h-4 w-4" />
                  {user.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-800/95 backdrop-blur-sm border-cyan-700/50">
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-cyan-800/50 text-slate-200 hover:text-white"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/sign-in"
              className="text-sm font-medium text-slate-300 hover:text-cyan-300 transition-all duration-200 hover:scale-105"
            >
              {isLoading ? <Loader2 className="animate-spin text-cyan-400" /> : "Login"}
            </Link>
          )}
          <Button className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 hover:from-cyan-500 hover:via-blue-500 hover:to-sky-500 text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 border-0 ring-1 ring-cyan-500/30">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-cyan-800/30 border border-cyan-700/30"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="h-6 w-6 text-cyan-300" />
        </Button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <motion.div
          className="md:hidden px-6 pb-4 space-y-2 bg-gradient-to-b from-slate-900/95 to-cyan-900/95 border-t border-cyan-700/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {["features", "how-it-works", "pricing"].map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className="block text-sm font-medium text-slate-300 hover:text-cyan-300 py-2 hover:bg-cyan-800/30 rounded-md px-2 transition-all duration-200"
            >
              {section.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join(" ")}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  )
}

export default Header
