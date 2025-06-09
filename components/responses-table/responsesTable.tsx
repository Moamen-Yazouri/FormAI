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
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Download, Mail } from "lucide-react"
import Link from "next/link"
import { useContext, useState } from "react"
import DeleteDialog from "@/components/deleteDialog/deleteDialog"
import { toast } from "sonner"
import { useFilter } from "./hook/useFilter"
import { UserRoles } from "@/@types"
import { ICreatorResponses } from "@/app/(main)/creator/[name]/dashboard/types"
import SearchBar from "../text-search-bar/searchBar"
import { AuthContext } from "@/providers/auth/authProvider"
import TablesLoader from "../tables-loader/tablesLoader"
import { deleteResponse } from "./service/deleteResponse.service"
import clsx from "clsx"

interface IProps {
    responses: ICreatorResponses[]
    isSummary?: boolean
}

const ResponsesTable = ({ responses, isSummary }: IProps) => {
    const [responseToDelete, setResponseToDelete] = useState<string | null>(null);
    const { searchTerm, setSearchTerm, filteredResponses, handleDelete } = useFilter(responses);
    const [deleting, setDeleting] = useState<boolean>(false);
    const {user, isLoading} = useContext(AuthContext);
        const handleCopy = async (response: ICreatorResponses) => {  
        try {
            await navigator.clipboard.writeText(JSON.stringify([response], null, 2))
            toast.success("Response copied to clipboard!")
        } catch (err) {
            toast.error("Failed to copy response to clipboard!")
        }
    }
    const handleDeleteResponse = async (id: string) => {
        setDeleting(true);
        const deletedResponse = await deleteResponse(id);
        setDeleting(false);
        if (deletedResponse) {
            toast.success("Response deleted successfully!");
            setTimeout(() => {
                setResponseToDelete(null);
                handleDelete(id);
            }, 1000);
        } else {
            toast.error("Failed to delete response!")
            setResponseToDelete(null);
        }
        
    }
    if(isLoading || deleting) {
        return <TablesLoader itemName={"Response"}/>
    }
    if(!user) {
        return null;
    }
    return (
        <div className="rounded-lg border border-cyan-500/30 bg-gradient-to-br from-blue-900/40 via-indigo-800/30 to-cyan-600/40 backdrop-blur-md shadow-2xl w-full m-2 ring-1 ring-cyan-500/20">
        <SearchBar placeholder="Search A Response..." search={searchTerm} setSearch={setSearchTerm} />
        <Table>
            <TableHeader>
            <TableRow className="border-b border-cyan-500/20 hover:bg-blue-800/10">
                <TableHead className="text-cyan-300 font-semibold">Form</TableHead>
                <TableHead className="text-cyan-300 font-semibold">Respondent</TableHead>
                <TableHead className="text-cyan-300 font-semibold">Email</TableHead>
                <TableHead className="text-cyan-300 font-semibold">Submitted</TableHead>
                <TableHead className="text-cyan-300 font-semibold text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {filteredResponses.length === 0 ? (
                <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-slate-300">
                    No responses found.
                </TableCell>
                </TableRow>
            ) : (
                filteredResponses.map((response) => (
                <TableRow
                    key={response.id}
                    className={
                        clsx(
                            "border-b border-cyan-500/10 hover:bg-gradient-to-r from-blue-800/20 via-indigo-700/15 to-cyan-600/20 transition-colors",
                            responseToDelete === response.id && "bg-red-500/30"
                        )
                    }
                >
                    <TableCell className="font-medium text-slate-100">{response.formTitle}</TableCell>
                    <TableCell className="text-slate-100">{response.respondentName}</TableCell>
                    <TableCell className="text-slate-100">{response.respondentEmail}</TableCell>
                    <TableCell className="text-slate-400">
                    {new Date(response.date).toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-cyan-300 hover:bg-blue-800/30 transition"
                        >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                        align="end"
                        className="bg-gradient-to-br from-blue-900/90 via-indigo-800/85 to-cyan-700/80 backdrop-blur-md shadow-xl"
                        >
                        <DropdownMenuLabel className="text-blue-300">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-cyan-500/20" />

                        <DropdownMenuItem className="text-slate-200 hover:bg-cyan-800/40 transition">
                            <Eye className="mr-2 h-4 w-4 text-cyan-400" />
                            <Link href={`/review-response/${response.id}`}>View Details</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem 
                            className="text-slate-200 hover:bg-cyan-800/40 transition"
                            onClick={ () => handleCopy(response)}
                        >
                            <Download className="mr-2 h-4 w-4 text-cyan-400" />
                            <span>Copy</span>
                        </DropdownMenuItem>
                        <a href={`mailto:${response.respondentEmail}`}>
                            <DropdownMenuItem className="text-slate-200 hover:bg-cyan-800/40 transition">
                                <Mail className="mr-2 h-4 w-4 text-cyan-400" />
                                <span>Contact Respondent</span>
                            </DropdownMenuItem>
                        </a>

                        <DropdownMenuSeparator className="bg-cyan-500/20" />

                        <DeleteDialog
                            itemToDelete={responseToDelete}
                            item={response}
                            data={responses}
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

        {isSummary && (
            <div className="flex justify-center p-4">
            <Link href={`/${user.role || "creator"}/${user.name}/all-responses`}>
                <Button
                variant="outline"
                className="text-cyan-400 border-cyan-400/40 hover:bg-gradient-to-r hover:from-blue-700/20 hover:to-cyan-600/20 transition"
                >
                View All Responses
                </Button>
            </Link>
            </div>
        )}
        </div>
    )
}

export default ResponsesTable
