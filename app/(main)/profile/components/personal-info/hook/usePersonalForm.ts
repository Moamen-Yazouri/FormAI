import { useFormik } from "formik"
import { FormValues } from "../types"
import { validationSchema } from "../validationSchems";
import { AuthContext } from "@/providers/auth/authProvider";
import { use } from "react";
import { toast } from "sonner";
interface IProps extends FormValues{}

export const usePersonalInfo = (props: IProps) => {
    const {user, revalidateUser} = use(AuthContext);
    if(!user) {
        throw new Error("User not found");
    }
    const handleSubmit = async(
        values: FormValues,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        
    }
    const formik = useFormik<FormValues>({
        initialValues: {...props},
        onSubmit: (values, {setSubmitting}) => {
            handleSubmit(values, setSubmitting);
        },
        validationSchema: validationSchema
    });
    return {
        formik
    }
}