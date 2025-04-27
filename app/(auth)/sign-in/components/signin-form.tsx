"use client" 
import {Loader2} from "lucide-react";
import {Button} from '@/components/ui/button';
import {Form, FormikProvider, useFormik} from 'formik';
import Link from 'next/link';
import React from 'react'
import {motion} from "framer-motion";
import MotionField from '@/components/motionTextField/motionTextField';
import useSignIn from './hooks/useSignIn';

const SignInForm = () => {
    const {formik} = useSignIn();
    return (
        <FormikProvider value={formik}>
            <Form className='space-y-4'>
                <MotionField label="Email" name="email" type="email"
                    isPassword={false}
                    placeholder='name@example.com'
                    style={{
                        label: "",
                        input: "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    }}
                />

                <MotionField label="Password" name="password" type="password"
                    isPassword={true}
                    placeholder='••••••••'
                    style={{
                        label: "",
                        input: "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    }}
                />
                <Link href="/forget-password" className="text-sm text-purple-500 hover:text-purple-600 underline underline-offset-4">
                    Forgot password?
                </Link>
                <motion.div initial={
                        {
                            opacity: 0,
                            y: 20
                        }
                    }
                    animate={
                        {
                            opacity: 1,
                            y: 0
                        }
                    }
                    transition={
                        {
                            duration: 0.4,
                            delay: 0.3,
                            ease: "easeOut"
                        }
                    }
                    className="w-full">
                    <Button type='submit' className='w-full cursor-pointer bg-purple-500 hover:bg-purple-600 mt-2 disabled:opacity-70 disabled:cursor-not-allowed'
                        disabled={
                            formik.isSubmitting
                    }>
                        {
                        formik.isSubmitting ? (
                            <Loader2 className="animate-spin text-white"/>
                        ) : "Sign-In"
                    } </Button>
                </motion.div>
            </Form>
        </FormikProvider>


    )
}

export default SignInForm;
