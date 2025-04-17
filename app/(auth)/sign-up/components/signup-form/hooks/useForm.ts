"use client"
import { useFormik } from "formik";
import { FormValues } from "../types";
import { INITIAL_VALUES } from "../constatnts";


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
        }
    })
    return {formik}
}
export default useSignIn;