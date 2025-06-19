import { 
    FileText, 
    LayoutDashboard, 
    Users 
} from "lucide-react";

export const CREATOR_TABS = [
    {
        value: "overview",
        label: "Overview",
        icon: <LayoutDashboard className="h-4 w-4"/>
    }, {
        value: "forms",
        label: "My Forms",
        icon: <FileText className="h-4 w-4"/>
    }, {
        value: "responses",
        label: "Responses",
        icon: <Users className="h-4 w-4"/>
    },
]