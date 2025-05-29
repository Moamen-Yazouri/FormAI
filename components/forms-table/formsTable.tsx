"use client"

import type { IFormTable, UserRoles } from "@/@types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { FileText, MoreVertical } from "lucide-react"
import { useState } from "react"
import DeleteDialog from "../deleteDialog/deleteDialog"
import ActionsProvider from "@/components/form-actions-provider/ActionsProvider"
import { toast } from "sonner"
import SearchBar from "../text-search-bar/searchBar"
import { useFilter } from "./hook/useFilter"
import Link from "next/link"
import { deleteForm } from "./actions/form.action"

interface IProps {
  forms: IFormTable[]
  role: UserRoles
  name: string
  isSummary?: boolean
}

const FormsTable = (props: IProps) => {
    const { forms, role, name, isSummary } = props
    const [formToDelete, setFormToDelete] = useState<string | null>(null)
    const { setSearchTerm, searchTerm, filteredForms } = useFilter(forms)

    const handleFormDelete = async (formId: string) => {
        const deletedForm = await deleteForm(formId)
        if (deletedForm) {
        toast.success(`Form: ${deletedForm.title}, deleted successfully`)
        } else {
        toast.error("Failed to delete the form!")
        }
    }

    return (
        <div className="rounded-lg border border-cyan-500/30 bg-gradient-to-br from-blue-900/40 via-indigo-800/30 to-cyan-600/40 backdrop-blur-md shadow-2xl w-full m-2 ring-1 ring-cyan-500/20">
        <SearchBar placeholder="Search Forms..." search={searchTerm} setSearch={setSearchTerm} />
        <Table>
            <TableHeader>
            <TableRow className="border-b border-cyan-500/20 hover:bg-blue-800/10">
                <TableHead className="text-cyan-300 font-semibold">Form Name</TableHead>
                <TableHead className="text-cyan-300 font-semibold">Creator</TableHead>
                <TableHead className="text-cyan-300 font-semibold">Responses</TableHead>
                <TableHead className="text-cyan-300 font-semibold">Created Date</TableHead>
                <TableHead className="text-cyan-300 font-semibold text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {filteredForms.map((form) => (
                <TableRow
                key={form.id}
                className="border-b border-cyan-500/10 hover:bg-gradient-to-r from-blue-800/20 via-indigo-700/15 to-cyan-600/20 transition-colors"
                >
                <TableCell>
                    <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                        <FileText className="h-4 w-4 text-cyan-400" />
                    </div>
                    <span className="font-medium text-slate-100">{form.name}</span>
                    </div>
                </TableCell>

                <TableCell className="text-slate-100">{form.creator}</TableCell>

                <TableCell>
                    <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-blue-500/70 to-cyan-400/70 text-white border-cyan-500/50 shadow-sm"
                    >
                    {form.responses}
                    </Badge>
                </TableCell>

                <TableCell className="text-slate-400">{String(form.createdAt)}</TableCell>

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

                        <ActionsProvider id={form.id} />

                        <DropdownMenuSeparator className="bg-cyan-500/20" />

                        <DeleteDialog
                        itemToDelete={formToDelete}
                        item={form}
                        data={forms}
                        setItemToDelete={setFormToDelete}
                        itemsType="Form"
                        handleDeleteItem={handleFormDelete}
                        />
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        {isSummary && (
            <div className="flex justify-center p-4">
            <Link href={role === "admin" ? `/${name}/all-forms` : `/creator/${name}/my-forms`}>
                <Button
                variant="outline"
                className="text-cyan-400 border-cyan-400/40 hover:bg-gradient-to-r hover:from-blue-700/20 hover:to-cyan-600/20 transition"
                >
                View All Forms
                </Button>
            </Link>
            </div>
        )}
        </div>
    )
}

export default FormsTable
