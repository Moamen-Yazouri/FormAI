import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"

interface IProps {
    tabs: string[]
}

const AllTabs = (props: IProps) => {
    return (
        <TabsList className="bg-gradient-to-r from-slate-800/60 via-violet-900/40 to-indigo-900/40 border border-violet-800/30 backdrop-blur-sm shadow-md">
        {props.tabs.map((tab, index) => (
            <TabsTrigger
            value={tab}
            key={index}
            className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600/70 data-[state=active]:to-indigo-600/70 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-violet-800/30 hover:text-violet-200 transition-all duration-200"
            >
            {tab}
            </TabsTrigger>
        ))}
        </TabsList>
    )
}

export default AllTabs
