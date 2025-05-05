"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Download, Mail } from 'lucide-react'

interface IResponseData {
    id: string
    formTitle: string
    respondentName: string
    respondentEmail: string
    submittedAt: string
    status: "complete" | "partial"
}

interface IProps {
    filteredResponses: IResponseData[]
}

const ResponsesTable = ({ filteredResponses }: IProps) => {
    return (
        <div className="rounded-md border">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Form</TableHead>
                <TableHead>Respondent</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
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
                    <TableCell>{new Date(response.submittedAt).toISOString().split("T")[0]}</TableCell>
                    <TableCell>
                    <Badge variant={response.status === "complete" ? "default" : "outline"}>
                        {response.status.charAt(0).toUpperCase() + response.status.slice(1)}
                    </Badge>
                    </TableCell>
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
                            <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Contact Respondent</span>
                        </DropdownMenuItem>
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
