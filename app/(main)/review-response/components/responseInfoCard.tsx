import { IDisplayResponse } from '@/@types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Mail, User } from 'lucide-react'
import React from 'react'
interface IProps {
    info: Omit<IDisplayResponse, "responses">
}
const ResponseInfoCard = (props: IProps) => {
    const {info} = props
    return (
        <Card className="mb-8 border-purple-200 shadow-sm py-0">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg py-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                <CardTitle className="text-2xl">{info.formTitle}</CardTitle>
                </div>
            </div>
            </CardHeader>
            <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Respondent</p>
                    <p className="font-medium">{info.respondentName}</p>
                </div>
                </div>

                <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="font-medium">{info.respondentEmail}</p>
                </div>
                </div>

                <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                    <p className="font-medium">{new Date(info.submittedAt).toLocaleDateString()}</p>
                </div>
                </div>
            </div>
            </CardContent>
        </Card>
    )
}

export default ResponseInfoCard