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
import FullPageLoader from "../profileLoader"

const AccountSettingsForm = () => {
    const { user  } = use(AuthContext);
    const { formik } = useAccountSetingForm()
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const hasChanges = useMemo(() => {
        if (!user || !formik.values) return false;
        const changed = formik.values.name !== user.name 
            || formik.values.email !== user.email;
        return changed;
    }, [formik.values, user?.name, user?.role]);

    useEffect(() => {
        if (formik.isSubmitting) {
            setDisabled(true);
        } else {
            setDisabled(!hasChanges);
        }
    }, [hasChanges, formik.isSubmitting]);

    const handleCancle = () => {
        formik.setValues({
            name: user!.name,
            email: user!.email,
        }) 
    }
    
    
        if(!user) {
            return null;
        
        }

    return (
        <>
        <FormikProvider value={formik}>
            <Form className="flex justify-center flex-col w-full gap-6 p-4">
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
