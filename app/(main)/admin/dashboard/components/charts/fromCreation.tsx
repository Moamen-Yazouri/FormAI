import { IDashboardForm } from '@/@types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ChartTooltip, ResponsiveContainer } from '@/components/ui/chart'
import React from 'react'
import { Line, LineChart, XAxis, YAxis } from 'recharts'
interface IProps {
    formCreationData: IDashboardForm[]
}
const FromCreation = (props: IProps) => {
    return (
        <Card>
        <CardHeader>
                <CardTitle>Form Creation Trend</CardTitle>
                <CardDescription>Monthly form creation activity</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={props.formCreationData}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <ChartTooltip/>
                            <Line type="monotone" dataKey="forms" name="Forms Created" stroke="#8b5cf6"
                                strokeWidth={2}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

    )
}

export default FromCreation