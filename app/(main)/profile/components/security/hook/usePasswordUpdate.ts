import React, { use } from 'react'
import { FormValues } from '../types'
import { useFormik } from 'formik';
import { INITIAL_VALUES } from '../constants';
import { validationSchema } from '../validationSchema';
import actionService from '../../../service/action.service';
import { toast } from 'sonner';
import { AuthContext } from '@/providers/auth/authProvider';

export const usePasswordUpdate = () => {
    const {user} = use(AuthContext);
    if(!user) {
        throw new Error("User not found"); 
    }
    const onSubmit = async (
        values: FormValues,
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: () => void,
    ) => {
        const data = await actionService.updatePassword(
            String(user._id),
            values.prevPassword,
            values.newPassword,
        );
        console.log(data);
        if(data.user) {
            toast.success(`Password updated successfully`);
            resetForm();
            setSubmitting(false);
            return;
        }
        toast.error(data.message);
        setSubmitting(false);
    }
    const formik = useFormik<FormValues>({
        initialValues: INITIAL_VALUES,
        onSubmit: (values, {setSubmitting, resetForm}) => {
            onSubmit(values, setSubmitting, resetForm);
        },
        validationSchema: validationSchema,
    });
    return {
        formik,
    }
}

