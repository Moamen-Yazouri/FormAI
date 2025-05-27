"use client" 
import {usePathname, useRouter} from "next/navigation"
import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,

    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar"
import {
    LogOut,
    Sparkles,
    Menu
} from "lucide-react"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import { AuthContext } from "@/providers/auth/authProvider"
import { use, useContext } from "react"
import NavItemsProvider from "./navItemsProvider"
import Loader from "./loader"

export default function AppSidebar() {
    const {user, isLoading, revalidateUser} = use(AuthContext)
    const router = useRouter();
    const pathname = usePathname();
    const {isMobile} = useSidebar();
    const nameForAvatar = user?.name?.split(" ").map((word) => word[0]).join("");

    if(isLoading) return <Loader/>


    if(pathname.includes("answer-form")) return null;

    const handleLogout =  async() => {
        await Promise.all([
            fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            }),
            revalidateUser(),
        ]);
        router.push("/sign-in");
    }

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

                <NavItemsProvider name={user!.name} role={user!.role}/>

                <SidebarFooter className="border-t">
                    <div className="p-4">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="/placeholder.svg?height=32&width=32"/>
                                <AvatarFallback className="bg-purple-200 text-purple-900">{nameForAvatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{user!.name}</span>
                                <span className="text-xs text-muted-foreground">{user!.email}</span>
                            </div>
                        </div>
                        <Button 
                            onClick={handleLogout} 
                            variant="ghost" 
                            size="sm" 
                            className="w-full mt-4 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                            <LogOut className="h-4 w-4 mr-2"/>
                            <span>Log out</span>
                        </Button>
                    </div>
                </SidebarFooter>
            </Sidebar>
        </>
    )
}
