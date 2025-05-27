"use client"
import MotionedSelect from "@/components/motionedSelect/motionedSelect";
import MotionField from "@/components/motionTextField/motionTextField";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Form, FormikProvider } from "formik";
import type React from "react";
import { use, useEffect, useMemo, useState } from "react";
import { OPTIONS } from "./constants";
import { AuthContext } from "@/providers/auth/authProvider";
import { usePersonalInfo } from "./hook/usePersonalForm";
import LoadingSpinner from "@/app/(main)/form-generator/components/loading-spinner";
import ConfirmationDialog from "../confirmation-dialog/confirmationDialog";
import { UserRoles } from "@/@types";

const PersonalForm = () => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
    const { user } = use(AuthContext);
    const { formik } = usePersonalInfo();

    const hasChanges = useMemo(() => {
        if (!user || !formik.values) return false;
        return formik.values.name !== user.name || formik.values.role !== user.role;
    }, [formik.values, user?.name, user?.role]);

    useEffect(() => {
        if (formik.isSubmitting) {
            setDisabled(true);
        } else {
            setDisabled(!hasChanges);
        }
    }, [hasChanges, formik.isSubmitting]);

    useEffect(() => {
        if(user) {
            setTimeout(() => {                
                formik.setValues({
                    name: user.name,
                    role: user.role,
                });
            }, 100);
        }
    }, [user]);

    if (!user || !formik.values) {
        return null;
    }



    const handleCancel = () => {
        formik.setValues({
            name: user.name,
            role: user.role,
        });
    };

    const handleSubmitClick = () => {
        setShowConfirmDialog(true);
    };

    return (
        <>
            <FormikProvider value={formik}>
                <Form className="flex justify-center flex-col w-full gap-6 p-5">
                    <MotionField 
                        name="name" 
                        isPassword={false} 
                        label="Name:" 
                        type="text" 
                        placeholder="Enter your name" 
                    />

                    <MotionedSelect 
                        name="role" 
                        options={OPTIONS} 
                        label="Select a new Role:" 
                    />

                    <CardFooter className="flex justify-end space-x-2 border-t px-3 py-2">
                        {!disabled && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={formik.isSubmitting}
                                className="border-purple-200 hover:bg-purple-50"
                            >
                                Cancel
                            </Button>
                        )}

                        <Button
                            type="button"
                            onClick={handleSubmitClick}
                            disabled={disabled}
                            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
                values={{...formik.values, role: formik.values.role as UserRoles}}
                submit={formik.submitForm}
            />
        </>
    );
};

export default PersonalForm;