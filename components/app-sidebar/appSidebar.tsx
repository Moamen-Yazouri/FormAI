"use client"

import {
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"
import { Sparkles, Menu } from "lucide-react"
import NavItemsProvider from "./navItemsProvider"
import LoginInfo from "./components/login-info"
import { useContext } from "react"
import { AuthContext } from "@/providers/auth/authProvider"
import Loader from "./loader"
import { getNavItems } from "./util/getNavItems"

export default function AppSidebar() {
  const { isMobile } = useSidebar();
    
  return (
    <>
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-14 z-30 flex items-center px-4 border-b border-violet-800/30 bg-gradient-to-r from-slate-900/95 via-violet-900/90 to-indigo-900/90 backdrop-blur-md">
          <SidebarTrigger className="mr-2 text-violet-300 hover:text-violet-200 hover:bg-violet-800/30 rounded-md p-1 transition-all duration-200">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
              FormAI
            </h1>
          </div>
        </div>
      )}

      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="!bg-gradient-to-b !from-slate-900 !via-violet-900 !to-indigo-900 !text-slate-200 !border-r !border-violet-800/30 backdrop-blur-md
        [&_*]:!bg-transparent
        [&_*]:!text-slate-200
        [&_svg]:!text-violet-400
        [&_button]:!hover:bg-violet-800/30
        [&_button]:!hover:text-violet-100"
      >
        <SidebarHeader className="p-4 border-b !border-violet-800/20 bg-gradient-to-r from-slate-800/40 to-violet-800/40">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-violet-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              FormAI
            </span>
          </div>
        </SidebarHeader>

        <NavItemsProvider />
        <LoginInfo />
      </Sidebar>
    </>
  )
}
