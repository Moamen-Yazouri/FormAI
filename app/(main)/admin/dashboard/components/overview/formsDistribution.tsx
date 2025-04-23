import { IFormResponseData } from '@/@types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import React from 'react'
import { ResponsiveContainer, Pie, Cell, PieChart } from 'recharts'
import { COLORS } from '../../constants/constants'
import { ChartTooltip } from '@/components/ui/chart'
interface IProps {
    formResponsesData: IFormResponseData[];
}
const FormsDistribution = (props: IProps) => {
    const {formResponsesData} = props;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Form Responses Distribution</CardTitle>
                <CardDescription>Top forms by number of responses</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={formResponsesData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={
                                    ({name, percent}) => `${name}: ${
                                        (percent * 100).toFixed(0)
                                    }%`
                            }>
                                {
                                formResponsesData.map((entry, index) => (
                                    <Cell key={
                                            `cell-${index}`
                                        }
                                        fill={
                                            COLORS[index % COLORS.length]
                                        }/>
                                ))
                            } </Pie>
                            <ChartTooltip/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default FormsDistribution