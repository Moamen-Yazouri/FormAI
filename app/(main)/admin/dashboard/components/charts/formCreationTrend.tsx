"use client"

import type { IFormCreationData } from "@/@types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Area,
    AreaChart
} from "recharts"

interface IProps {
    formCreationData: IFormCreationData[]
}

const FormCreationTrend = ({ formCreationData }: IProps) => {
    return (
        <Card className="bg-gradient-to-br from-slate-950 via-blue-800/30 to-indigo-700/30 border border-cyan-500/30 shadow-xl backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
            Form Creation Trend
            </CardTitle>
            <CardDescription className="text-slate-400">
            Monthly form creation activity over time
            </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
            <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formCreationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.2)" strokeOpacity={0.3} />
                <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickFormatter={(value) => (value.length > 3 ? value.substring(0, 3) : value)}
                />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12, fill: "#94a3b8" }} />
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
                    formatter={(value: number) => [value, "Forms Created"]}
                    labelFormatter={(label) => `Month: ${label}`}
                />
                <Area
                    type="monotone"
                    dataKey="forms"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fill="url(#formsGradient)"
                    dot={{
                    stroke: "#06b6d4",
                    strokeWidth: 2,
                    fill: "#0f172a",
                    r: 4,
                    }}
                    activeDot={{
                    stroke: "#06b6d4",
                    strokeWidth: 2,
                    fill: "#67e8f9",
                    r: 6,
                    }}
                />
                <defs>
                    <linearGradient id="formsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
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
