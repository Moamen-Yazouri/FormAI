"use client"
import { motion } from "framer-motion"
import { ArrowUp, Loader2, Mail, Wand2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "./components/loading-spinner"
import { useFormGenerator } from "./hooks/useFormGenerator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import FormTemplate from "@/components/form-template/formTemplate"




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
  } = useFormGenerator()

  return (
    <div className="min-h-screen w-full  bg-gradient-to-r from-slate-900/60 via-blue-900/40 to-cyan-900/40 relative overflow-hidden flex flex-col">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-cyan-900/40"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-bl from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-t from-indigo-600/15 to-cyan-600/15 rounded-full blur-2xl transform -translate-x-24 -translate-y-24"></div>

      {/* Top content area - for generated forms and other content */}
      <div className="flex-1 relative px-4 py-8 overflow-auto">
        {generatedForm && (
          <div className="max-w-4xl mx-auto">
            <div className="w-full flex justify-end gap-3 mb-4">
              <Button
                variant="outline"
                className="border-blue-600/50 text-blue-300 hover:bg-blue-800/30 hover:text-blue-200 hover:border-blue-500"
                onClick={() => setShowPublishDialog(true)}
              >
                {isPublishing ? <Loader2 className="animate-spin text-blue-300" /> : "Publish Form"}
              </Button>
              <Button
                variant="outline"
                className="border-blue-600/50 text-blue-300 hover:bg-blue-800/30 hover:text-blue-200 hover:border-blue-500"
                onClick={() => setGeneratedForm(null)}
              >
                Regenerate
              </Button>
            </div>
              Your generated form component would go here
              <FormTemplate isPreview={true} form={generatedForm} isView={false}/> 
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-4xl mx-auto mt-4 text-red-400 bg-red-900/20 border border-red-700/30 rounded-lg p-4"
          >
            Error: {error}
          </motion.div>
        )}
      </div>

      {/* Bottom sticky section - Header and Textarea */}
      <div className="relative px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Header - always at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl lg:text-4xl xl:text-5xl mb-2 font-bold bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Form Generator
            </h1>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-400">
              Describe your form and we'll build it for you
            </h2>
          </motion.div>

          {/* Textarea - always at bottom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "keyframes", duration: 0.4, ease: "easeInOut" }}
            className="border-2 border-blue-700/50 shadow-blue-500/40 shadow-2xl bg-slate-900/50 backdrop-blur-sm p-4 rounded-4xl transition duration-200 hover:shadow-blue-500/70"
          >
            <textarea
              onChange={handleTypedMessage}
              className="p-4 resize-none rounded-3xl w-full focus:outline-0 bg-transparent text-slate-300 placeholder:text-slate-500 border-0"
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
                className="rounded-full w-12 h-12 border-blue-600/50 hover:bg-blue-800/30 hover:text-blue-300 text-blue-400"
                onClick={() => {
                  setPrompt("Create a contact form with name, email, subject dropdown, and message textarea")
                  autoResizeTextarea()
                }}
              >
                <Wand2 size={20} />
              </Button>
              <Button
                disabled={isEmpty || loading}
                className={`rounded-full w-12 h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 ${
                  isEmpty ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
                onClick={generateForm}
              >
                {loading ? <LoadingSpinner /> : <ArrowUp size={20} className="text-white" />}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent className="sm:max-w-md bg-slate-900/95 border-blue-700/50 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-blue-300">Publish Form</DialogTitle>
            <DialogDescription className="text-slate-400">
              Configure how users can access and submit this form.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="anonymous" className="text-sm font-medium text-slate-300">
                  Allow Anonymous Submissions
                </Label>
                <p className="text-xs text-slate-500">Users can submit the form without authentication.</p>
              </div>
              <Switch
                id="anonymous"
                checked={allowAnonymous}
                onCheckedChange={setAllowAnonymous}
                className="data-[state=checked]:bg-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="public" className="text-sm font-medium text-slate-300">
                  Public Form
                </Label>
                <p className="text-xs text-slate-500">Anyone with the link can access this form.</p>
              </div>
              <Switch
                id="public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
                className="data-[state=checked]:bg-cyan-500"
              />
            </div>
            {!isPublic && (
              <div className="space-y-3 pt-2">
                <Label className="text-sm font-medium text-slate-300">Add Users by Email</Label>
                <div className="border border-blue-700/30 rounded-md p-4 bg-slate-950/50">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`bg-slate-900/50 border-blue-700/50 text-slate-200 placeholder:text-slate-500 ${
                          emailError ? "border-red-400" : ""
                        }`}
                      />
                      <Button
                        type="button"
                        onClick={handleAddEmail}
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white"
                      >
                        Add
                      </Button>
                    </div>
                    {emailError && <p className="text-xs text-red-400">{emailError}</p>}

                    <div className="mt-2">
                      {emails.length > 0 ? (
                        <div className="space-y-2">
                          {emails.map((email) => (
                            <div
                              key={email}
                              className="flex items-center justify-between bg-blue-900/30 border border-blue-700/30 rounded-md px-3 py-2"
                            >
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-blue-400" />
                                <span className="text-sm text-slate-300">{email}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveEmail(email)}
                                className="h-6 w-6 p-0 hover:bg-blue-800/30"
                              >
                                <X className="h-4 w-4 text-blue-400" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Mail className="h-4 w-4" />
                          <span>No users added yet</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowPublishDialog(false)}
              className="text-slate-400 hover:bg-slate-800/50"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePublishForm}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white"
            >
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
