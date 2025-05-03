"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
        <Card>
        <CardHeader>
            <CardTitle>Creator Activity</CardTitle>
            <CardDescription>Your daily form creation and response activity</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
            <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                data={creatorActivityData}
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
                <Area
                    type="monotone"
                    dataKey="formsCreated"
                    name="Forms Created"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                />
                <Area
                    type="monotone"
                    dataKey="responsesReceived"
                    name="Responses Received"
                    stackId="2"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                />
                </AreaChart>
            </ResponsiveContainer>
            </div>
        </CardContent>
        </Card>
    )
}

export default CreatorActivityChart
