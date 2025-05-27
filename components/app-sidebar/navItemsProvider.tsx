"use client"
import React, { useContext } from 'react'
import { getNavItems } from './util/getNavItems';
import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthContext } from '@/providers/auth/authProvider';


const NavItemsProvider = () => {
    const {user, isLoading} = useContext(AuthContext);
    const pathname = usePathname();;
    const isActive = (path : string) => {
        return pathname === path
    }

    if(isLoading) return null;
    if(!user) return null;

    const navItems = getNavItems(user.role, user.name);
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