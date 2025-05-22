import { useFormik } from "formik"
import { FormValues } from "../types"
import { INITIAL_VALUES } from "../constants"
import { validationSchema } from "../validationSchema"

export const useAccountSetingForm = () => {
    const handleSubmit = async(
        values: FormValues,
        resetForm: () => void,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        
    }
    const formik = useFormik<FormValues>({
        initialValues: INITIAL_VALUES,
        onSubmit: (values, {resetForm, setSubmitting}) => {
            handleSubmit(values, resetForm, setSubmitting);
        },
        validationSchema: validationSchema
    });
    return {
        formik
    }
}