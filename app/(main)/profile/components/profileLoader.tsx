import { Loader2 } from "lucide-react";

export default function FullPageLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <span className="ml-2 text-purple-700 font-medium">Updating...</span>
        </div>
    );
}
