"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

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
    <Card className="bg-gradient-to-br from-slate-900/60 via-violet-900/40 to-indigo-900/40 border border-violet-800/30 shadow-xl backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-violet-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
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
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="responsesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.15)" />
              <XAxis
                dataKey="date"
                stroke="#a1a1aa"
                tick={{ fontSize: 12, fill: "#a1a1aa" }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getDate()}/${date.getMonth() + 1}`
                }}
              />
              <YAxis
                stroke="#a1a1aa"
                tick={{ fontSize: 12, fill: "#a1a1aa" }}
              />
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
                wrapperStyle={{ color: "#c4b5fd", fontSize: "14px", paddingTop: "8px" }}
              />
              <Area
                type="monotone"
                dataKey="formsCreated"
                name="Forms Created"
                stackId="1"
                stroke="#c084fc"
                fill="url(#formsGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="responsesReceived"
                name="Responses Received"
                stackId="2"
                stroke="#818cf8"
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
