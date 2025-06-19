"use client"

import type React from "react";
import { useContext} from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AuthContext } from "@/providers/auth/authProvider";
import FullPageLoader from "./profileLoader";

export default function ProfileHeader() {
    const { user, isLoading } = useContext(AuthContext)
    

    if (isLoading) return <FullPageLoader />
    if (!user) return null

    const getInitials = (name: string) =>
        name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()




    return (
        <Card className="bg-gradient-to-br from-blue-950 via-indigo-950 to-cyan-900 border border-cyan-700/20 backdrop-blur-md shadow-2xl">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative group">
                    <Avatar className="h-24 w-24 border-2 border-cyan-500/50 shadow-xl ring-2 ring-blue-500/20">
                        <>
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xl font-bold">
                            {getInitials(user.name)}
                        </AvatarFallback>
                        </>
                    </Avatar>
                </div>

                <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                    {user.name}
                    </h2>
                    <p className="text-slate-400 mt-1">{user.email}</p>
                    <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-600/70 to-cyan-600/70 text-white border border-cyan-500/30 shadow-md">
                        {user.role}
                    </span>
                    </div>
                </div>
                </div>
            </CardContent>
        </Card>
    )
}
