"use client";
import { useFormGenerator } from "../hooks/useFormGenerator";
import GeneratedForm from "../components/generatedForm";
import PromptTextarea from "../components/promptTextarea";
import PublishDialog from "../components/publishDialog";

export default function FormGeneratorPage() {
    const {
        prompt,
        loading,
        error,
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
            <div className="min-h-screen w-full bg-gradient-to-r from-slate-900/60 via-blue-900/40 to-cyan-900/40 relative overflow-hidden flex flex-col">


            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-cyan-900/40"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-bl from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-t from-indigo-600/15 to-cyan-600/15 rounded-full blur-2xl transform -translate-x-24 -translate-y-24"></div>

            <div className="flex-1 overflow-auto px-4 ">
                {generatedForm && (
                <GeneratedForm
                    generatedForm={generatedForm}
                    setShowPublishDialog={setShowPublishDialog}
                    isPublishing={isPublishing}
                    setGeneratedForm={setGeneratedForm}
                    error={error}
                />
                )}
            </div>

            <div className="sticky bottom-0  backdrop-blur-md">
                <PromptTextarea
                handleTypedMessage={handleTypedMessage}
                prompt={prompt}
                areaRef={areaRef}
                autoResizeTextarea={autoResizeTextarea}
                setPrompt={setPrompt}
                loading={loading}
                isEmpty={isEmpty}
                generateForm={generateForm}
                />
            </div>

            <PublishDialog
                allowAnonymous={allowAnonymous}
                showPublishDialog={showPublishDialog}
                emails={emails}
                emailError={emailError}
                isPublic={isPublic}
                email={email}
                setEmail={setEmail}
                setIsPublic={setIsPublic}
                setAllowAnonymous={setAllowAnonymous}
                setShowPublishDialog={setShowPublishDialog}
                handleRemoveEmail={handleRemoveEmail}
                handleAddEmail={handleAddEmail}
                handlePublishForm={handlePublishForm}
            />
            </div>

    )
}
