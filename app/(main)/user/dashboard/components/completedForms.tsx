import { IUserResponseTable } from '@/@types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle } from 'lucide-react'
import React from 'react'
interface IProps {
    completedForms: IUserResponseTable[];
}
const CompletedForms = (props: IProps) => {
    const {completedForms} = props;
    return (
        <div>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Completed Forms</h2>
            <Card className="border-purple-200 shadow-md">
                <CardContent className="p-6">
                <div className="space-y-4">
                    {completedForms.length === 0 ? (
                    <div className="text-center text-purple-600">You haven't completed any forms yet.</div>
                    ) : (
                    <>
                        {completedForms.slice(0, 4).map((form, index) => (
                        <div
                            key={form.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-purple-100 hover:bg-purple-50 transition-colors"
                        >
                            <div className="flex items-center">
                            <div className="bg-purple-100 p-2 rounded-full mr-3">
                                <CheckCircle className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-800">{form.formTitle}</h3>
                                <p className="text-sm text-purple-600">Completed {form.date}</p>
                            </div>
                            </div>
                            <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-200 text-purple-700 hover:bg-purple-50"
                            onClick={() => (window.location.href = `/form/${form.id}/view`)}
                            >
                            View
                            </Button>
                        </div>
                        ))}

                        {completedForms.length > 4 && (
                        <div className="text-center mt-6">
                            <p className="text-purple-600 mb-3">
                            {completedForms.length - 4} more{" "}
                            {completedForms.length - 4 === 1 ? "form" : "forms"} completed
                            </p>
                            <Button
                            variant="outline"
                            className="border-purple-300 text-purple-700 hover:bg-purple-50"
                            onClick={() => (window.location.href = "/my-forms/completed")}
                            >
                            Show All Completed Forms <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                        )}
                    </>
                    )}
                </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CompletedForms