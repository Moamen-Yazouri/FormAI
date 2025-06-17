import { IContextUser } from '@/@types'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { AuthContext } from '@/providers/auth/authProvider'
import { AlertCircle } from 'lucide-react'
import React, { Dispatch, SetStateAction, useContext } from 'react'

interface IProps {
    submit: () => Promise<any>;
    values: Partial<IContextUser>;
    dialogState: boolean;
    closeDialog: Dispatch<SetStateAction<boolean>>;
}

const ConfirmationDialog = (props: IProps) => {
    const { values, submit, dialogState, closeDialog } = props
    const { user } = useContext(AuthContext)

    if (!user) return null

    const handleConfirmSubmit = async () => {
        await submit()
        closeDialog(false)
    }

    return (
        <Dialog open={dialogState} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-lg bg-gradient-to-br from-blue-950 via-indigo-950 to-cyan-900 border border-cyan-700/20 shadow-2xl backdrop-blur-md text-slate-200">
            <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-cyan-300">
                <AlertCircle className="h-5 w-5 text-cyan-400" />
                Confirm Changes
            </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 mt-2">
            {Object.keys(values).map((key, index) => {
                const fitKey = key as keyof IContextUser
                if (user[fitKey] === values[fitKey]) return null

                return (
                <div className="flex flex-col gap-1" key={index}>
                    <p className="text-sm font-semibold text-cyan-200">{`${key.toUpperCase()}`}</p>
                    <div className="flex items-center gap-2 text-sm">
                    <span className="line-through text-slate-500">{user[fitKey]}</span>
                    <span className="text-cyan-500 font-bold">→</span>
                    <span className="text-cyan-300 font-medium">{values[fitKey]}</span>
                    </div>
                </div>
                )
            })}
            </div>

            <DialogFooter className="sm:justify-end mt-6">
            <Button
                type="button"
                variant="outline"
                onClick={() => closeDialog(false)}
                className="bg-slate-900/30 text-slate-300 border border-slate-600/30 hover:bg-slate-800/40 hover:text-slate-100 transition-colors"
            >
                Cancel
            </Button>
            <Button
                type="button"
                onClick={handleConfirmSubmit}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
                Confirm Changes
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}

export default ConfirmationDialog
