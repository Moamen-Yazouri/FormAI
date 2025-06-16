"use client"
import type { IFormTable } from "@/@types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Calendar, FileText, MoreVertical } from "lucide-react";
import { useContext, useState } from "react";
import DeleteDialog from "../deleteDialog/deleteDialog";
import ActionsProvider from "@/components/form-actions-provider/ActionsProvider";
import { toast } from "sonner";
import SearchBar from "../text-search-bar/searchBar";
import { useFilter } from "./hook/useFilter";
import Link from "next/link";
import { deleteForm } from "./actions/form.action";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/providers/auth/authProvider";
import TablesLoader from "../tables-loader/tablesLoader";
import clsx from "clsx";

interface IProps {
    forms: IFormTable[]
    isSummary?: boolean
    available?: boolean
}

const FormsTable = (props: IProps) => {
    const { forms, isSummary } = props;
    const {user, isLoading} = useContext(AuthContext);
    const [deleting, setDeleting] = useState<boolean>(false)
    const [formToDelete, setFormToDelete] = useState<string | null>(null)
    const { 
        setSearchTerm, 
        searchTerm, 
        filteredForms, 
        handleDelete 
    } = useFilter(forms)
    const pathname = usePathname();
    const isAvailable = pathname.includes("available-forms");

    const handleFormDelete = async (formId: string) => {
        const deletedForm = await deleteForm(formId);
        setDeleting(false);
        if (deletedForm) {
            toast.success(`Form: ${deletedForm.title}, deleted successfully`);

            setTimeout(() => {
                handleDelete(formId);
            }, 500);

        } else {
            toast.error("Failed to delete the form!")
        }

        setFormToDelete(null)   
    }
    if(isLoading || deleting) return <TablesLoader itemName={"Forms"} action="Loading"/>
    if(!user) return null; 
    return (
        <div className="rounded-lg border border-cyan-500/30 bg-gradient-to-br from-blue-900/40 via-indigo-800/30 to-cyan-600/40 backdrop-blur-md shadow-2xl w-full m-2 ring-1 ring-cyan-500/20">
        <SearchBar placeholder="Search Forms..." search={searchTerm} setSearch={setSearchTerm} />
        <Table>
            <TableHeader>
            <TableRow className="border-b border-cyan-500/20 hover:bg-blue-800/10">
                <TableHead className="text-cyan-300 font-semibold">Form Name</TableHead>
                <TableHead className="text-cyan-300 font-semibold">Creator</TableHead>
                {
                    user.role === "admin" && props.available && (
                        <TableHead className="text-cyan-300 font-semibold">Responses</TableHead>
                    )
                }
                <TableHead className="text-cyan-300 font-semibold">Created Date</TableHead>
                <TableHead className="text-cyan-300 font-semibold">Deadline</TableHead>
                <TableHead className="text-cyan-300 font-semibold text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {
                filteredForms.length > 0 ? (
                    filteredForms.map((form) => (
                <TableRow
                key={form.id}
                className={clsx("border-b border-cyan-500/10 hover:bg-gradient-to-r from-blue-800/20 via-indigo-700/15 to-cyan-600/20 transition-colors",
                    formToDelete === form.id && "bg-red-900/30"
                )}
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
                {
                    user.role === "admin" && props.available && (                        
                        <TableCell>
                            <Badge
                            variant="secondary"
                            className=" bg-gradient-to-r from-blue-500/70 to-cyan-400/70 text-white border-cyan-500/50 shadow-sm"
                            >
                            {form.responses}
                            </Badge>
                        </TableCell>
                    )
                }
                <TableCell className="text-slate-400">{String(form.createdAt)}</TableCell>
                <TableCell className="text-cyan-300 font-medium">
                    <div className="inline-flex items-center justify-center gap-1 bg-cyan-800/30 px-2 py-1 rounded-md border border-cyan-500/30 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {form.deadline}
                    </div>
                </TableCell>

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
                        {
                            user.role === "creator" && form.creator === user.name  ? (
                                <ActionsProvider id={form.id} actionsRights="creator"/>
                            ) : (
                                user.role === "admin" ? (
                                    <ActionsProvider id={form.id} actionsRights="admin"/>
                                ) : (
                                    <ActionsProvider id={form.id} actionsRights="user"/>
                                )
                            )
                        }
                    {
                        !isAvailable && user.role !== "user" && ( 
                        <>
                            <DropdownMenuSeparator className="bg-cyan-500/20" />

                        
                                                    
                                <DeleteDialog
                                    itemToDelete={formToDelete}
                                    item={form}
                                    data={forms}
                                    setItemToDelete={setFormToDelete}
                                    itemsType="Form"
                                    handleDeleteItem={handleFormDelete}
                                />  
                            </>
                        )                    
                    }
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                )
                )
            )
            :   (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-slate-300">
                            No Forms found.
                        </TableCell>
                    </TableRow>
                )
            }
            </TableBody>
        </Table>
        {
            isSummary && forms.length > 0  &&(
                <div className="flex justify-center p-4">
                <Link href={user.role === "admin" ? `/admin/all-forms` : `/creator/${user.name}/my-forms`}>
                    <Button
                    variant="outline"
                    className="bg-slate-900/30 text-cyan-300 border-cyan-500/30 hover:bg-gradient-to-r hover:from-blue-800/30 hover:to-cyan-700/30 hover:text-white transition-colors flex items-center gap-2"
                    >
                    View All Forms
                    </Button>
                </Link>
                </div>
            )
        }
        </div>
    )
}

export default FormsTable
