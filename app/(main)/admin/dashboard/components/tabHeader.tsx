import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import React from 'react'
interface IProps {
    title: string,
    description: string,
}
const TabHeader = (props: IProps) => {
    return (
        <CardHeader>
            <CardTitle>{props.title}</CardTitle>
            <CardDescription>{props.description}</CardDescription>
        </CardHeader>
    )
}

export default TabHeader