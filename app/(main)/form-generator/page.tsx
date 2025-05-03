"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp, Loader2, Mail, Wand2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "./components/loading-spinner"
import FormTemplate from "@/components/form-template/formTemplate"
import { useFormGenerator } from "./hooks/useFormGenerator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"


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
  const {
      prompt,
      loading,
      error,
      isSent,
      generatedForm,
      isEmpty,
      areaRef,
      showPublishDialog,
      allowAnonymous,
      isPublic,
      email,
      emails,
      emailError,
      isPublishing,
      handleAddEmail,
      handleRemoveEmail,
      setGeneratedForm,
      setShowPublishDialog,
      setAllowAnonymous,
      setIsPublic,
      setEmail,
      handleTypedMessage,
      autoResizeTextarea,
      generateForm,
      setPrompt,
      handlePublishForm,
  } = useFormGenerator();
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
          <FormTemplate isPreview={true} form={generatedForm} isView={false}/>
        {
          generatedForm && (
            <div className="w-full max-w-3xl flex justify-end gap-3 mb-4">
                <Button
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  onClick={() => setShowPublishDialog(true)}
                >
                  {
                    isPublishing ? (
                      <Loader2 className="animate-spin text-white"/>
                    )
                    : "Publish Form"
                  }
                  
                </Button>
                <Button 
                  variant="outline" 
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  onClick={() => setGeneratedForm(null)}
                >
                  Regenerate
                </Button>
            </div>
          )
        }
            <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-purple-700">Publish Form</DialogTitle>
                  <DialogDescription>Configure how users can access and submit this form.</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="anonymous" className="text-sm font-medium">
                        Allow Anonymous Submissions
                      </Label>
                      <p className="text-xs text-gray-500">Users can submit the form without authentication.</p>
                    </div>
                    <Switch
                      id="anonymous"
                      checked={allowAnonymous}
                      onCheckedChange={setAllowAnonymous}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="public" className="text-sm font-medium">
                        Public Form
                      </Label>
                      <p className="text-xs text-gray-500">Anyone with the link can access this form.</p>
                    </div>
                    <Switch
                      id="public"
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>
                  {
                    !isPublic && (
                      <div className="space-y-3 pt-2">
                        <Label className="text-sm font-medium">Add Users by Email</Label>
                        <div className="border rounded-md p-4 bg-gray-50">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                              <Input
                                type="email"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={emailError ? "border-red-300" : ""}
                              />
                              <Button
                                type="button"
                                onClick={handleAddEmail}
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                              >
                                Add
                              </Button>
                            </div>
                            {emailError && <p className="text-xs text-red-500">{emailError}</p>}

                            <div className="mt-2">
                              {emails.length > 0 ? (
                                <div className="space-y-2">
                                  {emails.map((email) => (
                                    <div
                                      key={email}
                                      className="flex items-center justify-between bg-purple-50 border border-purple-100 rounded-md px-3 py-2"
                                    >
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-purple-500" />
                                        <span className="text-sm">{email}</span>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveEmail(email)}
                                        className="h-6 w-6 p-0 hover:bg-purple-100"
                                      >
                                        <X className="h-4 w-4 text-purple-500" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Mail className="h-4 w-4" />
                                  <span>No users added yet</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setShowPublishDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handlePublishForm} className="bg-purple-600 hover:bg-purple-700 text-white">Publish</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
