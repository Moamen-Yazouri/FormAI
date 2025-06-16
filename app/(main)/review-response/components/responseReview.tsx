"use client"

import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IDisplayResponse } from "@/@types";
import ResponseInfoCard from "./responseInfoCard";
import QuestionCard from "./questionCard";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/providers/auth/authProvider";
import TablesLoader from "@/components/tables-loader/tablesLoader";

interface IProps {
    response: IDisplayResponse | null
}

export default function ResponseDetailsPage({ response }: IProps) {
    const router = useRouter();
    const {user, isLoading} = useContext(AuthContext)

    if (isLoading) return <TablesLoader itemName="Responses" />

    if(!user) return null;

    if (!response) {
        toast.error("Response not found")
        setTimeout(() => {
        router.back()
        }, 500)
        return null
    }

    const handleCopy = async () => {
        try {
        await navigator.clipboard.writeText(JSON.stringify([response], null, 2))
        toast.success("Response copied to clipboard!")
        } catch {
            toast.error( "Failed to copy response to clipboard!")
        }
    }

    const handleBack = () => {
        router.back()
    }

    const { responses, ...info } = response

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-blue-900 to-indigo-900 text-slate-200">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
            <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center gap-2 text-cyan-400 hover:text-white hover:bg-cyan-800/20 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Responses
            </Button>
            </div>

            <div className="mb-6">
                <ResponseInfoCard info={info} />
            </div>


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

            <div className="flex justify-between items-center mt-8">
            <Button
                variant="outline"
                onClick={handleBack}
                className="text-cyan-300 border-cyan-500/30 bg-slate-900/20 hover:bg-cyan-800/10 hover:text-white transition-colors"
            >
                Back to Responses
            </Button>

            <div className="flex gap-2">
                {
                    response.respondentEmail !== "Anonymous" && 
                    response.respondentName !== user.name && 
                    (
                        <a href={`mailto:${info.respondentEmail}`}>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 text-cyan-300 border-cyan-400/30 bg-slate-900/30 hover:bg-cyan-800/20 hover:text-white transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                Contact Respondent
                            </Button>
                        </a>
                    )
                }

                <Button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-400 hover:shadow-md transition-all duration-200"
                >
                <Download className="h-4 w-4" />
                Copy Response
                </Button>
            </div>
            </div>
        </div>
        </div>
    )
}
