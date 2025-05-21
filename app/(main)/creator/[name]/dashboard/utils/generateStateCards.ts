import { BarChart, FileText, Users } from "lucide-react"
import { IStateCard } from "../types"

export const generateStateCards = (totalForms: number, totalResponses: number): IStateCard[] => {
    const stateCards: IStateCard[] = [
        {
            stateTitle: "Total Forms",
            stateValue: totalForms,
            statePercentage: 10,
            icon: FileText,
        },
        {
            stateTitle: "Active Forms",
            stateValue: 8,
            statePercentage: 15,
            icon: BarChart,
        },
        {
            stateTitle: "Total Responses",
            stateValue: totalResponses,
            statePercentage: 12,
            icon: Users,
        },
    ]
    return stateCards
}