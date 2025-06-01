"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { IDisplayResponse } from "@/@types"
import ResponseInfoCard from "./responseInfoCard"
import QuestionCard from "./questionCard"
import { toast } from "sonner"

interface IProps {
    response: IDisplayResponse | null
}

export default function ResponseDetailsPage(props: IProps) {
    const router = useRouter()

    if (!props.response) {
        toast.error("Response not found")
        setTimeout(() => {
        router.back()
        }, 500)
        return null
    }

    const { responses, ...info } = props.response

    const handleExport = (format: string) => {
        console.log(`Exporting in ${format} format`)
    }

    const handleBack = () => {
        router.back()
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-blue-900 to-indigo-900 text-slate-200">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
            <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/40"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Responses
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-400">
                    <Download className="h-4 w-4" />
                    Export Response
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                align="end"
                className="bg-slate-900 border border-cyan-600/20 text-slate-200 shadow-lg backdrop-blur-md"
                >
                <DropdownMenuItem onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("json")}>Export as JSON</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>

            {/* Info Card */}
            <div className="mb-6">
            <ResponseInfoCard info={info} />
            </div>

            {/* Questions */}
            <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Response Details
                </span>
            </h2>

            <div className="space-y-6">
                {responses.map((item, index) => (
                <QuestionCard key={index} qNo={index + 1} item={item} />
                ))}
            </div>
            </div>

            <Separator className="my-6 bg-cyan-700/20" />

            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-8">
            <Button
                variant="outline"
                onClick={handleBack}
                className="text-cyan-400 border-cyan-500/40 hover:bg-slate-800/30 hover:text-cyan-300"
            >
                Back to Responses
            </Button>

            <div className="flex gap-2">
                <Button
                variant="outline"
                className="flex items-center gap-2 text-slate-300 border-cyan-400/40 hover:bg-slate-800/30 hover:text-cyan-300"
                >
                <Mail className="h-4 w-4" />
                Contact Respondent
                </Button>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-800 via-indigo-700 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-400">
                <Download className="h-4 w-4" />
                Export Response
                </Button>
            </div>
            </div>
        </div>
        </div>
    )
}
