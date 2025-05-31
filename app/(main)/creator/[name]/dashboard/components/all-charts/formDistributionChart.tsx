"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts"

interface IFormResponseData {
  formId: string
  formTitle: string
  responsesCount: number
}

interface IProps {
  formResponsesData: IFormResponseData[]
}

const COLORS = ["#06b6d4", "#3b82f6", "#6366f1", "#0ea5e9", "#2563eb", "#818cf8", "#7dd3fc"]

const FormsDistribution = ({ formResponsesData }: IProps) => {
  const topForms = [...formResponsesData].sort((a, b) => b.responsesCount - a.responsesCount).slice(0, 5)

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percent: number
    index: number
  }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="#e0f2fe"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-slate-950 via-blue-900/30 to-indigo-800/30 border border-blue-700/30 shadow-xl backdrop-blur-md text-[#93c1ff]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
          Top Forms Distribution
        </CardTitle>
        <CardDescription className="text-slate-400">
          Distribution of responses across your top forms
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topForms}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={85}
                dataKey="responsesCount"
                nameKey="formTitle"
              >
                {topForms.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  borderColor: "rgba(6, 182, 212, 0.4)",
                  borderRadius: "0.5rem",
                  backdropFilter: "blur(8px)",
                }}
                labelStyle={{ color: "#67e8f9" }}
                itemStyle={{ color: "#bae6fd" }}
                formatter={(value, name, props) => [`${value} responses`, props.payload.formTitle]}
              />
              <Legend
                wrapperStyle={{
                  color: "#67e8f9",
                  fontSize: "14px",
                  paddingTop: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default FormsDistribution
