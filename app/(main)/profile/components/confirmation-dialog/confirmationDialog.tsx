import { IContextUser } from '@/@types'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AuthContext } from '@/providers/auth/authProvider'
import { AlertCircle } from 'lucide-react'
import React, { Dispatch, SetStateAction, use, useEffect, useState } from 'react'
interface IProps {
    submit: () => Promise<any>;
    values: Partial<IContextUser>;
    dialogState: boolean;
    closeDialog:  Dispatch<SetStateAction<boolean>>;
}
const ConfirmationDialog = (props: IProps) => {
    const {values, submit, dialogState, closeDialog} = props;
    const {user} = use(AuthContext);
    if(!user) return null;

    

    const handleConfirmSubmit = async() => {
        await submit();
        closeDialog(false);
    }
    return (
        <Dialog open={dialogState} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-purple-900">
                <AlertCircle className="h-5 w-5 text-purple-600" />
                Confirm Changes
                </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
                {
                    Object.keys(values).map((key, index) => {
                        const fitKey = key as keyof IContextUser;

                        if(user[fitKey] === values[fitKey]) return;

                        return (
                            <div className="flex flex-col gap-1" key={index}>
                                <p className="text-sm font-medium text-purple-900">{`${key.toUpperCase()}`}</p>
                                <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground line-through">{user[fitKey]}</span>
                                <span className="text-sm font-medium text-purple-700">→</span>
                                <span className="text-sm font-medium text-purple-900">{values[fitKey]}</span>
                                </div>
                            </div>
                        ) 
                    })
                }
            </div>

            <DialogFooter className="sm:justify-end mt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => closeDialog(false)}
                    className="border-purple-200 hover:bg-purple-50"
                >
                    Cancel
                </Button>
                <Button type="button" 
                    onClick={handleConfirmSubmit} 
                    className="bg-purple-600 hover:bg-purple-700"
                >
                    Confirm Changes
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmationDialog