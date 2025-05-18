"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ICreatorResponses } from "../../types"

interface IProps {
  recentResponses: ICreatorResponses[]
}
const RecentResponses = (props: IProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Responses</CardTitle>
        <CardDescription>Latest responses to your forms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {props.recentResponses.map((response) => (
            <div key={response.id} className="flex items-center gap-4 rounded-lg border p-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={response.respondentName} />
                <AvatarFallback>
                  {response.respondentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{response.respondentName}</p>
                <p className="text-sm text-muted-foreground">{response.formTitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{new Date(response.date).toISOString().split("T")[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentResponses
