"use client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormikProvider } from "formik";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import MotionField from "@/components/motionTextField/motionTextField";
import useSignIn from "./hooks/useSignIn";

const SignInForm = () => {
  const { formik, logged } = useSignIn(); 
  return (
    <FormikProvider value={formik}>
      <Form className="space-y-4">
        <MotionField
          label="Email"
          name="email"
          type="email"
          isPassword={false}
          placeholder="name@example.com"
          style={{
            label: "",
            input:
              "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500",
          }}
          disabled={formik.isSubmitting || logged}
        />

        <MotionField
          label="Password"
          name="password"
          type="password"
          isPassword={true}
          placeholder="••••••••"
          style={{
            label: "",
            input:
              "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500",
          }}
          disabled={formik.isSubmitting || logged}
        />

        <Link
          href="/forget-password"
          className="text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
        >
          Forgot password?
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          <Button
            type="submit"
            className="w-full cursor-pointer bg-cyan-500 hover:bg-cyan-400 mt-2 text-white disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={formik.isSubmitting || logged}
          >
            {formik.isSubmitting ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              "Sign In"
            )}
          </Button>
        </motion.div>
      </Form>
    </FormikProvider>
  );
};

export default SignInForm;
