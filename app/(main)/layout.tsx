import type React from "react"
import "../globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar/appSidebar"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

        <SidebarProvider className="w-full">
            <AppSidebar />
          {children}
        </SidebarProvider>
  )
}