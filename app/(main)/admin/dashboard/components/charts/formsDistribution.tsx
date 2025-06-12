"use client"

import { IFormResponseData } from '@/@types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ResponsiveContainer, Pie, Cell, PieChart, Tooltip } from 'recharts'
import React from 'react'


const CHART_COLORS = [
  "#06b6d4", 
  "#0ea5e9", 
  "#3b82f6", 
  "#38bdf8", 
  "#67e8f9", 
  "#93c5fd", 
]

interface IProps {
  formResponsesData: IFormResponseData[]
}

const FormsDistribution = ({ formResponsesData }: IProps) => {
  return (
    <Card className="bg-gradient-to-br from-slate-950 via-blue-800/30 to-indigo-700/30 border border-cyan-500/30 shadow-xl backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
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
                fill="#06b6d4"
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
                  backgroundColor: "rgba(15, 23, 42, 0.95)", 
                  borderColor: "rgba(6, 182, 212, 0.5)", 
                  borderRadius: "8px",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                }}
                labelStyle={{ color: "#67e8f9" }} 
                itemStyle={{ color: "#bae6fd" }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default FormsDistribution
