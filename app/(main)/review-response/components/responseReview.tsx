"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { IDisplayResponse } from "@/@types"
import ResponseInfoCard from "./responseInfoCard"
import QuestionCard from "./questionCard"
import { toast } from "sonner"

interface IProps {
    response: IDisplayResponse | null;
}

export default function ResponseDetailsPage(props: IProps) {
    const router = useRouter();

    if(!props.response) {
        toast.error("Response not found");
        setTimeout(() => {
            router.back();
        }, 500);
        return null;
    }

    const {responses, ...info} = props.response;

    const handleExport = (format: string) => {

        console.log(`Exporting in ${format} format`)
    }

    const handleBack = () => {
        router.back()
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Responses
                </Button>

                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Response
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport("json")}>Export as JSON</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <ResponseInfoCard info={info}/>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Response Details
                </h2>

                <div className="space-y-6">
                {responses.map((item, index) => (
                    <QuestionCard key={index} qNo={index + 1} item={item}/>
                ))}
                </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-between items-center mt-8">
                <Button variant="outline" onClick={handleBack}>
                Back to Responses
                </Button>

                <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Respondent
                </Button>
                <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Response
                </Button>
                </div>
            </div>
        </div>
    )
}
