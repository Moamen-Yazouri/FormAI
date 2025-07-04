"use client"

import {
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import NavItemsProvider from "./navItemsProvider";
import LoginInfo from "./components/login-info";
import Logo from "../header/logo";

export default function AppSidebar() {
  const { isMobile } = useSidebar();

  return (
    <>
      {isMobile && (
        <div className="mb-20 absolute top-0 left-0 right-0 h-14 z-30 flex items-center px-4 border-b !bg-gradient-to-b !from-slate-950 !via-blue-950 !to-cyan-950 !text-slate-200 !border-r !border-cyan-800/30 backdrop-blur-md">
          <SidebarTrigger className="mr-2 text-cyan-300 hover:text-white hover:bg-cyan-800/30 rounded-md p-1 transition-all duration-200">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
          <div className="flex items-center gap-2">
            <Logo size={30} />
            <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              FormAI
            </h1>
          </div>
        </div>
      )}

      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="!bg-gradient-to-b !from-slate-950 !via-blue-950 !to-cyan-950 !text-slate-200 !border-r !border-cyan-800/30 backdrop-blur-md
        [&_*]:!bg-transparent
        [&_*]:!text-slate-200
        [&_svg]:!text-cyan-400
        [&_button]:!hover:bg-cyan-800/30
        [&_button]:!hover:text-white"
      >
        <SidebarHeader className="p-4 border-b !border-cyan-800/20 bg-gradient-to-r from-slate-800/40 to-cyan-800/40">
          <div className="flex items-center gap-2">
            <Logo size={40}/>
            <span className="font-bold text-xl bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent">
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
