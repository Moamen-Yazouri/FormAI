"use client"

import { IFormResponseData } from '@/@types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ResponsiveContainer, Pie, Cell, PieChart, Tooltip } from 'recharts'
import React from 'react'

// Define consistent dark-themed pastel colors
const CHART_COLORS = [
  "#8b5cf6", // violet-500
  "#6366f1", // indigo-500
  "#a78bfa", // violet-400
  "#818cf8", // indigo-400
  "#c084fc", // violet-300
  "#93c5fd", // blue-300
]

interface IProps {
    formResponsesData: IFormResponseData[]
}

const FormsDistribution = ({ formResponsesData }: IProps) => {
    return (
        <Card className="bg-gradient-to-br from-slate-900/60 via-violet-900/40 to-indigo-900/40 border border-violet-800/30 shadow-xl backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-violet-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Form Responses Distribution
            </CardTitle>
            <CardDescription className="text-slate-400">
            Top forms by number of responses
            </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
            <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                    data={formResponsesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8b5cf6"
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                    {formResponsesData.map((_, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                    backgroundColor: "rgba(30, 27, 75, 0.95)",
                    borderColor: "rgba(139, 92, 246, 0.5)",
                    borderRadius: "8px",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                    }}
                    labelStyle={{ color: "#c4b5fd" }}
                    itemStyle={{ color: "#e0e7ff" }}
                />
                </PieChart>
            </ResponsiveContainer>
            </div>
        </CardContent>
        </Card>
    )
}

export default FormsDistribution
