"use client";
import {IUserData} from '@/@types';
import {Button} from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

import {Avatar, AvatarFallback} from '@radix-ui/react-avatar';
import {MoreVertical, Eye} from 'lucide-react';
import React, {useState} from 'react'
import {Badge} from '@/components/ui/badge';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';


import {toast} from 'sonner';
import {useRouter} from 'next/navigation';
import DeleteDialog from '@/components/deleteDialog/deleteDialog';

import { getLimitedUsers } from './lib/getLimitedUsers';
import { useFilter } from './hooks/useFilter';
import SearchBar from '../text-search-bar/searchBar';
import { deleteUser } from './actions/user.action';
import Link from 'next/link';

interface IProps {
    users: IUserData[];
    isSummary?: boolean;
}

const UsersTable = (props: IProps) => {
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const {users} = props;
    const router = useRouter();
    const {
        searchTerm,
        setSearchTerm,
        filteredUsers
    } = useFilter(users);
    const handleDeleteUser = async (userId: string) => {
        const deletedUser = await deleteUser(userId);
        if (deletedUser) {
            toast.success(`User: ${deletedUser.email}, deleted successfully`);
        } else {
            toast.error(`failed to delete user`);
        }
    }

    return (
        <div className="rounded-md border w-full m-2">
          <SearchBar
            placeholder="Search Users..."
            search={searchTerm}
            setSearch={setSearchTerm}
          />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Forms</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-purple-200 text-purple-900">
                                            {user.name.split(" ").map((n) => n[0]).join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge 
                                    variant={user.status === "active" ? "default" : "outline"}
                                    className={
                                        user.status === "active" 
                                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                                            : "text-gray-500"
                                    }
                                >
                                    {user.status === "active" ? "Active" : "Inactive"}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className="capitalize text-purple-600 border-purple-200 bg-purple-50">
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell>{user.forms}</TableCell>
                            <TableCell>{user.lastActive}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4"/>
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        {user.role === "creator" && (
                                            <DropdownMenuItem 
                                                className="flex items-center gap-2"
                                                onClick={() => router.push(`/admin/creator-forms/${user.name}`)}
                                            >
                                                <Eye className="h-4 w-4"/>
                                                View Forms
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator/>
                                        <DeleteDialog 
                                            itemToDelete={userToDelete}
                                            item={user}
                                            data={filteredUsers}
                                            setItemToDelete={setUserToDelete}
                                            itemsType="User"
                                            handleDeleteItem={handleDeleteUser}
                                        />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
              {
                props.isSummary && (
                    <div className="flex justify-center p-4">
                        <Link 
                            href= {
                                `/admin/all-users`
                            }
                        >
                        <Button variant="outline" className="text-purple-700 hover:bg-purple-50 hover:text-purple-900 transition">
                            View All Forms
                        </Button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default UsersTable