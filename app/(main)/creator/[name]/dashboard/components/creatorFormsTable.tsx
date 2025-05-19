"use client"

import {
        Table, 
        TableBody,
        TableCell,
        TableHead, 
        TableHeader, 
        TableRow 
    } from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Edit, Trash, BarChart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import DeleteDialog from "@/components/deleteDialog/deleteDialog"
import ActionServices from "../services/action.service"
import { toast } from "sonner"


interface IFormData {
    id: string
    title: string
    createdAt: string
    responsesCount: number
}

interface IProps {
    filteredForms: IFormData[]
}

const CreatorFormsTable = ({ filteredForms }: IProps) => {
    const [formToDelete, setFormToDelete] = useState<string | null>(null);

    const handelFormDelete = async (form : string) => {
        const deletedForm = await ActionServices.deleteForm(form);
        if (deletedForm) {
            toast.success("Form deleted successfully!");
        }
        else {
            toast.error("Form deletion failed!");
        }
    }
    return (
        <div className="rounded-md border">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Form Title</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {filteredForms.length === 0 ? (
                <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                    No forms found.
                </TableCell>
                </TableRow>
            ) : (
                filteredForms.map((form) => (
                <TableRow key={form.id}>
                    <TableCell className="font-medium">{form.title}</TableCell>
                    <TableCell>{new Date(form.createdAt).toISOString().split("T")[0]}</TableCell>
                    <TableCell>{form.responsesCount}</TableCell>
                    <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <Link href={`/view-form/${form.id}`}>View Forms</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Regenerate</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DeleteDialog
                            itemToDelete={formToDelete}
                            item={form}
                            data={filteredForms}
                            setItemToDelete={setFormToDelete}
                            itemsType="Form"
                            handleDeleteItem={handelFormDelete}
                        />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))
            )}
            </TableBody>
        </Table>
        </div>
    )
}

export default CreatorFormsTable;
