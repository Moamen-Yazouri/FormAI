"use client"
import { useFormik } from "formik";
import { FormValues } from "../types";
import { INITIAL_VALUES } from "../constatnts";
import { validationSchema } from "../validationSchema";
import { toast } from "sonner";
import { IUser } from "@/@types";
import { useState } from "react";
import { useRouter } from "next/navigation";

const useSignIn = () => {
    const [created, setCreated] = useState(false);
    const router = useRouter();
    const handleSignUp = async(
        values: FormValues,
        resetForm: () => void,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const newUser: IUser = {
            ...values,
            lastActive: new Date(),
        }
        try{
            const res = await fetch("/api/auth/sign-up",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                }
            )

            const data = await res.json();

            if(!res.ok) {
                toast.error(data.message);
                return;
            }
            setCreated(true);
            resetForm();
            toast.success("Account Created Successfully!");
            setTimeout(() => {
                toast.dismiss();
                router.push("/sign-in");
            }, 500)
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
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
    })
    return {
        formik,
        created
    }
}
export default useSignIn;