import { IFormField } from "@/@types";
import { useFormik } from "formik";
import { IFormValues } from "../types";
import { getInitials } from "../getInitials";
import { generateValidationScehma } from "@/lib/createTheValidationSchema";
import { toast } from "sonner";

interface IProps {
    fields: IFormField[];
    formId: string;
}

export const useForm = (props: IProps) => {
        const initialValues = getInitials(props.fields);
        const validationSchema = generateValidationScehma(props.fields)
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
        validationSchema,
        validateOnMount: true,
        validateOnChange: false,
    })
    return {formik}

} 