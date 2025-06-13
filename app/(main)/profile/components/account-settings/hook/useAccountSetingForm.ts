import { useFormik } from "formik"
import { FormValues } from "../types"
import { validationSchema } from "../validationSchema"
import { use } from "react"
import { AuthContext } from "@/providers/auth/authProvider"
import  ActionService  from "../../../service/action.service"
import { toast } from "sonner"

export const useAccountSetingForm = () => {
    const {user, revalidateUser} = use(AuthContext);
    if(!user) {
        throw new Error("User not found");
    }
    const handleSubmit = async (
        values: FormValues,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        if(values.name !== user.name) {
            const data = await ActionService.updateName(String(user._id), values.name!);
            if(data.user) {
                toast.success(`Name updated to: ${user.name} successfully`);
            }
            toast.error(data.message);
        }

        if(values.email!== user.email) {
            const data = await ActionService.updateEmail(String(user._id), values.email!);
            if(data.user) {
                toast.success(`Email updated to: ${user.email} successfully`);
            }
            else {
                toast.error(data.message);
            }
        }
        await revalidateUser();
        setSubmitting(false);

    }
    const formik = useFormik<FormValues>({
        initialValues: {name: user.name, email: user.email},
        onSubmit: (values, {setSubmitting}) => {
            handleSubmit(values, setSubmitting);
        },
        validationSchema: validationSchema,
    });
    return {
        formik
    }
}