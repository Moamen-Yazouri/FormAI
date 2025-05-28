"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card"
import { IUsersActivityData } from "@/@types"

interface IProps {
  userActivityData: IUsersActivityData[]
}

const UserActivityChart = ({ userActivityData }: IProps) => {
  return (
    <Card className="bg-gradient-to-br from-slate-900/60 via-violet-900/40 to-indigo-900/40 border border-violet-800/30 shadow-xl backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-violet-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
          User Activity
        </CardTitle>
        <CardDescription className="text-slate-400">
          Daily active users and new registrations
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userActivityData}>
              <XAxis
                dataKey="name"
                interval={0}
                tick={{ fill: "#a1a1aa", fontSize: 12 }} // zinc-400
              />
              <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 27, 75, 0.95)",
                  borderColor: "rgba(139, 92, 246, 0.4)",
                  borderRadius: "0.5rem",
                  backdropFilter: "blur(8px)"
                }}
                labelStyle={{ color: "#c4b5fd" }}
                itemStyle={{ color: "#e0e7ff" }}
              />
              <Legend
                wrapperStyle={{
                  color: "#c4b5fd",
                  fontSize: "14px",
                  paddingTop: "8px"
                }}
              />
              <Bar dataKey="new" name="New Users" fill="#c084fc" radius={[4, 4, 0, 0]} />
              <Bar dataKey="active" name="Active Users" fill="#818cf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserActivityChart
