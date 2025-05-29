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
    <Card className="bg-gradient-to-br from-slate-950 via-blue-800/30 to-indigo-700/30 border border-cyan-500/30 shadow-xl backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
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
                tick={{ fill: "#94a3b8", fontSize: 12 }} // slate-400
              />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)", // slate-950
                  borderColor: "rgba(6, 182, 212, 0.4)", // cyan-500
                  borderRadius: "0.5rem",
                  backdropFilter: "blur(8px)"
                }}
                labelStyle={{ color: "#67e8f9" }} // cyan-300
                itemStyle={{ color: "#bae6fd" }} // cyan-100
              />
              <Legend
                wrapperStyle={{
                  color: "#67e8f9", // cyan-300
                  fontSize: "14px",
                  paddingTop: "8px"
                }}
              />
              <Bar dataKey="new" name="New Users" fill="#06b6d4" radius={[4, 4, 0, 0]} /> {/* cyan-500 */}
              <Bar dataKey="active" name="Active Users" fill="#3b82f6" radius={[4, 4, 0, 0]} /> {/* blue-500 */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserActivityChart
