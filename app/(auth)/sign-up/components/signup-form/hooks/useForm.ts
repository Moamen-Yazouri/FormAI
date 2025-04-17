"use client"
import { useFormik } from "formik";
import { FormValues } from "../types";
import { INITIAL_VALUES } from "../constatnts";
import { validationSchema } from "../validationSchema";


const useSignIn = () => {
    const handleSignUp = (
        values: FormValues,
        resetForm: () => void
    ) => {
        console.log(values);
        resetForm();
    }
    const formik = useFormik<FormValues>({
        initialValues: INITIAL_VALUES,
        onSubmit: (values, {resetForm}) => {
            handleSignUp(values, resetForm)
        },
        validationSchema,
        validateOnMount: true,
        validateOnChange: false,
    })
    return {formik}
}
export default useSignIn;