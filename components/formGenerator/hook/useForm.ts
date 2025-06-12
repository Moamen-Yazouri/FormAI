"use client"
import { IAnswer, IFormField, IFormResponse } from "@/@types";
import { useFormik } from "formik";
import { IFormValues } from "../types";
import { getInitials } from "../getInitials";
import { generateValidationScehma } from "@/lib/createTheValidationSchema";
import { toast } from "sonner";
import { useContext, useMemo, useState } from "react";
import { AuthContext } from "@/providers/auth/authProvider";
import * as mongoose from "mongoose";

interface IProps {
    fields: IFormField[];
    formId?: string;
    isPreview: boolean;
    isView: boolean;
    allowAnonymous?: boolean;
}

export const useForm = (props: IProps) => {
        const {user} = useContext(AuthContext);
        const [submitted, setSubmitted] = useState(false)
        const initialValues = useMemo(() => {
            return getInitials(props.fields); 
        }, [props.fields, props.allowAnonymous]);

        const validationSchema = useMemo(() => {
            return generateValidationScehma(props.fields);
        }, [props.fields, props.allowAnonymous]);

        const handleSubmitForm = async(
            values: IFormValues,
            resetForm: () => void,
            setSubmitting: (isSubmitting: boolean) => void
        ) => {
            console.log(values);
            if(props.isPreview || props.isView) {
                resetForm();
                toast.success("Form submission works correctly!");
                return;
            }

            if(!user) {
                resetForm();
                toast.error("You must be logged in to submit a form!");
                return;
            }
            const answers: IAnswer[] = props.fields.map(field => {
                return {
                    fieldId: field.fieldId,
                    answer: values[field.fieldId.toLowerCase()],
                }
            })
            const formResponse: IFormResponse = {
                formId: new mongoose.Types.ObjectId(props.formId),
                answers: answers,
                userId: formik.values.allowAnonymous ? "Anonymous" : new mongoose.Types.ObjectId(user._id),
            }
            console.log(formResponse);
            try{
                const res = await fetch("http://localhost:3000/api/add-response",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formResponse),
                    }
                )

                const data = await res.json();
                if(!res.ok) {
                    console.error(data.message);
                    toast.error(data.message);
                    return;
                }
                resetForm();
                toast.success("Response recorded successfully!");
                setSubmitted(true)
            }
            catch(err){
                if(err instanceof Error) {
                    toast.error(err.message)
                }
                toast.error("Something went wrong!")
            }
            finally{
                setSubmitting(false);
            }
    }
    const formik = useFormik<IFormValues>({
        initialValues: initialValues,
        onSubmit: (values, {resetForm, setSubmitting}) => {
            handleSubmitForm(values, resetForm, setSubmitting);
        },
        validationSchema,
        enableReinitialize: true,
        validateOnMount: true,
        validateOnChange: false,
    })
    return {
        formik,
        submitted
    }

} 