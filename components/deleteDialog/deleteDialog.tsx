"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { AlertCircle, Trash2 } from "lucide-react"

interface ISharedProps {
    id: string
    name?: string
    email?: string
    creator?: string
}

interface IProps<T extends ISharedProps> {
    itemsType: string
    item: T
    data: T[]
    itemToDelete: string | null
    setItemToDelete: (value: React.SetStateAction<string | null>) => void
    handleDeleteItem: (id: string) => void
}

const DeleteDialog = <T extends ISharedProps>({
    itemsType,
    item,
    data,
    itemToDelete,
    setItemToDelete,
    handleDeleteItem,
    }: IProps<T>) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const itemData = data.find((u) => u.id === itemToDelete)

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
            <DropdownMenuItem
            className="flex items-center gap-2 text-red-400 hover:!text-white hover:bg-red-700/30 focus:bg-red-800/40 cursor-pointer transition"
            onSelect={(e) => {
                e.preventDefault()
                setItemToDelete(item.id)
                setIsDialogOpen(true)
            }}
            >
            <Trash2 className="h-4 w-4" />
            {`Delete ${itemsType}`}
            </DropdownMenuItem>
        </DialogTrigger>

        <DialogContent className="bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 backdrop-blur-sm border border-red-500/20 shadow-2xl ring-1 ring-red-500/10">
            <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
                {`Delete ${itemsType}`}
            </DialogTitle>
            <DialogDescription className="text-slate-200">
                Are you sure you want to delete this {itemsType}? This action cannot be undone.
            </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-3 py-4">
            <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/30 p-2 rounded-full backdrop-blur-sm">
                <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div>
                <p className="font-semibold text-slate-100">{itemData?.name}</p>
                {itemData?.email && <p className="text-sm text-slate-400">{itemData.email}</p>}
                {itemData?.creator && <p className="text-sm text-slate-400">{itemData.creator}</p>}
            </div>
            </div>

            <DialogFooter>
            <Button
                variant="ghost"
                className="text-slate-300 hover:text-cyan-200 hover:bg-cyan-900/20 transition"
                onClick={() => {
                setIsDialogOpen(false)
                setItemToDelete(null)
                }}
            >
                Cancel
            </Button>
            <Button
                variant="destructive"
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                onClick={() => {
                handleDeleteItem(itemToDelete!)
                setIsDialogOpen(false)
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
