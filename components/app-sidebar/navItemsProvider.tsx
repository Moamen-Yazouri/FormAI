"use client"

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, FileText, Settings, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { INavItem } from "./types"
import { getNavItems } from "./util/getNavItems"
import { AuthContext } from "@/providers/auth/authProvider"
import { useContext } from "react"



export default function NavItemsProvider() {
  const {user, isLoading} = useContext(AuthContext);
  const pathname = usePathname();

  if(isLoading || !user) return null;
  const navItems  = getNavItems(user.role, user.name) 
  return (
    <SidebarContent className="flex-1 p-2">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      transition-all duration-200 rounded-lg mb-1
                      ${
                        isActive
                          ? "!bg-gradient-to-r from-violet-600/70 to-indigo-600/70 text-white border border-violet-500/50 shadow-lg"
                          : "text-slate-300 hover:!bg-violet-800/40 hover:!text-violet-200"
                      }
                    `}
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}
