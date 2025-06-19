"use client";

import { IFormField } from "@/@types";
import { Form, FormikProvider } from "formik";
import React, { useEffect, useState } from "react";
import FieldProvider from "../fieldProvider/fieldProvider";
import { useForm } from "./hook/useForm";
import { CardContent } from "../ui/card";
import { Loader2, Save } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


interface IProps {
  fields: IFormField[];
  formId?: string;
  isPreview: boolean;
  isView: boolean;
  allowAnonymous?: boolean;
}

const FormGenerator = (props: IProps) => {
  const { formik, submitted } = useForm({ ...props });
  const [isSub, setIsSub] = useState(formik.isSubmitting);
  const router = useRouter();
  useEffect(() => {
    setIsSub(formik.isSubmitting);
  }, [formik.isSubmitting]);

  const onCancel = () => {
    formik.resetForm();
    router.back();
  };

  
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-10 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 rounded-xl border border-cyan-700/20 text-slate-200 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-cyan-400">
          Your response has been recorded!
        </h2>
        <p className="text-slate-400 mt-2 mb-6">Thank you for your time.</p>

        <Button
          onClick={() => router.back()}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold"
        >
          Back to Forms List
        </Button>
      </motion.div>
    );
  }

  return (
    <FormikProvider value={formik}>
      <Form className="flex flex-col gap-5 w-full bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950    shadow-xl p-6 text-slate-200">
        <CardContent className="flex flex-col space-y-4 bg-slate-900/40 backdrop-blur-sm rounded-lg p-6 border border-cyan-700/10">
          {props.fields.map((field, index) => (
            <FieldProvider key={index} field={field} />
          ))}
        </CardContent>

        <div className="flex justify-end gap-4 py-6 px-8 border-t border-cyan-700/20 bg-slate-900/40 backdrop-blur-sm rounded-b-lg">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-900/20 hover:text-cyan-300 font-semibold"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-100 font-semibold"
          >
            {isSub ? (
              <Loader2 className="animate-spin text-slate-950" />
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
  );
};

export default FormGenerator;
