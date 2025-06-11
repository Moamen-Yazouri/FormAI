import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowUp, Wand2 } from 'lucide-react'
import React, { RefObject, SetStateAction } from 'react'
import LoadingSpinner from './loading-spinner'
interface IProps {
    handleTypedMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    prompt: string,
    areaRef:  RefObject<HTMLTextAreaElement | null>,
    autoResizeTextarea: () => void,
    setPrompt: (value: SetStateAction<string>) => void,
    loading: boolean,
    isEmpty: boolean,
    generateForm: () => Promise<void>,
}
const PromptTextarea = (props: IProps) => {
    const {
        prompt,
        areaRef,
        loading,
        isEmpty,
        autoResizeTextarea,
        handleTypedMessage,
        setPrompt,
        generateForm,
    } = props
    return (
        <div className="relative px-4 pb-8">
            <div className="max-w-4xl mx-auto">
            
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
    )
}

export default PromptTextarea