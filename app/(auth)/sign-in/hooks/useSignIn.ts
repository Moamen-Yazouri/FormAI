"use client"
import { useFormik } from "formik";
import { FormValues } from "..";
import { INITIAL_VALUES } from "../constants";

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
        }
    })
    return {formik}
}
export default useSignIn;