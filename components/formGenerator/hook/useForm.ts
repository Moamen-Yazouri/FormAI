"use client"
import { IAnswer, IFormField } from "@/@types";
import { useFormik } from "formik";
import { IFormValues } from "../types";
import { getInitials } from "../getInitials";
import { generateValidationScehma } from "@/lib/createTheValidationSchema";
import { toast } from "sonner";
import { useContext, useMemo } from "react";
import { AuthContext } from "@/providers/auth/authProvider";

interface IProps {
    fields: IFormField[];
    formId?: string;
    isPreview: boolean;
    isView: boolean;
}

export const useForm = (props: IProps) => {
        const {user} = useContext(AuthContext);

        const initialValues = useMemo(() => {
            return getInitials(props.fields); 
        }, [props.fields]);

        const validationSchema = useMemo(() => {
            const schema = generateValidationScehma(props.fields);
            console.log(schema); // Add this line to print the validation schem
            return generateValidationScehma(props.fields);
        }, [props.fields]);

        const handleSignUp = async(
            values: IFormValues,
            resetForm: () => void,
            setSubmitting: (isSubmitting: boolean) => void
        ) => {
            if(props.isPreview || props.isView) {
                resetForm();
                toast.success("Form submissions works correctly!");
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
                    answer: values[field.name || field.label.toLowerCase()],
                    userId: user._id,
                }
            })

        try{

            const res = await fetch("http://localhost:3000/api/add-response",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(answers),
                }
            )

            const data = await res.json();
            if(!res.ok) {
                console.error(data.message);
                toast.error(data.message);
                return;
            }
            resetForm();
            toast.success(data.message);
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
            handleSignUp(values, resetForm, setSubmitting)
        },
        validationSchema,
        enableReinitialize: true,
        validateOnMount: true,
        validateOnChange: false,
    })
    return {formik}

} 