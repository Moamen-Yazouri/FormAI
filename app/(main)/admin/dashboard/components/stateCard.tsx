import { IStateCard } from '@/@types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Users, ArrowUpRight } from 'lucide-react'
import React from 'react'
interface IProps extends IStateCard {} 
const StateCard = (props: IProps) => {
    const {
        stateTitle,
        stateValue,
        statePercentage
    } = props
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stateTitle}</CardTitle>
                <Users className="h-4 w-4 text-purple-600"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-purple-900">
                    {stateValue}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-600 font-medium flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1"/>
                        {`${statePercentage} from last month`}
                    </span>
                </p>
            </CardContent>
        </Card>

    )
}

export default StateCard;