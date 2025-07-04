import { useFormik } from "formik"
import { FormValues } from "../types"
import { validationSchema } from "../validationSchems";
import { AuthContext } from "@/providers/auth/authProvider";
import {  useContext } from "react";
import { toast } from "sonner";
import ActionService from "../../../service/action.service"


export const usePersonalInfo = () => {
    const { user,revalidateUser} = useContext(AuthContext);

    const handleSubmit = async(
        values: FormValues,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        if(values.name !== user!.name) {
            const data = await ActionService.updateName(String(user!._id), values.name);
            if(data.user) {
                toast.success(`Name updated to: ${values.name} successfully`);
            }
            else {
                toast.error(data.message);
            }
        }

        if(values.role !== user!.role) {
            const data = await ActionService.updateRole(String(user!._id), values.role);
            if(data.user) {
                toast.success(`Role updated to: ${values.role} successfully`);
            }
            else {
                toast.error(data.message);
            }
        }
        await revalidateUser();
        setSubmitting(false);
    }

    const formik = useFormik<FormValues>({
        initialValues: user!,
        onSubmit: (values, {setSubmitting}) => {
            handleSubmit(values, setSubmitting);
        },
        validationSchema: validationSchema
    });
    return {
        formik
    }
}