"use client"
import { useFormik } from "formik";
import { FormValues } from "../types";
import { INITIAL_VALUES } from "../constatnts";
import { validationSchema } from "../validationSchema";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const useSignIn = () => {
    const handleSignUp = async(
        values: FormValues,
        resetForm: () => void,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try{
            const res = await fetch("/api/auth/sign-up",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            )

            const data = await res.json();

            if(!res.ok) {
                toast.error(data.message);
                return;
            }

            resetForm();
            toast.success("Account Created Successfully!");
            setTimeout(() => {
                redirect("/sign-in")
            }, 1000)
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
    const formik = useFormik<FormValues>({
        initialValues: INITIAL_VALUES,
        onSubmit: (values, {resetForm, setSubmitting}) => {
            handleSignUp(values, resetForm, setSubmitting)
        },
        validationSchema,
        validateOnMount: true,
        validateOnChange: false,
    })
    return {formik}
}
export default useSignIn;