"use client"
import { useFormik } from "formik";
import { FormValues } from "../types";
import { INITIAL_VALUES } from "../constants";
import { validationSchema } from "../validationSchema";

const useSignIn = () => {
    const handleSignIn = (
        values: FormValues,
        resetForm: () => void
    ) => {
        console.log(values);
        resetForm();
    }
    const formik = useFormik<FormValues>({
        initialValues: INITIAL_VALUES,
        onSubmit: (values, {resetForm}) => {
            handleSignIn(values, resetForm)
        },
        validationSchema,
        validateOnMount: true,
        validateOnChange: false,
    })
    return {formik}
}
export default useSignIn;