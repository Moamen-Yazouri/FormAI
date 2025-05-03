"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentResponses = [
  {
    id: "1",
    formTitle: "Customer Feedback",
    respondent: "Alex Johnson",
    date: "2023-05-01T09:30:00",
    status: "completed",
  },
  {
    id: "2",
    formTitle: "Product Survey",
    respondent: "Maria Garcia",
    date: "2023-05-01T10:15:00",
    status: "completed",
  },
  {
    id: "3",
    formTitle: "Event Registration",
    respondent: "James Smith",
    date: "2023-05-01T11:45:00",
    status: "partial",
  },
  {
    id: "4",
    formTitle: "Newsletter Signup",
    respondent: "Emma Wilson",
    date: "2023-05-01T13:20:00",
    status: "completed",
  },
]

const RecentResponses = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Responses</CardTitle>
        <CardDescription>Latest responses to your forms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentResponses.map((response) => (
            <div key={response.id} className="flex items-center gap-4 rounded-lg border p-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={response.respondent} />
                <AvatarFallback>
                  {response.respondent
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{response.respondent}</p>
                <p className="text-sm text-muted-foreground">{response.formTitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={response.status === "completed" ? "default" : "outline"}>
                  {response.status === "completed" ? "Complete" : "Partial"}
                </Badge>
                <p className="text-xs text-muted-foreground">{new Date(response.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentResponses
