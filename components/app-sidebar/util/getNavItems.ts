import { UserRoles } from "@/@types";
import { INavItem } from "../types";
import { FileText, LayoutDashboard, MessageCircleMoreIcon, Sparkles, User } from "lucide-react";

export const getNavItems = (role: UserRoles, name: string): INavItem[] => {
    
    switch(role) {
        case "admin": {
            const navItems = [
                {
                    title: "Dashboard",
                    icon: LayoutDashboard,
                    href: "/admin/dashboard",
                }, 
                {
                    title: "Profile",
                    icon: User,
                    href: `/profile/${name}`,
                },
                {
                    title: "Form Generator",
                    icon: Sparkles,
                    href: "/form-generator"
                },
                {
                    title: "My Forms",
                    icon: FileText,
                    href: `/my-forms/${name}`
                },
                {
                    title: "All Forms",
                    icon: FileText,
                    href: "/admin/all-forms"
                },
                {
                    title: "All Users",
                    icon: User,
                    href: "/admin/all-users"
                },
            ]
            return navItems;
        }
        case "creator": {
            const navItems = [
                {
                    title: "Profile",
                    icon: User,
                    href: `/profile/${name}`,
                },
                {
                    title: "Dashboard",
                    icon: LayoutDashboard,
                    href: `/creator/${name}/dashboard`,
                }, 
                {
                    title: "Form Generator",
                    icon: Sparkles,
                    href: "/form-generator"
                },
                {
                    title: "Created Forms",
                    icon: Sparkles,
                    href: `/my-forms/${name}`
                },
                {
                    title: "Received Responses",
                    icon: Sparkles,
                    href: `/creator/${name}/all-responses`
                },
                {
                    title: "Available Forms",
                    icon: FileText,
                    href: `/available-forms/${name}`
                },
            ]
            return navItems;
        }
        case "user": {
            const navItems = [
                {
                    title: "Profile",
                    icon: User,
                    href: `/profile/${name}`,
                },
                {
                    title: "Dashboard",
                    icon: LayoutDashboard,
                    href: `/user/${name}/dashboard`,
                }, 
                {
                    title: "Available Forms",
                    icon: FileText,
                    href: `/available-forms/${name}`
                },
                {
                    title: "My Responses",
                    icon: MessageCircleMoreIcon,
                    href: `/user/${name}/responses-details`
                }
            ]
            return navItems;
        }
        default: return [];
    }
}