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
        <Card>
        <CardHeader>
            <CardTitle>Form Creation Trend</CardTitle>
            <CardDescription>Number of forms created over time</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
            <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                data={formCreationData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    tickFormatter={(value) => {
                    const date = new Date(value)
                    return `${date.getDate()}/${date.getMonth() + 1}`
                    }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Forms Created" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </CardContent>
        </Card>
    )
}

export default FormCreationTrend
