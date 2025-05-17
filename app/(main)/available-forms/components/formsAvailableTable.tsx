"use client" 
import { IFormTable, IUserForm} from '@/@types'
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
import ActionsProvider from '@/components/form-actions-provider/ActionsProvider'
import DeleteDialog from '@/components/deleteDialog/deleteDialog'

interface IProps {
    filteredForms: IUserForm[];
}

const AvailableTable = (props : IProps) => {

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Form Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Creator</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.filteredForms.map((form) => (
                        <TableRow key={form.id}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-purple-600"/>
                                    <span className="font-medium">{form.formTitle }</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{form.description }</span>
                                </div>
                            </TableCell>
                            <TableCell>{form.creator}</TableCell>
                            
                            <TableCell>{String(form.deadline) || "No deadline"}</TableCell>
                                
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
                                        <ActionsProvider role='user' id={form.id}/>
                                        <DropdownMenuSeparator/>
                                        <DeleteDialog 
                                            itemToDelete={""}
                                            item={form}
                                            data={props.filteredForms}
                                            setItemToDelete={() => { }}
                                            itemsType="Form"
                                            handleDeleteItem={() => {}}
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

export default AvailableTable;