import { IAnswer } from '@/@types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

interface IProps {
    item: IAnswer;
    qNo: number;
}

const QuestionCard = ({ qNo, item }: IProps) => {
    return (
        <Card className="pt-0 overflow-hidden border border-cyan-500/10 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 shadow-md backdrop-blur-sm text-slate-200">
        <CardHeader className="bg-gradient-to-r from-cyan-700/10 via-blue-700/10 to-indigo-700/10 py-4">
            <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-slate-400">Question {qNo}</p>
                <CardTitle className="text-base font-medium mt-1 text-slate-100">
                {String(item.fieldId)}
                </CardTitle>
            </div>
            </div>
        </CardHeader>

        <CardContent className="pt-4">
            {String(item.answer).length > 100 ? (
            <div className="bg-slate-800/50 border border-cyan-500/10 p-4 rounded-md text-slate-200 whitespace-pre-wrap">
                {item.answer}
            </div>
            ) : (
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 p-3 rounded-md">
                {String(item.answer)}
            </div>
            )}
        </CardContent>
        </Card>
    )
}

export default QuestionCard
