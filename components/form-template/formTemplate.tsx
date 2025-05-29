"use client";
import type React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import clsx from "clsx";
import { IForm } from "@/@types";
import FormGenerator from "../formGenerator/formGenerator";
import { useContext, useEffect, useState } from "react";
import LoadingPage from "../loadingPage/loadingPage";
import { motion } from "framer-motion";
import { getForm } from "./service/form.service";
import { AuthContext } from "@/providers/auth/authProvider";
import { useRouter } from "next/navigation";

interface IProps {
  isPreview: boolean;
  isView: boolean;
  id?: string;
  form?: IForm;
}

const FormTemplate = (props: IProps) => {
  const {
    id,
    isPreview,
    form,
  } = props;
  const [data, setData] = useState<IForm | null>(null);
  const [loading, setLoading] = useState(true);
  const {user, isLoading} = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if(id && user) {
      getForm(id, user)

      .then(form => {
        setData(form);
      })

      .finally(() => {
        setLoading(false);
      });

    }
    else {
      setData(form || null)
      setLoading(false);
    }
  }, [id, form, user]);

  if(!data && isPreview) {
    router.back(); 
  }
  return (
    <div
      className={clsx(
        isPreview ? "max-w-3xl mx-auto m-0 bg-white p-8 max-h-fit" : "w-full p-10 min-h-screen",
        " flex items-center justify-center"
      )}
    >
      
      {        
        loading || isLoading && (
          <LoadingPage/>
          ) 
      }
      {
        data && (
            <motion.div
              className="flex items-center justify-center w-full"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="w-full rounded-2xl border border-purple-300 shadow-xl overflow-hidden py-0 gap-2">
                    <CardHeader className="bg-gradient-to-r from-purple-200 to-purple-300 px-8 py-6 border-b border-purple-300">
                        <div className="space-y-2">
                          <div className="flex items-center gap-4"> 
                            <h1 className="text-2xl font-bold text-purple-700">{data?.title || "Form title"}</h1>
                          </div>
                          {data?.description && (
                            <p className="text-sm text-purple-600">{data?.description}</p>
                          )}
                        </div>
                    </CardHeader>
                    {
                      data && (
                        <FormGenerator 
                          fields={data.fields} 
                          formId={String(id)} 
                          isPreview={props.isPreview} 
                          isView={props.isView} 
                        />
                      )
                    }
              </Card>
            </motion.div>
        )
      }
    </div>
  );
};

export default FormTemplate;
