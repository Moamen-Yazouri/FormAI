"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { ICreatorResponses } from "../../types";

interface IProps {
  recentResponses: ICreatorResponses[]
}

const RecentResponses = ({ recentResponses }: IProps) => {
  return (
    <Card className="bg-gradient-to-br from-slate-950 via-blue-900/30 to-indigo-900/30 border border-blue-700/30 shadow-xl backdrop-blur-md text-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
          Recent Responses
        </CardTitle>
        <CardDescription className="text-slate-400">
          Latest responses to your forms
        </CardDescription>
      </CardHeader>

      <CardContent>
        {recentResponses.length === 0 ? (
          <p className="text-center text-slate-400 py-4">
            No recent responses yet.
          </p>
        ) : (
          <div className="space-y-4">
            {recentResponses.map((response) => (
              <div
                key={response.id}
                className="flex items-center gap-4 rounded-md border border-slate-700/40 bg-slate-900/30 p-3 hover:bg-slate-800/40 transition"
              >
                <Avatar className="h-9 w-9 ring-2 ring-cyan-500/40">
                  <AvatarFallback className="bg-cyan-700 text-white font-bold text-sm">
                    {response.respondentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-100">
                    {response.respondentName}
                  </p>
                  <p className="text-xs text-slate-400">{response.formTitle}</p>
                </div>

                <div className="text-xs text-slate-400">
                  {new Date(response.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RecentResponses;
