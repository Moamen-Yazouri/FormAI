import { Button } from '@/components/ui/button';
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Mail, X } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';
interface IProps {
    setIsPublic: Dispatch<SetStateAction<boolean>>,
    setAllowAnonymous: Dispatch<SetStateAction<boolean>>,
    setShowPublishDialog: Dispatch<SetStateAction<boolean>>,
    handleRemoveEmail: (emailToRemove: string) => void,
    handleAddEmail: () => void,
    handlePublishForm: () => Promise<void>,
    setEmail: Dispatch<SetStateAction<string>>,
    showPublishDialog: boolean,
    emails: string[],
    emailError: string,
    isPublic: boolean,
    allowAnonymous: boolean,
    email: string,
}
const PublishDialog = (props: IProps) => {
    const {
        allowAnonymous,
        showPublishDialog,
        emails,
        emailError,
        isPublic,
        email,  
        setEmail,
        setIsPublic,
        setAllowAnonymous,
        setShowPublishDialog,
        handleRemoveEmail,
        handleAddEmail,
        handlePublishForm,
    } = props
    return (
        <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
            <DialogContent className="sm:max-w-md bg-slate-900/95 border-blue-700/50 backdrop-blur-sm">
            <DialogHeader>
                <DialogTitle className="text-blue-300">Publish Form</DialogTitle>
                <DialogDescription className="text-slate-400">
                Configure how users can access and submit this form.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
                <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Label htmlFor="anonymous" className="text-sm font-medium text-slate-300">
                    Allow Anonymous Submissions
                    </Label>
                    <p className="text-xs text-slate-500">Users can submit the form without authentication.</p>
                </div>
                <Switch
                    id="anonymous"
                    checked={allowAnonymous}
                    onCheckedChange={setAllowAnonymous}
                    className="data-[state=checked]:bg-cyan-500"
                />
                </div>

                <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Label htmlFor="public" className="text-sm font-medium text-slate-300">
                    Public Form
                    </Label>
                    <p className="text-xs text-slate-500">Anyone with the link can access this form.</p>
                </div>
                <Switch
                    id="public"
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                    className="data-[state=checked]:bg-cyan-500"
                />
                </div>
                {!isPublic && (
                <div className="space-y-3 pt-2">
                    <Label className="text-sm font-medium text-slate-300">Add Users by Email</Label>
                    <div className="border border-blue-700/30 rounded-md p-4 bg-slate-950/50">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                        <Input
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`bg-slate-900/50 border-blue-700/50 text-slate-200 placeholder:text-slate-500 ${
                            emailError ? "border-red-400" : ""
                            }`}
                        />
                        <Button
                            type="button"
                            onClick={handleAddEmail}
                            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white"
                        >
                            Add
                        </Button>
                        </div>
                        {emailError && <p className="text-xs text-red-400">{emailError}</p>}

                        <div className="mt-2">
                        {emails.length > 0 ? (
                            <div className="space-y-2">
                            {emails.map((email) => (
                                <div
                                key={email}
                                className="flex items-center justify-between bg-blue-900/30 border border-blue-700/30 rounded-md px-3 py-2"
                                >
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-blue-400" />
                                    <span className="text-sm text-slate-300">{email}</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveEmail(email)}
                                    className="h-6 w-6 p-0 hover:bg-blue-800/30"
                                >
                                    <X className="h-4 w-4 text-blue-400" />
                                </Button>
                                </div>
                            ))}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Mail className="h-4 w-4" />
                            <span>No users added yet</span>
                            </div>
                        )}
                        </div>
                    </div>
                    </div>
                </div>
                )}
            </div>
            <DialogFooter>
                <Button
                variant="ghost"
                onClick={() => setShowPublishDialog(false)}
                className="text-slate-400 hover:bg-slate-800/50"
                >
                Cancel
                </Button>
                <Button
                onClick={handlePublishForm}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white"
                >
                Publish
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PublishDialog