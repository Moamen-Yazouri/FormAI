import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

import { UserX, AlertCircle, FormInputIcon } from 'lucide-react';
import React, { useState } from 'react'
interface ISharedProps {
    id: string;
    name: string;
    email?: string;
    creator?: string;
}
interface IProps<T extends ISharedProps> {
    itemsType: string;
    item: T;
    data: T[];
    setItemToDelete: (value: React.SetStateAction<string | null>) => void;
    handleDeleteItem: (id: string) => void;
    itemToDelete: string | null;
}
const DeleteDialog = <T extends ISharedProps>(props: IProps<T>) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data, itemsType, setItemToDelete, handleDeleteItem, item, itemToDelete } = props;
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
            <DropdownMenuItem
            className="flex items-center gap-2 text-red-600 focus:text-red-600"
            onSelect={(e) => {
                e.preventDefault()
                setItemToDelete(item.id)
                setIsDialogOpen(true) // ✅ open the dialog manually
            }}
            >
            {
                itemsType === "User" ? <UserX className="h-4 w-4" /> : <FormInputIcon className="h-4 w-4"/>
            }
            {`Delete ${itemsType}`}
            </DropdownMenuItem>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
                {`Are you sure you want to delete this ${itemsType}? This action cannot be undone.`}
            </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-3 py-3">
            <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>

                <p className="font-medium">
                {data.find((u) => u.id === itemToDelete)?.name}
                </p>
                {
                    data.find((u) => u.id === itemToDelete)?.email && (
                        <p className="text-sm text-muted-foreground">
                            {data.find((u) => u.id === itemToDelete)?.email}
                        </p>
                    )
                }
                {
                    data.find((u) => u.id === itemToDelete)?.creator && (
                        <p className="text-sm text-muted-foreground">
                            {data.find((u) => u.id === itemToDelete)?.creator}
                        </p>
                    )
                }
            </div>
            </div>

            <DialogFooter>
            <Button
                variant="outline"
                onClick={() => {
                setIsDialogOpen(false)  // ✅ Close dialog
                setItemToDelete(null)   // Clear selected user
                }}
            >
                Cancel
            </Button>
            <Button
                variant="destructive"
                onClick={() => {
                handleDeleteItem(itemToDelete!)
                setIsDialogOpen(false)  // ✅ Close after deletion
                setItemToDelete(null)
                }}
            >
                Delete
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}

export default DeleteDialog