"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface ICreatorActivityData {
  date: string
  formsCreated: number
  responsesReceived: number
}

interface IProps {
  creatorActivityData: ICreatorActivityData[]
}

const CreatorActivityChart = ({ creatorActivityData }: IProps) => {
  return (
    <Card className="bg-gradient-to-br from-slate-950 via-blue-900/30 to-indigo-800/30 border border-blue-700/30 shadow-xl backdrop-blur-md text-[#93c1ff]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
          Creator Activity
        </CardTitle>
        <CardDescription className="text-slate-400">
          Your daily form creation and response activity
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={creatorActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="formsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.6} /> 
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="responsesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} /> 
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.15)" />
              <XAxis
                dataKey="date"
                stroke="#cbd5e1"
                tick={{ fontSize: 12, fill: "#cbd5e1" }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getDate()}/${date.getMonth() + 1}`
                }}
              />
              <YAxis stroke="#cbd5e1" tick={{ fontSize: 12, fill: "#cbd5e1" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)", 
                  borderColor: "rgba(6, 182, 212, 0.4)", 
                  borderRadius: "0.5rem",
                  backdropFilter: "blur(8px)"
                }}
                labelStyle={{ color: "#67e8f9" }} 
                itemStyle={{ color: "#bae6fd" }} 
              />
              <Legend wrapperStyle={{ color: "#67e8f9", fontSize: "14px", paddingTop: "8px" }} />
              <Area
                type="monotone"
                dataKey="formsCreated"
                name="Forms Created"
                stackId="1"
                stroke="#06b6d4"
                fill="url(#formsGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="responsesReceived"
                name="Responses Received"
                stackId="2"
                stroke="#3b82f6"
                fill="url(#responsesGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreatorActivityChart
