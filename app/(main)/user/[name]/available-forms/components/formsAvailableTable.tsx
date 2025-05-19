"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { FileText, MoreVertical, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { IUserForm } from "@/@types"

interface IProps {
    forms: IUserForm[]
}

const UserFormsTable = ({ forms }: IProps) => {
    const router = useRouter();
    return (
        <div className="rounded-md border border-purple-300 shadow-md w-full bg-purple-50 m-2 overflow-hidden">
            <Table>
                <TableHeader className="bg-purple-100">
                    <TableRow>
                        <TableHead className="text-purple-800 font-semibold">Form Title</TableHead>
                        <TableHead className="text-purple-800 font-semibold">Description</TableHead>
                        <TableHead className="text-purple-800 font-semibold">Creator</TableHead>
                        <TableHead className="text-purple-800 font-semibold">Deadline</TableHead>
                        <TableHead className="text-right text-purple-800 font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {forms.map((form) => (
                        <TableRow 
                            key={form.id} 
                            className="hover:bg-purple-100 transition-colors"
                        >
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-purple-600" />
                                    <span className="font-medium text-purple-700">{form.formTitle}</span>
                                </div>
                            </TableCell>
                            <TableCell className="max-w-xs truncate text-purple-600">
                                {form.description}
                            </TableCell>
                            <TableCell className="text-purple-600">
                                {form.creator}
                            </TableCell>
                            <TableCell className="text-purple-600">
                                {form.deadline || "No deadline"}
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 text-purple-700 hover:bg-purple-200"
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-white border-purple-200">
                                        <DropdownMenuLabel className="text-purple-700">Actions</DropdownMenuLabel>
                                        <DropdownMenuItem
                                            onClick={() => router.push(`/answer-form/${form.id}`)}
                                            className="flex items-center gap-2 cursor-pointer text-purple-700 hover:bg-purple-100"
                                        >
                                            <Send className="h-4 w-4" />
                                            Answer the form
                                        </DropdownMenuItem>
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

export default UserFormsTable;
