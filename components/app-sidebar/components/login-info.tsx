"use client"

import { AuthContext } from "@/providers/auth/authProvider";
import { useContext } from "react";
import Loader from "../loader";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const LoginInfo = () => {
    const {user, isLoading, revalidateUser} = useContext(AuthContext);
    const router = useRouter();

    if(isLoading) return <Loader/>
    if(!user) return null;

    const nameForAvatar = user.name.split(" ").map((word) => word[0]).join("");

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
    )
}

export default LoginInfo