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
            className="flex items-center gap-2 text-red-400 hover:!text-white hover:bg-red-900/30 focus:bg-red-900/40 cursor-pointer transition"
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

        <DialogContent className="bg-gradient-to-br from-blue-900/90 via-indigo-800/85 to-cyan-700/80 backdrop-blur-md border border-red-500/30 shadow-2xl ring-1 ring-red-500/20">
            <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
                {`Delete ${itemsType}`}
            </DialogTitle>
            <DialogDescription className="text-slate-300">
                Are you sure you want to delete this {itemsType}? This action cannot be undone.
            </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-3 py-4">
            <div className="bg-gradient-to-r from-red-600/30 to-red-500/30 border border-red-500/40 p-2 rounded-full backdrop-blur-sm">
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
                variant="outline"
                className="border-cyan-500/40 text-slate-300 hover:bg-blue-800/30 hover:text-cyan-200 hover:border-cyan-400/60 transition-all duration-200"
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
