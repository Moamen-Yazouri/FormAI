import { IFormField } from '@/@types'
import { Form, FormikProvider } from 'formik';
import React from 'react'
import FieldProvider from '../fieldProvider/fieldProvider';
import { useForm } from './hook/useForm';
interface IProps {
    fields: IFormField[];
    formId: string;
}
const FormGenerator = (props: IProps) => {
    const {formik} = useForm({...props});
    return (
        <FormikProvider value= {formik}>
            <Form>
                {
                    props.fields.map((field) => {
                        return (
                            <FieldProvider field={field}/>
                        )
                    })
                }
            </Form>
        </FormikProvider>
    )
}

export default FormGenerator