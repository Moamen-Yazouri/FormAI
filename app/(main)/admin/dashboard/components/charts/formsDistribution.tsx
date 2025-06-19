"use client"

import React from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { IFormResponseData } from "@/@types";

const CHART_COLORS = [
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#38bdf8",
  "#67e8f9",
  "#93c5fd",
]


type ExtendedLabelProps = {
  cx?: number
  cy?: number
  midAngle?: number
  outerRadius?: number
  percent?: number
  index?: number
  payload?: IFormResponseData
}

const CustomLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  outerRadius = 80,
  percent = 0,
  index = 0,
  payload,
}: ExtendedLabelProps) => {
  if (percent === 0) return null

  const name = payload?.name ?? ""
  const RADIAN = Math.PI / 180
  const radius = outerRadius + 20
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  const yOffset = index % 2 === 0 ? -10 : 10

  return (
    <text
      x={x}
      y={y + yOffset}
      fill="#67e8f9"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: "12px", pointerEvents: "none" }}
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  )
}


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
                dataKey="value"
                labelLine={false}
                isAnimationActive={true}
                label={CustomLabel}
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
