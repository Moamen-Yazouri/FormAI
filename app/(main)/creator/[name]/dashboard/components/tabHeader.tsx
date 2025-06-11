import { 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

interface IProps {
    title: string
    description: string
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
