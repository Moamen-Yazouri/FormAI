"use client"

import type { IFormCreationData } from "@/@types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from "recharts"

interface IProps {
    formCreationData: IFormCreationData[]
}

const FormCreationTrend = ({ formCreationData }: IProps) => {
    return (
        <Card className="bg-gradient-to-br from-slate-900/60 via-violet-900/40 to-indigo-900/40 border border-violet-800/30 shadow-xl backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-violet-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Form Creation Trend
            </CardTitle>
            <CardDescription className="text-slate-400">Monthly form creation activity over time</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
            <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formCreationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.2)" strokeOpacity={0.3} />
                <XAxis
                    dataKey="name"
                    stroke="#a1a1aa"
                    tick={{ fontSize: 12, fill: "#a1a1aa" }}
                    tickFormatter={(value) => {
                    // Format month names if they're too long
                    return value.length > 3 ? value.substring(0, 3) : value
                    }}
                />
                <YAxis stroke="#a1a1aa" tick={{ fontSize: 12, fill: "#a1a1aa" }} />
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
                    formatter={(value: number) => [value, "Forms Created"]}
                    labelFormatter={(label) => `Month: ${label}`}
                />
                <Area
                    type="monotone"
                    dataKey="forms"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#formsGradient)"
                    dot={{
                    stroke: "#8b5cf6",
                    strokeWidth: 2,
                    fill: "#1e1b4b",
                    r: 4,
                    }}
                    activeDot={{
                    stroke: "#8b5cf6",
                    strokeWidth: 2,
                    fill: "#c4b5fd",
                    r: 6,
                    }}
                />
                <defs>
                    <linearGradient id="formsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                </AreaChart>
            </ResponsiveContainer>
            </div>
        </CardContent>
        </Card>
    )
}

export default FormCreationTrend
