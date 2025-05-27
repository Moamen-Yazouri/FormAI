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
                    href: `my-forms/${name}`
                }
            ]
            return navItems;
        }
        case "creator": {
            const navItems = [
                {
                    title: "Dashboard",
                    icon: LayoutDashboard,
                    href: `/creator/${name}/dashboard`,
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
                    title: "Created Forms",
                    icon: Sparkles,
                    href: `/creator/${name}/all-forms`
                },
                {
                    title: "Form Generator",
                    icon: Sparkles,
                    href: "/form-generator"
                },
            ]
            return navItems;
        }
        case "user": {
            const navItems = [
                {
                    title: "Dashboard",
                    icon: LayoutDashboard,
                    href: `/user/${name}/dashboard`,
                }, 
                {
                    title: "Profile",
                    icon: User,
                    href: `/profile/${name}`,
                },
                {
                    title: "Available Forms",
                    icon: FileText,
                    href: `/user/${name}/available-forms`
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