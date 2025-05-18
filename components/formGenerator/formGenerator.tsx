import { IFormField } from '@/@types'
import { Form, FormikProvider } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import FieldProvider from '../fieldProvider/fieldProvider';
import { useForm } from './hook/useForm';
import { CardContent } from '../ui/card';
import { Loader2, Save } from 'lucide-react';
import { Button } from '../ui/button';
import MotionField from '../motionTextField/motionTextField';
import { AuthContext } from '@/providers/auth/authProvider';
import { motion } from 'framer-motion';
import router from 'next/router';
import { useRouter } from 'next/navigation';
import LoadingPage from '../loadingPage/loadingPage';
interface IProps {
    fields: IFormField[];
    formId?: string;
    isPreview: boolean;
    isView: boolean;
    allowAnonymous?: boolean;
}
const FormGenerator = (props: IProps) => {
    const {formik, submitted} = useForm({...props});
    const {user, isLoading} = useContext(AuthContext);
    const [isSub, setIsSub] = useState(formik.isSubmitting);
    const router = useRouter();
    useEffect(() => {
        setIsSub(formik.isSubmitting);
    }, [formik.isSubmitting])
    
    const onCancel = () => {
        formik.resetForm();
        router.push(`/available-forms/${user!.name}`)
    }

    if(isLoading) {
        return (
            <div className="w-full min-h-screen bg-white px-4 md:px-10 py-8">
                <LoadingPage/>
            </div>
        )
    }

    if(submitted) {
        return (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center p-10"
            >
            <h2 className="text-2xl font-bold text-purple-700">Your response has been recorded!</h2>
            <p className="text-purple-500 mt-2 mb-6">Thank you for your time.</p>

            <button
                onClick={() => router.push(`/available-forms/${user!.name}`)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-all cursor-pointer"
            >
                Back to Forms List
            </button>
            </motion.div>
        );
        }
    return (
        <FormikProvider value= {formik}>
            <Form className='flex flex-col gap-5 w-full'>
                <CardContent className='flex flex-col space-y-2'>
                        {
                            props.allowAnonymous && (
                                <MotionField
                                    label={`Include Your Email: ${user?.email} in the response`}
                                    name='allowAnonymous'
                                    type='checkbox'
                                    className='w-full'
                                />
                            ) 
                        }
                        {
                            props.fields.map((field, index) => {
                                return (
                                    <FieldProvider key={index} field={field}/>
                                )
                            })
                        }
                </CardContent>
                <div className="flex justify-end gap-4 py-6 px-8 bg-purple-50 border-t border-purple-200">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="border-purple-300 text-purple-700 hover:bg-purple-100 hover:text-purple-900 transition font-semibold"
                    >
                        Go Back
                    </Button>
                    <Button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold transition cursor-pointer"
                    >
                    {isSub ? (
                        <>
                            <Loader2 className='animate-spin text-white'/>
                        </>
                    ) : (
                        <>
                        <Save className="h-5 w-5 mr-2" />
                        Submit
                        </>
                    )}
                    </Button>
                </div>
            </Form>
        </FormikProvider>
    )
}

export default FormGenerator