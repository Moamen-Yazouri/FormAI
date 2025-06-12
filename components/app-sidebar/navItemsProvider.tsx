"use client"

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useContext } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AuthContext } from "@/providers/auth/authProvider"
import { getNavItems } from "./util/getNavItems"

export default function NavItemsProvider() {
  const { user, isLoading } = useContext(AuthContext)
  const pathname = usePathname()

  if (isLoading || !user) return null
  const navItems = getNavItems(user.role, user.name)

  return (
    <SidebarContent className="flex-1 p-2 bg-slate-950 text-slate-200">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`transition-all duration-200 rounded-lg mb-1 border ${
                      isActive
                        ? "bg-gradient-to-r from-blue-800 via-indigo-700 to-cyan-500 text-white border-cyan-400 shadow-md"
                        : "text-slate-200 border-transparent hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30"
                    }`}
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <item.icon
                        className={`h-5 w-5 ${
                          isActive ? "text-white" : "text-cyan-400 group-hover:text-cyan-300"
                        }`}
                      />
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
