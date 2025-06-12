"use client"

import MotionField from "@/components/motionTextField/motionTextField"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormikProvider } from "formik"
import React, { useEffect, useMemo, useState } from "react"
import { usePasswordUpdate } from "../hook/usePasswordUpdate"

const PasswordUpdate = () => {
    const { formik } = usePasswordUpdate()
    const [disabled, setDisabled] = useState(true)

    const isEmpty = useMemo(
        () => Object.values(formik.values).every((value) => value === ""),
        [formik.values]
    )

    useEffect(() => {
        if (formik.isSubmitting) {
        setDisabled(true)
        } else {
        setDisabled(isEmpty)
        }
    }, [formik.values, formik.isSubmitting])

    return (
        <FormikProvider value={formik}>
        <CardContent className="space-y-6 text-slate-200">
            <Form className="flex flex-col w-full gap-6 p-5">
            <MotionField
                name="prevPassword"
                label="Current Password"
                isPassword={true}
                placeholder="Enter your previous password"
            />
            <MotionField
                name="newPassword"
                label="New Password"
                isPassword={true}
                placeholder="••••••••"
            />
            <MotionField
                name="confirmPassword"
                label="Confirm Password"
                isPassword={true}
                placeholder="••••••••"
            />
            <CardFooter className="flex justify-end space-x-4 border-t border-violet-800/30 px-6 py-4">
                {!disabled && (
                <Button
                    type="reset"
                    variant="ghost"
                    className="text-slate-300 hover:text-white hover:bg-violet-800/30 transition-all"
                >
                    Cancel
                </Button>
                )}
                <Button
                type="submit"
                disabled={disabled}
                className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:via-indigo-500 hover:to-purple-500 text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-xl"
                >
                Update Password
                </Button>
            </CardFooter>
            </Form>
        </CardContent>
        </FormikProvider>
    )
}

export default PasswordUpdate
