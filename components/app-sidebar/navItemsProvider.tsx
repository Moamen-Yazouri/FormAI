import { UserRoles } from '@/@types'
import React from 'react'
import { getNavItems } from './util/getNavItems';
import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface IProps {
    role: UserRoles;
    name: string;
}
const NavItemsProvider = (props: IProps) => {
    console.log(props.name)
    const navItems = getNavItems(props.role, props.name);
    const pathname = usePathname();;
    const isActive = (path : string) => {
        return pathname === path
    }
    return (
        <SidebarContent>
            <SidebarMenu> 
                {
                    navItems.map((item) => (
                        <SidebarMenuItem key={
                            item.href
                        }>
                            <SidebarMenuButton asChild
                                isActive={
                                    isActive(item.href)
                                }
                                tooltip={
                                    item.title
                            }>
                                <Link href={
                                        item.href
                                    }
                                    className="flex items-center">
                                    <item.icon className="h-5 w-5"/>
                                    <span>{
                                        item.title
                                    }</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))
                } 
            </SidebarMenu>
        </SidebarContent>
    )
}

export default NavItemsProvider