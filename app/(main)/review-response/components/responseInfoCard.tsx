import { IDisplayResponse } from '@/@types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDateOnly } from '@/lib/dateUtils';
import { Calendar, Mail, User } from 'lucide-react';
import React from 'react';

interface IProps {
    info: Omit<IDisplayResponse, "responses">
}

const ResponseInfoCard = (props: IProps) => {
    const { info } = props

    return (
        <Card className="mb-8 border border-cyan-500/20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 shadow-xl backdrop-blur-sm text-slate-200 pt-0">
        <CardHeader className="bg-gradient-to-r from-cyan-700/20 via-blue-700/20 to-indigo-700/20 rounded-t-lg py-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {info.formTitle}
                </CardTitle>
            </div>
            </div>
        </CardHeader>

        <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <User className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                <p className="text-sm font-medium text-slate-400">Respondent</p>
                <p className="font-medium text-slate-100">{info.respondentName}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Mail className="h-5 w-5 !text-cyan-400" />
                </div>
                <div>
                <p className="text-sm font-medium text-slate-400">Email</p>
                <p className="font-medium text-slate-100">{info.respondentEmail}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 !text-cyan-400" />
                </div>
                <div>
                <p className="text-sm font-medium text-slate-400">Submitted</p>
                <p className="font-medium text-slate-100">
                    {getDateOnly(new Date(info.submittedAt))}
                </p>
                </div>
            </div>
            </div>
        </CardContent>
        </Card>
    )
}

export default ResponseInfoCard
