"use client"

import { Button } from '@/components/ui/button';
import { Form, FormikProvider, useFormik } from 'formik';
import Link from 'next/link';
import React from 'react'
import { motion } from "framer-motion";
import MotionField from '@/components/custom-text-field/CustomTextField';
import  useSignIn  from './hooks/useSignIn';

const SignInForm = () => {
    const {formik} = useSignIn();
    return (
        <FormikProvider value={formik}>
            <Form className='space-y-4'>
                <MotionField
                    label="Email"
                    name="email"
                    type="email"
                    isPassword={false}
                    placeholder='name@example.com'
                />

                <MotionField
                    label="Password"
                    name="password"
                    type="password"
                    isPassword={true}
                    placeholder='••••••••'
                />
                <Link href="/forget-password" className="text-sm text-purple-500 hover:text-purple-600 underline underline-offset-4">
                    Forgot password?
                </Link>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                    className="w-full"
                >
                <Button
                    type='submit'
                    className='w-full bg-purple-500 hover:bg-purple-600 mt-2'
                >
                    Sign-In
                </Button>
                </motion.div>
            </Form>
        </FormikProvider>

        
    )
}

export default SignInForm;