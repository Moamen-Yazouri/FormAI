"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Download, Mail, Trash } from 'lucide-react'
import { ICreatorResponses } from "../types"
import Link from "next/link"
import { useState } from "react"
import DeleteDialog from "@/components/deleteDialog/deleteDialog"


interface IProps {
    filteredResponses: ICreatorResponses[]
}

const ResponsesTable = ({ filteredResponses }: IProps) => {
    const [responseToDelete, setResponseToDelete] = useState<string | null>(null);
    const handleDeleteResponse = (id: string) => {
        console.log("deleting response", id)
    }
    return (
        <div className="rounded-md border">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Form</TableHead>
                <TableHead>Respondent</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {filteredResponses.length === 0 ? (
                <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                    No responses found.
                </TableCell>
                </TableRow>
            ) : (
                filteredResponses.map((response) => (
                <TableRow key={response.id}>
                    <TableCell className="font-medium">{response.formTitle}</TableCell>
                    <TableCell>{response.respondentName}</TableCell>
                    <TableCell>{response.respondentEmail}</TableCell>
                    <TableCell>{new Date(response.date).toISOString().split("T")[0]}</TableCell>
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
                            <Link href={`/review-response/${response.id}`}>{"View Details"}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Contact Respondent</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DeleteDialog
                            itemToDelete={responseToDelete}
                            item={response}
                            data={filteredResponses}
                            setItemToDelete={setResponseToDelete}
                            itemsType="Response"
                            handleDeleteItem={handleDeleteResponse}
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

export default ResponsesTable
