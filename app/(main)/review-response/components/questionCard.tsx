import { IAnswer } from '@/@types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
interface IProps {
    item: IAnswer;
    qNo: number;
}
const QuestionCard = (props: IProps) => {
    const {qNo, item} = props;
    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 py-4">
                <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-muted-foreground">Question {qNo}</p>
                    <CardTitle className="text-base font-medium mt-1">{String(item.fieldId)}</CardTitle>
                </div>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                { String(item.answer).length > 100 ? (
                <div className="bg-gray-50 p-4 rounded-md">
                    <p className="whitespace-pre-wrap">{item.answer}</p>
                </div>
                ) : (
                <div className="bg-purple-50 p-3 rounded-md text-purple-800">{item.answer}</div>
                )}
            </CardContent>
        </Card>
    )
}

export default QuestionCard