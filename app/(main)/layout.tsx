import type React from "react"
import "../globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar/appSidebar"
import { ScrollableContainer } from "@/components/scroll-container/scroll-container"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

        <SidebarProvider className="w-full">
          <AppSidebar />
          <ScrollableContainer maxHeight="100vh" className="w-full">
            {children}
          </ScrollableContainer>
        </SidebarProvider>
  )
}