"use client"

import MotionedSelect from "@/components/motionedSelect/motionedSelect"
import MotionField from "@/components/motionTextField/motionTextField"
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { Form, FormikProvider } from "formik"
import { use, useEffect, useMemo, useState } from "react"
import { OPTIONS } from "./constants"
import { AuthContext } from "@/providers/auth/authProvider"
import { usePersonalInfo } from "./hook/usePersonalForm"
import LoadingSpinner from "@/app/(main)/form-generator/components/loading-spinner"
import ConfirmationDialog from "../confirmation-dialog/confirmationDialog"
import type { UserRoles } from "@/@types"

const PersonalForm = () => {
  const [disabled, setDisabled] = useState(true)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const { user } = use(AuthContext)
  const { formik } = usePersonalInfo()

  const hasChanges = useMemo(() => {
    if (!user || !formik.values) return false
    return formik.values.name !== user.name || formik.values.role !== user.role
  }, [formik.values, user])

  useEffect(() => {
    setDisabled(formik.isSubmitting || !hasChanges)
  }, [hasChanges, formik.isSubmitting])

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        formik.setValues({
          name: user.name,
          role: user.role,
        })
      }, 100)
    }
  }, [user])

  if (!user || !formik.values) return null

  const handleCancel = () => {
    formik.setValues({
      name: user.name,
      role: user.role,
    })
  }

  return (
    <>
      <FormikProvider value={formik}>
        <Form className="flex flex-col gap-6 w-full p-5">
          <MotionField
            name="name"
            type="text"
            isPassword={false}
            label="Name:"
            placeholder="Enter your name"
          />

          {user.role !== "admin" && (
            <MotionedSelect name="role" options={OPTIONS} label="Select a new Role:" />
          )}

          <CardFooter className="flex justify-end gap-2 border-t border-cyan-700/20 px-3 py-4">
            {!disabled && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={formik.isSubmitting}
                className="text-slate-300 hover:text-cyan-200 hover:bg-cyan-900/20 transition-all duration-200"
              >
                Cancel
              </Button>
            )}

            <Button
              type="button"
              onClick={() => setShowConfirmDialog(true)}
              disabled={disabled}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
            >
              {formik.isSubmitting ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </Form>
      </FormikProvider>

      <ConfirmationDialog
        dialogState={showConfirmDialog}
        closeDialog={setShowConfirmDialog}
        values={{ ...formik.values, role: formik.values.role as UserRoles }}
        submit={formik.submitForm}
      />
    </>
  )
}

export default PersonalForm
