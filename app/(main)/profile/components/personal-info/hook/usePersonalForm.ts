import { useFormik } from "formik"
import { FormValues } from "../types"
import { validationSchema } from "../validationSchems";
interface IProps extends FormValues{}

export const usePersonalInfo = (props: IProps) => {
    const handleSubmit = async(
        values: FormValues,
        resetForm: () => void,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        console.log(values)
    }
    const formik = useFormik<FormValues>({
        initialValues: {...props},
        onSubmit: (values, {resetForm, setSubmitting}) => {
            handleSubmit(values, resetForm, setSubmitting);
        },
        validationSchema: validationSchema
    });
    return {
        formik
    }
}