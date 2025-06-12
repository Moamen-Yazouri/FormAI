import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent 
} from '@/components/ui/card';
import { ChartTooltip } from '@/components/ui/chart';
import { PieChart } from 'lucide-react';
import React from 'react';
import { ResponsiveContainer, Pie, Cell } from 'recharts';

const RolesDistribution = () => {
    const formResponsesData = [
        {
            name: "Contact Form",
            value: 14
        },
        {
            name: "Job Application",
            value: 78
        },
        {
            name: "Customer Survey",
            value: 213
        },
        {
            name: "Event Registration",
            value: 56
        }, {
            name: "Feedback Form",
            value: 92
        },
    ]
    const COLORS = [
        '#8b5cf6',
        '#a78bfa',
        '#c4b5fd',
        '#ddd6fe',
        '#ede9fe'
    ]
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

export default RolesDistribution