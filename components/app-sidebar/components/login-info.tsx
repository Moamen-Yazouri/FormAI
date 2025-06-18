"use client"

import { AuthContext } from "@/providers/auth/authProvider"
import { useContext, useState } from "react"
import Loader from "../loader"
import { SidebarFooter } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


const LoginInfo = () => {
  const { user, isLoading, revalidateUser } = useContext(AuthContext)
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  if (isLoading) return <Loader />
  if (!user) return null

  const nameForAvatar = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")

  const handleLogout = async () => {
    setLoggingOut(true);
    try{
      await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        }),

      revalidateUser();

      router.push("/sign-in");
    }
    catch {
      toast.error("Something went wrong")
    }
    finally {
      setTimeout(() => {
        setLoggingOut(false)
      }, 2000);
    }
    
  }

  return (
    <SidebarFooter className="border-t border-cyan-800/30 p-0">
      <div className="p-4 bg-gradient-to-r from-slate-900/60 via-blue-900/40 to-cyan-900/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Avatar className="ring-2 ring-cyan-500/30">
            <div className=" w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold">
              {nameForAvatar}
            </div>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              {user.name}
            </span>
            <span className="text-xs text-slate-300">{user.email}</span>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="w-full mt-4 text-red-300 hover:text-red-200 hover:bg-red-900/30 border border-red-700/30 hover:border-red-600/50 transition-all duration-200"
        >
          
            {
              loggingOut ? (<Loader />) : (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log out</span>
                </>
              )
            }
        </Button>
      </div>
    </SidebarFooter>
  )
}

export default LoginInfo
