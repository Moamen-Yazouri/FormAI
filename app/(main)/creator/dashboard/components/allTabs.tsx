import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ReactNode } from "react"

interface ITab {
    value: string
    label: string
    icon?: ReactNode
}

interface IProps {
    tabs: ITab[]
}   

const AllTabs = (props: IProps) => {
    return (
        <TabsList className="grid w-full grid-cols-3 h-auto">
        {props.tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2 py-3">
            {tab.icon}
            {tab.label}
            </TabsTrigger>
        ))}
        </TabsList>
    )
}

export default AllTabs
