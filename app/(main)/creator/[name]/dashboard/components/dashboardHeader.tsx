import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DashboardHeader = () => {
    return (
        <header className="sticky top-0 z-10 w-full bg-slate-900/80 border-b border-blue-700/30 backdrop-blur-md shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-cyan-400">Creator Dashboard</h1>
            </div>

        </div>
        </header>
    )
}

export default DashboardHeader
