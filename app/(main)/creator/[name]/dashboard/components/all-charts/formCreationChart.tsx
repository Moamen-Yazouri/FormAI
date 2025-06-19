"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts"

interface IFormCreationData {
  date: string
  count: number
}

interface IProps {
  formCreationData: IFormCreationData[]
}

const FormCreationTrend = ({ formCreationData }: IProps) => {
  return (
    <Card className="bg-gradient-to-br from-slate-950 via-blue-900/30 to-indigo-800/30 border border-blue-700/30 shadow-xl backdrop-blur-md text-[#93c1ff]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
          Form Creation Trend
        </CardTitle>
        <CardDescription className="text-slate-400">
          Number of forms created over time
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formCreationData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(14, 165, 233, 0.2)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#cbd5e1" }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getDate()}/${date.getMonth() + 1}`
                }}
              />
              <YAxis tick={{ fontSize: 12, fill: "#cbd5e1" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)", 
                  borderColor: "rgba(6, 182, 212, 0.4)",     
                  borderRadius: "0.5rem",
                  backdropFilter: "blur(8px)",
                }}
                labelStyle={{ color: "#67e8f9" }}
                itemStyle={{ color: "#bae6fd" }}
              />
              <Legend wrapperStyle={{ color: "#67e8f9", fontSize: "14px", paddingTop: "8px" }} />
              <Bar
                dataKey="count"
                name="Forms Created"
                fill="#06b6d4" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default FormCreationTrend
