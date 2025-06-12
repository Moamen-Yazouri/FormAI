import React from 'react';
import StateCard from './stateCard';
import { IStateCard } from '@/app/(main)/creator/[name]/dashboard/types';
interface IProps {
    cards: IStateCard[]
}
const AllCards = (props: IProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
                props.cards.map((card, index) => 
                    (
                        <StateCard key={index} {...card}/>
                    )
                )
            }
        </div>
    )
}

export default AllCards