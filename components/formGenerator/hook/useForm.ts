import { IFormField } from "@/@types";
import { useFormik } from "formik";
import { IFormValues } from "../types";
import { getInitials } from "../getInitials";
import { generateValidationScehma } from "@/lib/createTheValidationSchema";
import { toast } from "sonner";
import { useMemo } from "react";
import * as yup from "yup";
interface IProps {
    fields: IFormField[];
    formId: string;
}

export const useForm = (props: IProps) => {
        const initialValues = useMemo(() => {
            console.log(getInitials(props.fields));
            return getInitials(props.fields);
        }, [props.fields]);

        const validationSchema = useMemo(() => {
            const schema = generateValidationScehma(props.fields);
            console.log(schema); // Add this line to print the validation schem
            return generateValidationScehma(props.fields);
        }, [props.fields]);

        const handleSignUp = async(
        values: IFormValues,
        resetForm: () => void,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        try{
            console.log(values);
            resetForm();
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
    const formik = useFormik<IFormValues>({
        initialValues: initialValues,
        onSubmit: (values, {resetForm, setSubmitting}) => {
            handleSignUp(values, resetForm, setSubmitting)
        },
        validationSchema: yup.object().shape(validationSchema),
        enableReinitialize: true,
        validateOnMount: true,
        validateOnChange: false,
    })
    return {formik}

} 