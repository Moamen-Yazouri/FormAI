"use client"
import { useFormik } from "formik";
import { FormValues } from "../types";
import { INITIAL_VALUES } from "../constants";
import { validationSchema } from "../validationSchema";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/providers/auth/authProvider";
import { IContextUser } from "@/@types";

const useSignIn = () => {
    const {setUser} = useContext(AuthContext);
    const router = useRouter();
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
            const userForContext: IContextUser = {
                name: data.user.name, 
                email: data.user.email, 
                role: data.user.role, 
                _id: data.user._id
            }
            setUser(userForContext)
            setTimeout(() => {
                resetForm();
                if(data.user.role === "creator") {
                    router.push("/form-generator");
                    toast.dismiss();
                }
                
                else if(data.user.role === "user") {
                    router.push("/");
                    toast.dismiss();
                }

                else {
                    router.push("/admin/dashboard");
                    toast.dismiss();
                }
            }, 1000);
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