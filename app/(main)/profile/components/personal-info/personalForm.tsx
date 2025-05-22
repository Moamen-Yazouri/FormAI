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
import ConfirmationDialog from "../confirmation-dialog/confirmationDialog"

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

    const handleCancle = () => {
        formik.setValues({
            name: user!.name,
            role: user!.role,
        }) 
    }

    const handleSubmitClick = () => {
        setShowConfirmDialog(true)
    }
    return (
        <>
        <FormikProvider value={formik}>
            <Form className="flex justify-center flex-col w-full gap-6 p-5">
            <MotionField name="name" isPassword={false} label="Name:" type="text" placeholder="Enter your name" />

            <MotionedSelect name={"role"} options={OPTIONS} label="Select a new Role: "/>
            <CardFooter className="flex justify-end space-x-2 border-t px-3 py-2">
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
                    onClick={handleSubmitClick}
                    disabled={disabled}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {formik.isSubmitting ? <LoadingSpinner className="mr-2" /> : "Save Changes"}
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

export default PersonalForm
