import MotionedSelect from '@/components/motionedSelect/motionedSelect'
import MotionField from '@/components/motionTextField/motionTextField'
import { Form, Formik, FormikProvider } from 'formik'
import React from 'react'
import { OPTIONS } from './constants'
import { useAccountSetingForm } from './hook/useAccountSetingForm'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import LoadingSpinner from '@/app/(main)/form-generator/components/loading-spinner'

const AccountSettingsForm = () => {
    const {formik} = useAccountSetingForm();
    console.log(formik.values);
    return (
        <FormikProvider value={formik}>
            <Form>
                <MotionField
                    name='email'
                    isPassword={false}
                    label='New Email'
                    type='email'
                    placeholder='Enter your email'
                />

                <MotionedSelect 
                    name={'role'} 
                    label= 'Change your role:'
                    options={OPTIONS}
                />
                <CardFooter className="flex justify-end space-x-4 border-t px-6 py-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => formik.resetForm}
                    disabled={formik.isSubmitting}
                    className="border-purple-200 hover:bg-purple-50"
                >
                Cancel
            </Button>
            <Button 
                type="submit" 
                disabled={formik.isSubmitting} 
                className="bg-purple-600 hover:bg-purple-700"
            >
                {formik.isSubmitting ? <LoadingSpinner className="mr-2" /> : null}
                Save Changes
            </Button>
            </CardFooter>            
            </Form>
        </FormikProvider>
    )
}

export default AccountSettingsForm