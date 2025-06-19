import { useFormik } from "formik"
import { FormValues } from "../types"
import { validationSchema } from "../validationSchema"
import {  useContext, useEffect } from "react"
import { AuthContext } from "@/providers/auth/authProvider"
import  ActionService  from "../../../service/action.service"
import { toast } from "sonner"
import { INITIAL_USER } from "../constants"

export const useAccountSetingForm = () => {
    const {user, revalidateUser} = useContext(AuthContext);
    
    useEffect(() => {
        if(user) {
            formik.setValues({
                name: user.name,
                email: user.email,
            })
        }
    }, [user]);

    const handleSubmit = async (
        values: FormValues,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        if(values.name !== user?.name) {
            const data = await ActionService.updateName(String(user?._id), values.name!);

            if(data.user) {
                toast.success(`Name updated to: ${data.user.name} successfully`);
            }
            else {
                toast.error(data.message);
            }
        }

        if(values.email!== user?.email) {
            const data = await ActionService.updateEmail(String(user?._id), values.email!);
            if(data.user) {
                toast.success(`Email updated to: ${data.user.email} successfully`);
            }
            else {
                toast.error(data.message);
            }
        }
        await revalidateUser();
        setSubmitting(false);

    }
    const formik = useFormik<FormValues>({
        initialValues: INITIAL_USER,
        onSubmit: (values, {setSubmitting}) => {
            handleSubmit(values, setSubmitting);
        },
        validationSchema: validationSchema,
    });
    return {
        formik
    }
}