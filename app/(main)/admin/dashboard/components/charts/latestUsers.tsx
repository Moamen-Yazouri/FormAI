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
import { IActiveUsers } from "@/@types"

interface IProps {
    activeUsers: IActiveUsers[];
}

export function ActiveUsersCard(props: IProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Latest active users on the platform</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {
                    props.activeUsers.map((user) => (
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
                                        user.status === "active" ? "bg-green-500" : user.status === "inactive" ? "bg-yellow-500" : "bg-gray-400"
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
