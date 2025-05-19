import { IUserForm } from '@/@types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, User } from 'lucide-react';
import React from 'react';
interface IProps {
    availableForms: IUserForm[];
}
const AvailableForms = (props: IProps) => {
    const {availableForms} = props;
    return (
        <div>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Forms to Answer</h2>
            {availableForms.length === 0 ? (
                <Card className="border-purple-200 shadow-md p-6 text-center text-purple-600">
                You have no pending forms to complete.
                </Card>
            ) : (
                <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableForms.slice(0, 4).map((form, index) => (
                    <Card key={form.id} className="border-purple-200 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                            <CardTitle className="text-lg font-medium text-purple-700">{form.formTitle}</CardTitle>
                            <CardDescription className="text-purple-600 mt-1">{form.description}</CardDescription>
                            <div className="flex items-center mt-2 text-sm text-purple-500">
                                <User className="h-3.5 w-3.5 mr-1" />
                                <span className="text-gray-500">Created by {form.creator}</span>
                            </div>
                            </div>
                            {form.deadline && (
                            <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                                {form.deadline}
                            </span>
                            )}
                        </div>
                        </CardHeader>
                        <CardContent>
                        <Button
                            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                            onClick={() => (window.location.href = `/form/${form.id}`)}
                        >
                            Answer Form <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        </CardContent>
                    </Card>
                    ))}
                </div>

                {availableForms.length > 4 && (
                    <div className="text-center mt-6">
                    <p className="text-purple-600 mb-3">
                        {availableForms.length - 4} more {availableForms.length - 4 === 1 ? "form" : "forms"}{" "}
                        available to answer
                    </p>
                    <Button
                        variant="outline"
                        className="border-purple-300 text-purple-700 hover:bg-purple-50"
                        onClick={() => (window.location.href = "/my-forms/available")}
                    >
                        Show All Available Forms <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    </div>
                )}
                </div>
            )}
        </div>
    )
}

export default AvailableForms