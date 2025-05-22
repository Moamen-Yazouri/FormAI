"use client"
import MotionedSelect from "@/components/motionedSelect/motionedSelect"
import MotionField from "@/components/motionTextField/motionTextField"
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { Form, FormikProvider } from "formik"
import type React from "react"
import { use, useEffect, useState } from "react"
import { OPTIONS } from "./constants"
import { AuthContext } from "@/providers/auth/authProvider"
import { usePersonalInfo } from "./hook/usePersonalForm"
import LoadingSpinner from "@/app/(main)/form-generator/components/loading-spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"

const PersonalForm = () => {
    const { user } = use(AuthContext)
    if (!user) {
        throw new Error("You are not logged in")
    }
    const [disabled, setDisabled] = useState<boolean>(true)
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false)
    const { formik } = usePersonalInfo({ name: user.name, role: user.role })

    useEffect(() => {
        if (formik.values.name !== user.name || formik.values.role !== user.role) {
        setDisabled(false)
        } else {
        setDisabled(true)
        }
        if (formik.isSubmitting) {
        setDisabled(true)
        }
    }, [formik.values, formik.isSubmitting, user.name, user.role])

    const handleSubmitClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setShowConfirmDialog(true)
    }

    const handleConfirmSubmit = () => {
        setShowConfirmDialog(false)
        formik.submitForm()
    }

    return (
        <>
        <FormikProvider value={formik}>
            <Form>
            <MotionField name="name" isPassword={false} label="Name" type="text" placeholder="Enter your name" />

            <MotionedSelect name={"role"} options={OPTIONS} />
            <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4">
                <Button
                type="button"
                variant="outline"
                onClick={() => formik.resetForm()}
                disabled={formik.isSubmitting}
                className="border-purple-200 hover:bg-purple-50"
                >
                Cancel
                </Button>
                <Button
                type="button"
                onClick={handleSubmitClick}
                disabled={disabled}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {formik.isSubmitting ? <LoadingSpinner className="mr-2" /> : null}
                Save Changes
                </Button>
            </CardFooter>
            </Form>
        </FormikProvider>

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
            <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-purple-900">
                <AlertCircle className="h-5 w-5 text-purple-600" />
                Confirm Changes
                </DialogTitle>
                <DialogDescription>Are you sure you want to update your personal information?</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
                {formik.values.name !== user.name && (
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-purple-900">Name</p>
                    <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground line-through">{user.name}</span>
                    <span className="text-sm font-medium text-purple-700">→</span>
                    <span className="text-sm font-medium text-purple-900">{formik.values.name}</span>
                    </div>
                </div>
                )}

                {formik.values.role !== user.role && (
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-purple-900">Role</p>
                    <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground line-through">{user.role}</span>
                    <span className="text-sm font-medium text-purple-700">→</span>
                    <span className="text-sm font-medium text-purple-900">{formik.values.role}</span>
                    </div>
                </div>
                )}
            </div>

            <DialogFooter className="sm:justify-end">
                <Button
                type="button"
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                className="border-purple-200 hover:bg-purple-50"
                >
                Cancel
                </Button>
                <Button type="button" onClick={handleConfirmSubmit} className="bg-purple-600 hover:bg-purple-700">
                Confirm Changes
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default PersonalForm
