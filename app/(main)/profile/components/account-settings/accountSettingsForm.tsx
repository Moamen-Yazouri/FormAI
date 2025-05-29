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
    return (
      formik.values.name !== user.name ||
      formik.values.email !== user.email
    )
  }, [formik.values, user])

  useEffect(() => {
    setDisabled(formik.isSubmitting || !hasChanges)
  }, [hasChanges, formik.isSubmitting])

  const handleCancel = () => {
    if (user) {
      formik.setValues({
        name: user.name,
        email: user.email,
      })
    }
  }

  if (!user) return null

  return (
    <>
      <FormikProvider value={formik}>
        <Form className="flex flex-col gap-6 px-6 py-4 text-slate-200">
          <MotionField
            name="name"
            label="Name"
            type="text"
            isPassword={false}
            placeholder="Enter your name"
          />
          <MotionField
            name="email"
            label="Email Address"
            type="email"
            isPassword={false}
            placeholder="Enter your email"
          />

          <CardFooter className="flex justify-end gap-3 border-t border-cyan-600/30 pt-6">
            {!disabled && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={formik.isSubmitting}
                className="text-slate-300 hover:text-cyan-200 hover:bg-cyan-900/20 transition"
              >
                Cancel
              </Button>
            )}

            <Button
              type="button"
              onClick={() => setShowConfirmDialog(true)}
              disabled={disabled}
              className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-md hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
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
