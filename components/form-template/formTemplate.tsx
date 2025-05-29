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

  useEffect(() => {
    if (id && user) {
      getForm(id, user)
        .then((form) => setData(form))
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
          ? "max-w-3xl mx-auto m-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50 p-8 max-h-fit"
          : "w-full p-10 min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-900",
        "flex items-center justify-center relative overflow-hidden"
      )}
    >
      {!isPreview && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/30 via-blue-900/20 to-cyan-700/20" />
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
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
                ? "border border-cyan-200 bg-white"
                : "border border-cyan-500/20 bg-gradient-to-br from-slate-950/80 via-blue-900/40 to-cyan-800/30 ring-1 ring-cyan-500/10"
            )}
          >
            <CardHeader
              className={clsx(
                "px-8 py-6 border-b",
                isPreview
                  ? "bg-gradient-to-r from-blue-100 to-cyan-100 border-cyan-300/40"
                  : "bg-gradient-to-r from-blue-900 via-cyan-800 to-indigo-800 border-cyan-500/20 backdrop-blur"
              )}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h1
                    className={clsx(
                      "text-2xl font-bold",
                      isPreview
                        ? "text-blue-800"
                        : "bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-300 bg-clip-text text-transparent"
                    )}
                  >
                    {data?.title || "Form title"}
                  </h1>
                </div>
                {data?.description && (
                  <p className={clsx("text-sm", isPreview ? "text-blue-600" : "text-slate-300")}>
                    {data?.description}
                  </p>
                )}
              </div>
            </CardHeader>
            <FormGenerator
              fields={data.fields}
              formId={String(id)}
              isPreview={props.isPreview}
              isView={props.isView}
            />
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default FormTemplate
