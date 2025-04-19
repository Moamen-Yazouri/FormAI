"use client"
import { useFormik } from "formik";
import { FormValues } from "../types";
import { INITIAL_VALUES } from "../constants";
import { validationSchema } from "../validationSchema";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { AuthContext, IContextUser } from "@/providers/authProvider";


const useSignIn = () => {
    const {setUser} = useContext(AuthContext)
    const handleSignIn = async(
        values: FormValues,
        resetForm: () => void,
        setSubmitting: (submitting: boolean) => void 
    ) => {
        try {
            const res = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if(!res.ok) {
                toast.error(data.message);
                return;
            }
            toast.success(data.message);
            const userForContext: IContextUser = {user: {email: data.user.email, role: data.user.role}}
            setUser(userForContext)
            resetForm();
            setTimeout(() => {
                redirect("/")
            }, 2000);
        }
        catch(err) {
            if(err instanceof Error) {
                toast.error(err.message);
            }
            toast.error("Something went wrong!");
        }
        finally{
            setSubmitting(false);
        }
    }
    const formik = useFormik<FormValues>({
        initialValues: INITIAL_VALUES,
        onSubmit: (values, {resetForm, setSubmitting}) => {
            handleSignIn(values, resetForm, setSubmitting)
        },
        validationSchema,
        validateOnMount: true,
        validateOnChange: false,
    })
    return {formik}
}
export default useSignIn;