"use client";

import type { IForm } from "@/@types";
import FormTemplate from "@/components/form-template/formTemplate";
import { ScrollableContainer } from "@/components/scroll-container/scroll-container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { SetStateAction } from "react";

interface IProps {
    generatedForm: IForm | null;
    setShowPublishDialog: (value: SetStateAction<boolean>) => void;
    isPublishing: boolean;
    setGeneratedForm: (value: SetStateAction<IForm | null>) => void;
    error: string | null;
}

const GeneratedForm = (props: IProps) => {
    const {
        generatedForm,
        setShowPublishDialog,
        isPublishing,
        setGeneratedForm,
        error,
    } = props;

    if (!generatedForm && !error) {
        return null;
    }

    return (
        
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ">
        {generatedForm && (

            <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full max-w-4xl overflow-auto  backdrop-blur-md flex flex-col  justify-center p-0"
            >
            <ScrollableContainer maxHeight="90vh">
                <FormTemplate
                    isPreview={true}
                    form={generatedForm}
                    isView={false}
                />
            </ScrollableContainer>

            <div className="w-full flex justify-end gap-3 mt-6">
                <Button
                variant="outline"
                className="flex items-center gap-2 border-cyan-500/30 text-cyan-300 bg-slate-900/30 hover:bg-cyan-800/20 hover:text-white transition-colors"
                onClick={() => setShowPublishDialog(true)}
                >
                {isPublishing ? (
                    <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
                ) : (
                    "Publish Form"
                )}
                </Button>

                <Button
                variant="outline"
                className="flex items-center gap-2 border-cyan-500/30 text-cyan-300 bg-slate-900/30 hover:bg-cyan-800/20 hover:text-white transition-colors"
                onClick={() => setGeneratedForm(null)}
                >
                Regenerate
                </Button>
            </div>
            </motion.div>
        )}

        {error && (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute bottom-6 text-red-400 bg-red-900/20 border border-red-700/30 rounded-lg p-4"
            >
            Error: {error}
            </motion.div>
        )}
        </div>
    );
};

export default GeneratedForm;
