import { Loader2 } from "lucide-react";
interface IProps {
    itemName: string;
    action?: string
}
export default function TablesLoader(props: IProps) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm">
            <Loader2 className="h-20 w-20 animate-spin text-blue-800" />
            <span className="ml-2 text-cyan-500 font-medium">{`${props.action ? props.action : "Deleting"} ${props.itemName}`}</span>
        </div>
    )
}
