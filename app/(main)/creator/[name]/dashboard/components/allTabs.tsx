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
        <TabsList
        className="flex h-full flex-wrap justify-start gap-2 w-full bg-slate-900/60 border border-slate-700/40 rounded-xl p-2"
        >
        {props.tabs.map((tab) => (
            <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-300
                        hover:text-white hover:bg-slate-800/50 hover:scale-[1.03]
                        data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-800 data-[state=active]:via-indigo-700 data-[state=active]:to-cyan-500 
                        data-[state=active]:text-white data-[state=active]:shadow-lg 
                        data-[state=active]:border data-[state=active]:border-cyan-500/30
                        rounded-lg transition-all duration-300 ease-out font-medium active:scale-95"
            >
            <span className="text-base">{tab.icon}</span>
            {tab.label}
            </TabsTrigger>
        ))}
        </TabsList>
    )
}

export default AllTabs
