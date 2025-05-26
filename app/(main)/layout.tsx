import type React from "react"
import "../globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar/appSidebar"
import { Suspense } from "react"
import Loader from "@/components/app-sidebar/loader"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

        <SidebarProvider className="w-full">
            <Suspense fallback={<Loader/>}>
              <AppSidebar />
            </Suspense>
          {children}
        </SidebarProvider>
  )
}