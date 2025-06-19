"use client"
import { useFormik } from "formik";
import { FormValues } from "../types";
import { INITIAL_VALUES } from "../constants";
import { validationSchema } from "../validationSchema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/auth/authProvider";
import { IContextUser } from "@/@types";

const useSignIn = () => {
    const {setUser} = useContext(AuthContext);
    const router = useRouter();
    const [logged, setLogged] = useState(false);
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
            setLogged(true);
            toast.success(data.message || "Signed in successfully");
            const userForContext: IContextUser = {
                name: data.user.name, 
                email: data.user.email, 
                role: data.user.role, 
                _id: data.user._id
            }
            setUser(userForContext)
            resetForm();
            setTimeout(() => {
                if(data.user.role === "creator") {
                    router.push("/form-generator");
                } else if(data.user.role === "user") {
                    router.push(`/available-forms/${data.user.name}`);
                } else {
                    router.push("/admin/dashboard");
                }
                toast.dismiss();
            }, 500);
            
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
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
    })
    return {formik, logged}
}
export default useSignIn;