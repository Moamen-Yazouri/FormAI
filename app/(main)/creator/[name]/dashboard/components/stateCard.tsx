import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react"
import React from "react"

interface IProps {
    stateTitle: string
    stateValue: string | number
    statePercentage: number
    icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

const StateCard = (props: IProps) => {
    const { stateTitle, stateValue, statePercentage, icon } = props
    const isPositive = statePercentage >= 0

    return (
        <Card className="bg-gradient-to-br from-slate-950 via-blue-900 to-indigo-900 border border-cyan-700/30 text-slate-200 shadow-lg backdrop-blur-md">
            <CardContent className="p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-400">{stateTitle}</p>
                        <h3 className="text-2xl font-bold mt-1 text-cyan-300">{stateValue}</h3>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-cyan-700/20 flex items-center justify-center ring-1 ring-cyan-500/40">
                        {icon && React.createElement(icon, { className: "h-5 w-5 text-cyan-400" })}
                    </div>
                </div>

                <div className="flex items-center mt-4">
                    <div className={`flex items-center text-xs ${isPositive ? "text-green-400" : "text-red-400"}`}>
                        {isPositive ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
                        <span>{Math.abs(statePercentage)}%</span>
                    </div>
                    <span className="text-xs text-slate-500 ml-2">from last month</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default StateCard
