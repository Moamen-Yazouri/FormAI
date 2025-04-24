import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Clock, FileText} from "lucide-react"

interface Iprops {
    
}
const activeUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        lastActive: "2 minutes ago",
        status: "online",
        forms: 12
    },
    {
        id: 2,
        name: "Emily Davis",
        email: "emily@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        lastActive: "15 minutes ago",
        status: "online",
        forms: 15
    },
    {
        id: 3,
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        lastActive: "1 hour ago",
        status: "away",
        forms: 8
    },
    {
        id: 4,
        name: "Michael Wilson",
        email: "michael@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        lastActive: "3 hours ago",
        status: "offline",
        forms: 6
    }, {
        id: 5,
        name: "Sarah Brown",
        email: "sarah@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        lastActive: "5 hours ago",
        status: "offline",
        forms: 9
    },
]

export function ActiveUsersCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Latest active users on the platform</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {
                    activeUsers.map((user) => (
                        <div key={
                                user.id
                            }
                            className="flex items-center gap-3">
                            <div className="relative">
                                <Avatar className="h-10 w-10 border-2 border-white">
                                    <AvatarImage src={
                                            user.avatar || "/placeholder.svg"
                                        }
                                        alt={
                                            user.name
                                        }/>
                                    <AvatarFallback className="bg-purple-200 text-purple-900">
                                        {
                                        user.name.split(" ").map((n) => n[0]).join("")
                                    } </AvatarFallback>
                                </Avatar>
                                <span className={
                                    `absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                                        user.status === "online" ? "bg-green-500" : user.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                                    }`
                                }/>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-purple-900">
                                        {
                                        user.name
                                    }</p>
                                    <Badge variant="outline" className="flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200">
                                        <FileText className="h-3 w-3"/> {
                                        user.forms
                                    } </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3"/> {
                                    user.lastActive
                                } </p>
                            </div>
                        </div>
                    ))
                } </div>
            </CardContent>
        </Card>
    )
}
