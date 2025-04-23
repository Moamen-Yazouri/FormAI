import { TabsList, TabsTrigger } from '@/components/ui/tabs';

import React from 'react'
interface IProps {
    tabs: string[];
}
const AllTabs = (props: IProps) => {
    return (
            <TabsList className="bg-white border border-purple-100">
                {
                    props.tabs.map((tab, index) => {
                        return (
                            <TabsTrigger
                                value={tab} 
                                key={index} 
                                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900"
                            >
                                {tab}
                            </TabsTrigger>
                        )
                    })
                }
            </TabsList>
    )
}

export default AllTabs