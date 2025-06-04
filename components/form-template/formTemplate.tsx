"use client"
import { Card, CardHeader } from "@/components/ui/card"
import clsx from "clsx"
import type { IForm } from "@/@types"
import FormGenerator from "../formGenerator/formGenerator"
import { useContext, useEffect, useState } from "react"
import LoadingPage from "../loadingPage/loadingPage"
import { motion } from "framer-motion"
import { getForm } from "./service/form.service"
import { AuthContext } from "@/providers/auth/authProvider"
import { useRouter } from "next/navigation"

interface IProps {
  isPreview: boolean
  isView: boolean
  id?: string
  form?: IForm
}

const FormTemplate = (props: IProps) => {
  const { id, isPreview, form } = props
  const [data, setData] = useState<IForm | null>(null)
  const [loading, setLoading] = useState(true)
  const { user, isLoading } = useContext(AuthContext)
  const router = useRouter()
  const [responded, setResponded] = useState<boolean>(false);
  useEffect(() => {
    if (id && user) {
      getForm(id, user)
        .then((form) => {
          setData(form);
          setResponded(form.answeredBy.includes(user._id) || false)
        })
        .finally(() => setLoading(false))
    } else {
      setData(form || null)
      setLoading(false)
    }
  }, [id, form, user])

  if (!form && isPreview) {
    router.back()
  }

  return (
    <div
      className={clsx(
        isPreview
          ? "max-w-3xl mx-auto m-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8 max-h-fit"
          : "w-full p-10 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
        "flex items-center justify-center relative overflow-hidden",
      )}
    >
      {!isPreview && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-blue-800/20 to-indigo-700/20" />
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-700/10 rounded-full blur-3xl" />
        </>
      )}

      {(loading || isLoading) && <LoadingPage />}

      {data && (
        <motion.div
          className="flex items-center justify-center w-full relative z-10"
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            className={clsx(
              "w-full rounded-2xl shadow-2xl overflow-hidden py-0 gap-2 backdrop-blur-md",
              isPreview
                ? "border border-blue-200 bg-white"
                : "border border-cyan-500/20 bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-slate-950/80 ring-1 ring-cyan-500/10",
            )}
          >
            <CardHeader
              className={clsx(
                "px-8 py-6 border-b",
                isPreview
                  ? "bg-gradient-to-r from-blue-800/5 via-indigo-700/5 to-cyan-500/5 border-blue-200"
                  : "bg-gradient-to-r from-blue-800/20 via-indigo-700/20 to-cyan-500/10 border-cyan-500/20 backdrop-blur",
              )}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h1
                    className={clsx(
                      "text-2xl font-bold",
                      isPreview
                        ? "text-blue-800"
                        : "bg-gradient-to-r from-slate-200 via-cyan-500 to-indigo-400 bg-clip-text text-transparent",
                    )}
                  >
                    {data?.title || "Form title"}
                  </h1>
                </div>
                {data?.description && (
                  <p className={clsx("text-sm", isPreview ? "text-blue-800/70" : "text-slate-200/80")}>
                    {data?.description}
                  </p>
                )}
              </div>
            </CardHeader>
              {
                responded ? (
                  <div className="w-full max-w-xl mx-auto rounded-lg bg-slate-900 mb-2  text-slate-200 p-6 shadow-md flex flex-col items-start gap-4">
                    <p className="text-base font-medium text-cyan-400">
                      You’ve already responded this form.
                    </p>
                    <button
                      onClick={() => setResponded(false)} // replace with your actual handler
                      className="px-4 py-2 rounded-md text-sm font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
                    >
                      Send another response
                    </button>
                  </div>
                ) : (
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
      )}
    </div>
  )
}

export default FormTemplate
