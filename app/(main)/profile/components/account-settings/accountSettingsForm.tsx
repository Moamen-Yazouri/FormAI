"use client"

import MotionField from "@/components/motionTextField/motionTextField"
import { Form, FormikProvider } from "formik"
import { use, useState, useEffect, useMemo } from "react"
import { useAccountSetingForm } from "./hook/useAccountSetingForm"
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import LoadingSpinner from "@/app/(main)/form-generator/components/loading-spinner"
import { AuthContext } from "@/providers/auth/authProvider"
import ConfirmationDialog from "../confirmation-dialog/confirmationDialog"

const AccountSettingsForm = () => {
    const { user } = use(AuthContext)
    const { formik } = useAccountSetingForm()
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const hasChanges = useMemo(() => {
        if (!user || !formik.values) return false
        return formik.values.name !== user.name || formik.values.email !== user.email
    }, [formik.values, user])

    useEffect(() => {
        setDisabled(formik.isSubmitting || !hasChanges)
    }, [hasChanges, formik.isSubmitting])

    const handleCancel = () => {
        formik.setValues({
        name: user!.name,
        email: user!.email
        })
    }

    if (!user) return null

    return (
        <>
        <FormikProvider value={formik}>
            <Form className="flex flex-col w-full p-5 gap-6 text-slate-200">
            <MotionField
                name="name"
                isPassword={false}
                label="Name"
                type="text"
                placeholder="Enter your name"
            />
            <MotionField
                name="email"
                isPassword={false}
                label="Email Address"
                type="email"
                placeholder="Enter your email"
            />

            <CardFooter className="flex justify-end space-x-4 border-t border-violet-800/30 px-6 py-4 mt-4">
                {!disabled && (
                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleCancel}
                    disabled={formik.isSubmitting}
                    className="text-slate-300 hover:text-white hover:bg-violet-800/30 transition-all"
                >
                    Cancel
                </Button>
                )}

                <Button
                type="button"
                onClick={() => setShowConfirmDialog(true)}
                disabled={disabled}
                className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:via-indigo-500 hover:to-purple-500 text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-xl"
                >
                {formik.isSubmitting && <LoadingSpinner className="mr-2" />}
                Save Changes
                </Button>
            </CardFooter>
            </Form>
        </FormikProvider>

        <ConfirmationDialog
            dialogState={showConfirmDialog}
            closeDialog={setShowConfirmDialog}
            values={formik.values}
            submit={formik.submitForm}
        />
        </>
    )
}

export default AccountSettingsForm
