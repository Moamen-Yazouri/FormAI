"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Copy, Download, Eye, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IFormData } from "@/@types"

interface FormPreviewProps {
  formData: IFormData | null
}

export default function FormPreview({ formData }: FormPreviewProps) {
  const [activeTab, setActiveTab] = useState("preview")
  const [copied, setCopied] = useState(false)

  if (!formData) return null

  const copyCode = () => {
    // In a real implementation, this would copy the actual code
    navigator.clipboard.writeText("// Form code would be here")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCode = () => {
    // In a real implementation, this would download the form code
    const element = document.createElement("a")
    const file = new Blob(["// Form code would be here"], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "form-code.tsx"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mb-8"
    >
      <Card className="border-2 border-purple-200 shadow-lg shadow-purple-100/50 overflow-hidden h-fit w-120 mx-auto">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-700 text-white">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">{formData.title}</CardTitle>
              <CardDescription className="text-purple-100">{formData.description}</CardDescription>
            </div>
            <div className="flex gap-2">

            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="preview" className="p-6 bg-white">
              <div className="space-y-4">
                {formData.fields.map((field, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium text-left">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === "text" && (
                      <input
                        type="text"
                        placeholder={field.placeholder || ""}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    )}
                    {field.type === "email" && (
                      <input
                        type="email"
                        placeholder={field.placeholder}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    )}
                    {field.type === "textarea" && (
                      <textarea
                        placeholder={field.placeholder}
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    )}
                    {field.type === "select" && field.options && (
                      <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="" disabled>
                          Select an option
                        </option>
                        {field.options.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <Button className="bg-purple-600 hover:bg-purple-700">{formData.submitButton}</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
