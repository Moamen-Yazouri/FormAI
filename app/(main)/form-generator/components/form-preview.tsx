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
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-purple-600" onClick={copyCode}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-purple-600"
                onClick={downloadCode}
              >
                <Download size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="preview" className="flex-1 data-[state=active]:bg-purple-50">
                <Eye size={16} className="mr-2" /> Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="flex-1 data-[state=active]:bg-purple-50">
                <Code size={16} className="mr-2" /> Code
              </TabsTrigger>
            </TabsList>
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
            <TabsContent value="code" className="p-0">
              <div className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-left">
                <pre className="text-sm font-mono">
                  {`import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(1, "Please select a subject."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        {/* More form fields would be here */}
        
        <Button type="submit">Send Message</Button>
      </form>
    </Form>
  );
}`}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
