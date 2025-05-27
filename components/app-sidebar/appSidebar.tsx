"use client"
import {
    Sidebar,
    SidebarHeader,
    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar"
import {
    Sparkles,
    Menu
} from "lucide-react"
import NavItemsProvider from "./navItemsProvider"
import LoginInfo from "./components/login-info"

export default function AppSidebar() {
    const {isMobile} = useSidebar();
    
    return (
        <> 
            {
            isMobile && (
                <div className="fixed top-0 left-0 right-0 h-14 border-b bg-white z-30 flex items-center px-4">
                    <SidebarTrigger className="mr-2">
                        <Menu className="h-5 w-5"/>
                    </SidebarTrigger>
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-600"/>
                        <h1 className="text-lg font-bold text-purple-900">FormAI</h1>
                    </div>
                </div>
            )
        }

            <Sidebar variant="sidebar" collapsible="icon">
                <SidebarHeader className="p-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-purple-600"/>
                        <span className="font-bold text-xl text-purple-900">FormAI</span>
                    </div>
                </SidebarHeader>

                <NavItemsProvider />

                <LoginInfo/>
            </Sidebar>
        </>
    )
}
