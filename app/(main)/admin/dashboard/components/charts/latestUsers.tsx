"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText } from "lucide-react";
import type { IActiveUsers } from "@/@types";

interface IProps {
  activeUsers: IActiveUsers[]
}

export function ActiveUsersCard({ activeUsers }: IProps) {
  return (
    <Card className="bg-gradient-to-br from-slate-950/60 via-blue-900/40 to-indigo-900/40 border border-blue-700/30 shadow-xl backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
          Active Users
        </CardTitle>
        <CardDescription className="text-slate-400">Latest active users on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-blue-700/50">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-200">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950 ${
                    user.status === "active"
                      ? "bg-cyan-500"
                      : user.status === "inactive"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-200">{user.name}</p>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 bg-blue-900/30 border-blue-700/50 text-slate-200"
                  >
                    <FileText className="h-3 w-3" />
                    {user.forms}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {user.lastActive}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
