"use client" 
import MotionField from "@/components/motionTextField/motionTextField";
import {Button} from "@/components/ui/button";
import {Form, FormikProvider, useFormik} from "formik";

import useForm from "./hooks/useForm";
import {Loader2} from "lucide-react";
import MotionedSelect from "@/components/motionedSelect/motionedSelect";

const SignUpForm = () => {
    const {formik} = useForm()
    return (
        <FormikProvider value={formik}>
            <Form>
                <MotionField label="Full Name" name="name"
                    isPassword={false}
                    placeholder="Moamen Yazouri"/>

                <MotionField label="Email" name="email"
                    isPassword={false}
                    placeholder="email@example.com"/>

                <MotionedSelect label="Role" name="role"
                    options={
                        [
                            {
                                value: "user",
                                label: "User"
                            }, {
                                value: "creator",
                                label: "Creator"
                            }
                        ]
                    }/>

                <MotionField label="password" name="password"
                    isPassword={true}
                    placeholder="••••••••"/>

                <MotionField label="Confirm Password" name="confirmedPassword"
                    isPassword={true}
                    placeholder="••••••••"/>
                <Button type='submit' className='w-full bg-purple-500 hover:bg-purple-600 mt-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'>
                    {
                    formik.isSubmitting ? (
                        <Loader2 className="animate-spin text-white"/>
                    ) : "Create an account"
                } </Button>
            </Form>
        </FormikProvider>
    )
}
export default SignUpForm;
