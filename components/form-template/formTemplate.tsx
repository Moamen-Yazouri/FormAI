"use client";
import { Card, CardHeader } from "@/components/ui/card";
import clsx from "clsx";
import type { IForm } from "@/@types";
import FormGenerator from "../formGenerator/formGenerator";
import { useContext, useEffect, useState } from "react";
import LoadingPage from "../loadingPage/loadingPage";
import { motion } from "framer-motion";
import { getForm } from "./service/form.service";
import { AuthContext } from "@/providers/auth/authProvider";
import { useRouter } from "next/navigation";
import { ScrollableContainer } from "../scroll-container/scroll-container";

interface IProps {
  isPreview: boolean;
  isView: boolean;
  id?: string;
  form?: IForm;
}

const FormTemplate = (props: IProps) => {
  const { id, isPreview, form } = props;
  const [data, setData] = useState<IForm | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const [responded, setResponded] = useState<boolean>(false);

  useEffect(() => {
    if (id && user) {
      getForm(id, user)
        .then((form) => {
          setData(form);
          setResponded(form.answeredBy.includes(user._id) || false);
        })
        .finally(() => setLoading(false));
    } else {
      setData(form || null);
      setLoading(false);
    }
  }, [id, form, user]);

  if (!form && isPreview) {
    router.back();
  }

  return (
    <ScrollableContainer maxHeight="90vh">
      <div className="w-full p-5 min-h-screen flex items-center justify-center relative overflow-hidden custom-scrollbar">
        {(loading || isLoading) && <LoadingPage />}

        {data && (
          <motion.div
            className="flex items-center justify-center w-full relative z-10"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="w-full rounded-2xl shadow-2xl overflow-hidden py-0 gap-0">
              <CardHeader className="px-8 py-6 border-b bg-slate-900 border-cyan-700/20">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-200 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
                      {data?.title || "Form title"}
                    </h1>
                  </div>
                  {data?.description && (
                    <p className="text-sm text-slate-400">{data.description}</p>
                  )}
                </div>
              </CardHeader>

              {responded ? (
                <div className="w-full max-w-xl mx-auto rounded-lg bg-slate-900 mb-2 text-slate-200 p-6 shadow-md flex flex-col items-start gap-4">
                  <p className="text-base font-medium text-cyan-400">
                    You’ve already responded to this form.
                  </p>
                  <button
                    onClick={() => setResponded(false)}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
                  >
                    Send another response
                  </button>
                </div>
              ) : (
                <FormGenerator
                  fields={data.fields}
                  formId={String(id)}
                  allowAnonymous={data.allowAnonymous}
                  isPreview={props.isPreview}
                  isView={props.isView}
                />
              )}
            </Card>
          </motion.div>
        )}
      </div>
    </ScrollableContainer>
  );
};

export default FormTemplate;
