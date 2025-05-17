"use client" 
import { IFormTable} from '@/@types'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {FileText, MoreVertical, Eye, MessageSquare} from 'lucide-react'
import React, {useState} from 'react'
import DeleteDialog from '../deleteDialog/deleteDialog'
import ActionsProvider from '@/components/form-actions-provider/ActionsProvider'

interface IProps {
    filteredForms: IFormTable[];
}

const FormsTable = (props : IProps) => {
    const [formToDelete, setFormToDelete] = useState<string | null>(null);

    const handelFormDelete = (form : string) => {
        setFormToDelete(null);
    }

    return (
        <div className="rounded-md border">
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
                    {props.filteredForms.map((form) => (
                        <TableRow key={form.id}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-purple-600"/>
                                    <span className="font-medium">{form.name }</span>
                                </div>
                            </TableCell>
                            <TableCell>{form.creator}</TableCell>
                            {"responses" in form && (
                                <TableCell>
                                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                                        {form.responses}
                                    </Badge>
                                </TableCell>
                            )}
                            <TableCell>{String(form.createdAt)}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4"/>
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <ActionsProvider role='admin' id={form.id}/>
                                        <DropdownMenuSeparator/>
                                        <DeleteDialog 
                                            itemToDelete={formToDelete}
                                            item={form}
                                            data={props.filteredForms}
                                            setItemToDelete={setFormToDelete}
                                            itemsType="Form"
                                            handleDeleteItem={handelFormDelete}
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

export default FormsTable