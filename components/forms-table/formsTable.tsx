"use client";
import { IFormFromDB, IFormTable, UserRoles } from "@/@types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { FileText, MoreVertical } from "lucide-react";
import React, { useState } from "react";
import DeleteDialog from "../deleteDialog/deleteDialog";
import ActionsProvider from "@/components/form-actions-provider/ActionsProvider";
import { toast } from "sonner";
import SearchBar from "../text-search-bar/searchBar";
import { useFilter } from "./hook/useFilter";
import Link from "next/link";
import { deleteForm } from "./actions/form.action";



interface IProps {
    forms: IFormTable[];
    role: UserRoles;
    name: string;
    isSummary?: boolean;
}

const FormsTable = (props: IProps) => {
    const { forms, role, name, isSummary } = props;
    const [formToDelete, setFormToDelete] = useState<string | null>(null);
    const { setSearchTerm, searchTerm, filteredForms } = useFilter(forms);

    const handleFormDelete = async (formId: string) => {
        const deletedForm = await deleteForm(formId);
        if (deletedForm) {
            toast.success(`Form: ${deletedForm.title}, deleted successfully`);
        }
        else {
            toast.error("Failed to delete the form!");
        }
    };

    return (
        <div className="rounded-md border">
        <SearchBar
            placeholder="Search Forms..."
            search={searchTerm}
            setSearch={setSearchTerm}
        />
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Form Name</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {filteredForms.map((form) => (
                <TableRow key={form.id}>
                <TableCell>
                    <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">{form.name}</span>
                    </div>
                </TableCell>

                <TableCell>{form.creator}</TableCell>

                <TableCell>
                    <div className="flex items-center gap-2">
                    <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-800 hover:bg-purple-100"
                    >
                        {form.responses}
                    </Badge>

                    </div>
                </TableCell>

                <TableCell>{String(form.createdAt)}</TableCell>

                <TableCell className="text-right">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <ActionsProvider role={role} id={form.id} />

                        <DropdownMenuSeparator />

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
            {
                isSummary && (
                    <div className="flex justify-center p-4">
                        <Link 
                            href= {
                                role === "admin"
                                ? `/${name}/all-forms`
                                : `/creator/${name}/my-forms`
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
    );
};

export default FormsTable;
