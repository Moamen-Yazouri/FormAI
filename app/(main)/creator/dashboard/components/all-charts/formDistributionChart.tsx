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

const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#d0ed57", "#ffc658"]

const FormsDistribution = ({ formResponsesData }: IProps) => {
  // Take top 5 forms by responses
  const topForms = [...formResponsesData].sort((a, b) => b.responsesCount - a.responsesCount).slice(0, 5)

  // Custom label for the pie chart
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
    index 
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text 
            x={x} 
            y={y} 
            fill="white" 
            textAnchor={x > cx ? 'start' : 'end'} 
            dominantBaseline="central"
            fontSize={12}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
        )
    }

    return (
        <Card>
        <CardHeader>
            <CardTitle>Top Forms Distribution</CardTitle>
            <CardDescription>Distribution of responses across your top forms</CardDescription>
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
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="responsesCount"
                    nameKey="formTitle"
                >
                    {topForms.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value} responses`, props.payload.formTitle]} />
                <Legend />
                </PieChart>
            </ResponsiveContainer>
            </div>
        </CardContent>
        </Card>
    )
}

export default FormsDistribution
