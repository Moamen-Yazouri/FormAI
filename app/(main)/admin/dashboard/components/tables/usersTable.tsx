"use client"

import type { IUserData } from "@/@types"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import actionsService from "../../services/actions.service"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import DeleteDialog from "@/components/deleteDialog/deleteDialog"

interface IProps {
  filteredUsers: IUserData[]
}

const UsersTable = ({ filteredUsers }: IProps) => {
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const router = useRouter()

  const handleDeleteUser = async (userId: string) => {
    const deletedUser = await actionsService.deleteUser(userId)
    if (deletedUser) {
      toast.success(`User: ${deletedUser.email}, deleted successfully`)
    } else {
      toast.error(`Failed to delete user`)
    }
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

  return (
    <div className="rounded-lg border border-violet-800/30 bg-gradient-to-br from-slate-900/60 via-violet-900/40 to-indigo-900/40 backdrop-blur-sm shadow-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-violet-800/30">
            {["User", "Status", "Role", "Forms", "Last Active", "Actions"].map((head) => (
              <TableHead key={head} className="text-violet-300 font-semibold">
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              className="border-b border-violet-800/20 hover:bg-violet-900/30 transition-colors duration-150"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 ring-2 ring-violet-600/30">
                    <AvatarFallback className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-200">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Badge
                  variant={user.status === "active" ? "default" : "outline"}
                  className={
                    user.status === "active"
                      ? "bg-gradient-to-r from-emerald-600/80 to-green-600/80 text-white border-emerald-500/50"
                      : "bg-slate-800/50 text-slate-400 border-slate-600/40"
                  }
                >
                  {user.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge className="capitalize text-violet-300 border-violet-600/50 bg-violet-900/30 hover:bg-violet-800/40 hover:text-violet-200 transition-colors duration-200">
                  {user.role}
                </Badge>
              </TableCell>

              <TableCell className="text-slate-300 font-medium">{user.forms}</TableCell>
              <TableCell className="text-slate-400">{user.lastActive}</TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-violet-300 hover:bg-violet-800/30 transition"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-slate-800/95 border-violet-700/50 backdrop-blur-sm shadow-xl"
                  >
                    <DropdownMenuLabel className="text-violet-300">Actions</DropdownMenuLabel>

                    {user.role === "creator" && (
                      <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer text-slate-300 hover:bg-violet-800/40 hover:text-violet-200"
                        onClick={() => router.push(`/admin/creator-forms/${user.name}`)}
                      >
                        <Eye className="h-4 w-4" />
                        View Forms
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator className="bg-violet-700/30" />

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
    </div>
  )
}

export default UsersTable
