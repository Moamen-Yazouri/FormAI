"use client"
import { IForm } from '@/@types'
import FormTemplate from '@/components/form-template/formTemplate'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import React, { SetStateAction } from 'react'
interface IProps {
    generatedForm: IForm | null,
    setShowPublishDialog: (value: SetStateAction<boolean>) => void,
    isPublishing: boolean,
    setGeneratedForm: (value: SetStateAction<IForm | null>) => void,
    error: string | null,
}
const GeneratedForm = (props: IProps) => {
    const {
        generatedForm,
        setShowPublishDialog,
        isPublishing,
        setGeneratedForm,
        error,
    } = props;
    return (
        <div className="flex-1 relative px-4 py-8 overflow-auto">
            {generatedForm && (
            <div className="max-w-4xl mx-auto">
                Your generated form component would go here
                <FormTemplate isPreview={true} form={generatedForm} isView={false}/> 
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
    )
}

export default GeneratedForm