import { Loader2 } from "lucide-react"

export default function FullPageLoader() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm">
        <Loader2 className="h-20 w-20 animate-spin text-blue-800" />
        <span className="ml-2 text-cyan-500 font-medium">Profile</span>
        </div>
    )
}
