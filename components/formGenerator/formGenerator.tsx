import { IFormField } from '@/@types'
import { Form, FormikProvider } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import FieldProvider from '../fieldProvider/fieldProvider';
import { useForm } from './hook/useForm';
import { CardContent, CardFooter } from '../ui/card';
import { Save } from 'lucide-react';
import { Button } from '../ui/button';
import MotionField from '../motionTextField/motionTextField';
import { AuthContext } from '@/providers/auth/authProvider';
interface IProps {
    fields: IFormField[];
    formId?: string;
    isPreview: boolean;
    isView: boolean;
    allowAnonymous?: boolean;
}
const FormGenerator = (props: IProps) => {
    const {formik} = useForm({...props});
    const {user} = useContext(AuthContext);
    const [isSub, setIsSub] = useState(formik.isSubmitting)
    useEffect(() => {
        setIsSub(formik.isSubmitting);
    }, [formik.isSubmitting])
    
    const onCancel = () => {
        formik.resetForm();

    }
    return (
        <FormikProvider value= {formik}>
            <Form className='flex flex-col gap-5'>
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
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold transition"
                    >
                    {isSub ? (
                        <>
                        <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
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