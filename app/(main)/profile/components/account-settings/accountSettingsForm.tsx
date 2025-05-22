"use client"

import MotionField from "@/components/motionTextField/motionTextField"
import { Form, FormikProvider } from "formik"
import { use, useState, useEffect } from "react"
import { useAccountSetingForm } from "./hook/useAccountSetingForm"
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import LoadingSpinner from "@/app/(main)/form-generator/components/loading-spinner"
import { AuthContext } from "@/providers/auth/authProvider"
import ConfirmationDialog from "../confirmation-dialog/confirmationDialog"

const AccountSettingsForm = () => {
    const { user } = use(AuthContext);
    if(!user) {
        throw new Error("User not found!");
        
    }
    const { formik } = useAccountSetingForm({ name: user!.name, email: user!.email })
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        const isChanged =
        formik.values.name !== user!.name || formik.values.email !== user!.email
        setDisabled(!isChanged || formik.isSubmitting)
    }, [formik.values, formik.isSubmitting, user]);

    const handleCancle = () => {
        formik.setValues({
            name: user!.name,
            email: user!.email,
        }) 
    }


    return (
        <>
        <FormikProvider value={formik}>
            <Form>
                <div className="space-y-6">
                    <MotionField name="name" 
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
                </div>

                <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4 mt-6">
                    {
                        !disabled && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancle}
                                disabled={formik.isSubmitting}
                                className="border-purple-200 hover:bg-purple-50"
                            >
                                Cancel
                            </Button>
                        )
                    }

                    <Button
                    type="button"
                    onClick={() => setShowConfirmDialog(true)}
                    disabled={disabled}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    {formik.isSubmitting ? <LoadingSpinner className="mr-2" /> : null}
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
