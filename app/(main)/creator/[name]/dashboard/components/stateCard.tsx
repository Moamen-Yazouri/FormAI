import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import type { ReactNode } from "react"

interface IProps {
    stateTitle: string
    stateValue: string | number
    statePercentage: number
    icon?: ReactNode
}

const StateCard = (props: IProps) => {
    const { stateTitle, stateValue, statePercentage, icon } = props
    const isPositive = statePercentage >= 0

    return (
        <Card className="overflow-hidden">
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground">{stateTitle}</p>
                <h3 className="text-2xl font-bold mt-1">{stateValue}</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">{icon}</div>
            </div>

            <div className="flex items-center mt-4">
            <div className={`flex items-center text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
                <span>{Math.abs(statePercentage)}%</span>
            </div>
            <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
        </CardContent>
        </Card>
    )
}

export default StateCard
