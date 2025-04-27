"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FormPreview from "./components/form-preview"
import LoadingSpinner from "./components/loading-spinner"


const formTemplates = [
  "Contact Form",
  "Survey Form",
  "Registration Form",
  "Feedback Form",
  "Job Application",
  "Event Registration",
  "Newsletter Signup",
  "Custom Form",
]

export default function FormGeneratorPage() {
  const [prompt, setPrompt] = useState("")
  const [template, setTemplate] = useState("Custom Form")
  const [loading, setLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSent, setIsSent] = useState(false)
  const [generatedForm, setGeneratedForm] = useState<any>(null)
  const areaRef = useRef<HTMLTextAreaElement>(null)

  const handleTypedMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setIsEmpty(value.trim() === "")
    setPrompt(value)
    autoResizeTextarea()
  }

  const autoResizeTextarea = () => {
    const textarea = areaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }

  const resetTextareaHeight = () => {
    const textarea = areaRef.current
    if (textarea) {
      textarea.style.height = "fit-content"
    }
  }

 

  const generateForm = async () => {
    try {
      setIsSent(true)
      setError(null)
      setLoading(true)
      setPrompt("")
      resetTextareaHeight()
        const res = await fetch("http://localhost:3000/api/generate-form",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              formRequirements: prompt, // 👈 match your API expectations
            }),
          },
        )



      // Mock generated form data - replace with your actual implementation
      const mockForm = await res.json();

      setGeneratedForm(mockForm)
    } catch (error) {
      console.error("Error generating form:", error)
      setError(error instanceof Error ? error.message : "Failed to generate form")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={`w-full px-4 py-8 ${isSent ? "mt-auto" : "my-auto"}`}>
      <div className="mx-auto text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`mb-10 ${isSent ? "hidden" : "block"}`}
          exit={{ opacity: 0, x: -70 }}
        >
          <h1 className="text-3xl lg:text-4xl xl:text-5xl my-4 font-bold">Form Generator</h1>
          <h2 className="text-lg md:text-xl lg:text-2xl my-4 font-bold text-gray-500">
            Describe your form and we'll build it for you
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="relative"
        >
          {/* <FormPreview formData={generatedForm} /> */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "keyframes", duration: 0.4, ease: "easeInOut" }}
            className="border-2 border-input shadow-purple-400/40 shadow-2xl bg-background max-w-4xl mx-auto p-4 rounded-4xl transition duration-200 hover:shadow-purple-400/70 sticky bottom-2 w-full mt-5"
          >
            <textarea
              onChange={handleTypedMessage}
              className="p-4 resize-none rounded-3xl w-full focus:outline-0 bg-background text-foreground border-0"
              placeholder="Describe the form you want to create... (e.g., 'Create a contact form with name, email, and message fields')"
              autoFocus
              value={prompt}
              ref={areaRef}
              style={{ minHeight: "60px" }}
            />
              <div className="flex gap-2 items-center justify-end">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 border-purple-300 hover:bg-purple-100 hover:text-purple-700"
                  onClick={() => {
                    setPrompt("Create a contact form with name, email, subject dropdown, and message textarea")
                    autoResizeTextarea()
                  }}
                >
                  <Wand2 size={20} className="text-purple-600" />
                </Button>
                <Button
                  disabled={isEmpty || loading}
                  className={`rounded-full w-12 h-12 bg-purple-600 hover:bg-purple-700 ${isEmpty ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                  onClick={generateForm}
                >
                  {loading ? <LoadingSpinner /> : <ArrowUp size={20} className="text-white" />}
                </Button>
              </div>
          </motion.div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mt-4 text-red-500"
          >
            Error: {error}
          </motion.div>
        )}
      </div>
    </section>
  )
}
