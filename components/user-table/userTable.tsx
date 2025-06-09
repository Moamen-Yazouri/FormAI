"use client"

import type { IUserData } from "@/@types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreVertical, Eye } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import DeleteDialog from "@/components/deleteDialog/deleteDialog"
import { useFilter } from "./hooks/useFilter"
import SearchBar from "../text-search-bar/searchBar"
import { deleteUser } from "./actions/user.action"
import Link from "next/link"
import TablesLoader from "../tables-loader/tablesLoader"
import clsx from "clsx"

interface IProps {
  users: IUserData[]
  isSummary?: boolean
}

const UsersTable = (props: IProps) => {
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { users } = props;
  const router = useRouter();
  const [deleteing, setDeleting] = useState<boolean>(false);
  const { searchTerm, setSearchTerm, filteredUsers, handleDelete } = useFilter(users);

  const handleDeleteUser = async (userId: string) => {
    setDeleting(true);
    const deletedUser = await deleteUser(userId);
    setDeleting(false);
    if (deletedUser) {
      toast.success(`User: ${deletedUser.email}, deleted successfully`);
      setTimeout(() => {
        setUserToDelete(null);
        handleDelete(userId);
      }, 1000);
    } else {
      toast.error(`Failed to delete user`);
      setUserToDelete(null);
    }
    
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  if(deleteing) return <TablesLoader itemName="User"/>
  return (
    <div className="rounded-lg border border-cyan-500/30 bg-gradient-to-br from-blue-900/40 via-indigo-800/30 to-cyan-600/40 backdrop-blur-md shadow-2xl w-full m-2 ring-1 ring-cyan-500/20">
      <SearchBar placeholder="Search Users..." search={searchTerm} setSearch={setSearchTerm} />
      <Table>
        <TableHeader>
          <TableRow className="border-b border-cyan-500/20 hover:bg-blue-800/10">
            <TableHead className="text-cyan-300 font-semibold">User</TableHead>
            <TableHead className="text-cyan-300 font-semibold">Status</TableHead>
            <TableHead className="text-cyan-300 font-semibold">Role</TableHead>
            <TableHead className="text-cyan-300 font-semibold">Forms</TableHead>
            <TableHead className="text-cyan-300 font-semibold">Last Active</TableHead>
            <TableHead className="text-cyan-300 font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              className= {
                clsx(
                  "border-b border-cyan-500/10 hover:bg-gradient-to-r from-blue-800/20 via-indigo-700/15 to-cyan-600/20 transition-colors",
                  userToDelete === user.id && "!bg-red-900/30"
                )
              }
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 ring-2 ring-cyan-400/50 shadow-lg">
                      <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-semibold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950 ${
                        user.status === "active"
                          ? "bg-cyan-500"
                          : user.status === "inactive"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-slate-100">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={user.status === "active" ? "default" : "outline"}
                  className={
                    user.status === "active"
                      ? "bg-gradient-to-r from-blue-500/70 to-cyan-400/70 text-white border-cyan-500/50 shadow-sm"
                      : "text-slate-400 border-slate-600/40 bg-slate-800/50"
                  }
                >
                  {user.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="capitalize text-cyan-300 border-cyan-500/40 bg-gradient-to-r from-blue-800/30 to-cyan-600/20 hover:bg-blue-800/40 hover:text-blue-200 transition-colors duration-200"
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="text-slate-100 font-medium">{user.forms}</TableCell>
              <TableCell className="text-slate-400">{user.lastActive}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-cyan-300 hover:bg-blue-800/30 transition"
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-gradient-to-br from-blue-900/90 via-indigo-800/85 to-cyan-700/80 backdrop-blur-md shadow-xl"
                  >
                    <DropdownMenuLabel className="text-blue-300">Actions</DropdownMenuLabel>
                    {user.role === "creator" && (
                      <DropdownMenuItem
                        className="flex items-center gap-2 text-slate-300 hover:bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:text-cyan-200 cursor-pointer"
                        onClick={() => router.push(`/admin/creator-forms/${user.name}`)}
                      >
                        <Eye className="h-4 w-4" />
                        View Forms
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-cyan-500/20" />
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

      {props.isSummary && (
        <div className="flex justify-center p-4">
          <Link href={`/admin/all-users`}>
            <Button
              variant="outline"
              className="text-cyan-400 border-cyan-400/40 hover:bg-gradient-to-r hover:from-blue-700/20 hover:to-cyan-600/20 transition"
            >
              View All Users
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default UsersTable
