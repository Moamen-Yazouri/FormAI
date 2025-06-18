"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, Menu, ChevronDown } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { AuthContext } from "@/providers/auth/authProvider";
import { useRouter } from "next/navigation";
import Logo from "./logo";
import { navItems } from "./constants";
import { toast } from "sonner";

const Header = () => {
  const { user, isLoading, revalidateUser } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setLoggingOut(true);
    try{
      await Promise.all([
        fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        }),
        revalidateUser(),
      ]);
    }
    catch {
      toast.error("Something went wrong")
    }
    finally {
      setTimeout(() => {
        setLoggingOut(false)
      }, 2000);
    }
    router.push("/sign-in")
  };

  const handleDashboard = () => {
    if (!user) return;
    const path =
      user.role === "admin"
        ? `/${user.role}/dashboard`
        : `/${user.role}/${user.name}/dashboard`;
    router.push(path);
  };

  return (
    <header className="sticky top-2 z-50 w-[99%] max-w-[1600px] mx-auto rounded-xl p-2 border border-cyan-400/20 shadow-xl backdrop-blur-lg overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/60 via-blue-900/50 to-sky-900/60" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 rounded-full blur-xl -translate-x-16 -translate-y-16" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-sky-600/30 to-cyan-600/30 rounded-full blur-xl translate-x-20 -translate-y-20" />
      <div className="absolute bottom-0 left-1/2 w-24 h-24 bg-gradient-to-t from-blue-600/25 to-cyan-600/25 rounded-full blur-lg transform -translate-x-12 translate-y-12" />

      <div className="relative w-full px-6 flex h-16 items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Logo size={48} showGlow={false} />
          </motion.div>
          <motion.span
            className="text-2xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent tracking-tight"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            FormAI
          </motion.span>
        </Link>

      
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-cyan-300 transition-all duration-200 hover:scale-105 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        
        <div className="flex items-center gap-4">
          {user && !loggingOut ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-cyan-800/30 text-slate-300 hover:text-cyan-200 border border-cyan-700/30 px-3 py-1.5 h-auto"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{user.email}</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-slate-800/95 backdrop-blur-sm border-cyan-700/50 w-48"
              >
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-cyan-800/50 text-slate-200 hover:text-white"
                  onClick={handleDashboard}
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-cyan-800/50 text-slate-200 hover:text-white"
                  onClick={() => router.push(`/profile/${user.name}`)}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-cyan-800/50 text-slate-200 hover:text-white border-t border-cyan-700/30 mt-1 pt-1"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-slate-300 hover:text-cyan-300 transition-all duration-200 hover:scale-105 px-4 py-2"
              >
                {isLoading || loggingOut ? <Loader2 className="animate-spin text-cyan-400" /> : "Login"}
              </Link>

              {!isLoading && !loggingOut && (
                <Button
                  className="bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 hover:from-cyan-500 hover:via-blue-500 hover:to-sky-500 text-white shadow-xl hover:shadow-cyan-900/20 transition-all duration-300 hover:scale-105 border-0 ring-1 ring-cyan-500/30"
                  onClick={() => router.push("/sign-up")}
                >
                  Get Started
                </Button>
              )}
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-cyan-800/30 border border-cyan-700/30"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="h-6 w-6 text-cyan-300" />
        </Button>
      </div>

      
      {mobileOpen && (
        <motion.div
          className="md:hidden px-6 pb-4 space-y-2 border-t border-cyan-700/30 backdrop-blur-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-sm font-medium text-slate-300 hover:text-cyan-300 py-2.5 hover:bg-cyan-800/30 rounded-md px-3 transition-all duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {!user && (
            <div className="pt-2 mt-2 border-t border-cyan-800/30">
              <Button
                className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-sky-600 hover:from-cyan-500 hover:via-blue-500 hover:to-sky-500 text-white"
                onClick={() => {
                  router.push("/sign-in");
                  setMobileOpen(false);
                }}
              >
                Sign In
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </header>
  );
};

export default Header;
