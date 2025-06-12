import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface IProps {
    tabs: string[]
}

const AllTabs = (props: IProps) => {
    return (
        <TabsList className="bg-gradient-to-r from-slate-900/60 via-blue-800/30 to-indigo-700/30 border border-cyan-500/30 shadow-md">
        {props.tabs.map((tab, index) => (
            <TabsTrigger
            value={tab}
            key={index}
            className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600/70 data-[state=active]:to-indigo-600/70 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-blue-800/30 hover:text-cyan-300 transition-all duration-200"
            >
            {tab}
            </TabsTrigger>
        ))}
        </TabsList>
    )
}

export default AllTabs
