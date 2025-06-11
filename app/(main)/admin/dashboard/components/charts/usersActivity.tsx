"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { IUsersActivityData } from "@/@types";

interface IProps {
  userActivityData: IUsersActivityData[]
}

const UserActivityChart = ({ userActivityData }: IProps) => {
  return (
    <Card className="bg-gradient-to-br from-slate-950 via-blue-900/30 to-indigo-800/30 border border-blue-700/30 shadow-xl backdrop-blur-md text-[#93c1ff]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
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
                tick={{ fill: "#cbd5e1", fontSize: 12 }} 
              />
              <YAxis tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)", 
                  borderColor: "rgba(59, 130, 246, 0.5)", 
                  borderRadius: "0.5rem",
                  backdropFilter: "blur(8px)"
                }}
                labelStyle={{ color: "#67e8f9" }} 
                itemStyle={{ color: "#bae6fd" }} 
              />
              <Legend
                wrapperStyle={{
                  color: "#67e8f9", 
                  fontSize: "14px",
                  paddingTop: "8px"
                }}
              />
              <Bar
                dataKey="new"
                name="New Users"
                fill="#06b6d4" 
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="active"
                name="Active Users"
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserActivityChart
