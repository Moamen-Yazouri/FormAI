import { IUserForm } from '@/@types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface IProps {
    availableForms: IUserForm[];
    name: string;
}

const AvailableForms = (props: IProps) => {
    const { availableForms, name } = props;
    const router = useRouter();

    return (
        <div>
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Forms to Answer</h2>

        {availableForms.length === 0 ? (
            <Card className="border-cyan-500 shadow-md p-6 text-center text-slate-200 bg-slate-900">
            You have no pending forms to complete.
            </Card>
        ) : (
            <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableForms.slice(0, 4).map((form) => (
                <Card
                    key={form.id}
                    className="overflow-hidden bg-slate-900 border-cyan-500 text-slate-200"
                >
                    <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div>
                        <p className="text-sm font-medium text-slate-400">
                            {form.description}
                        </p>
                        <h3 className="text-xl font-bold mt-1 text-blue-800">
                            {form.formTitle}
                        </h3>
                        <div className="flex items-center mt-2 text-sm text-slate-400">
                            <User className="h-4 w-4 mr-1" />
                            <span>Created by {form.creator}</span>
                        </div>
                        </div>
                        {form.deadline && (
                        <span className="text-xs font-medium px-2 py-1 bg-slate-800 text-cyan-500 rounded-full">
                            {form.deadline}
                        </span>
                        )}
                    </div>

                    <div className="mt-4">
                        <Button
                        className="w-full text-white bg-gradient-to-r from-blue-800 via-indigo-700 to-cyan-500 hover:from-blue-700 hover:via-indigo-600 hover:to-cyan-400"
                        onClick={() => router.push(`/answer-form/${form.id}`)}
                        >
                        Answer Form <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>

            {availableForms.length > 4 && (
                <div className="text-center mt-6">
                <p className="text-slate-200 mb-3">
                    {availableForms.length - 4} more{' '}
                    {availableForms.length - 4 === 1 ? 'form' : 'forms'} available to
                    answer
                </p>
                <Button
                    variant="outline"
                    className="border-cyan-500 text-cyan-500 hover:bg-slate-800"
                    onClick={() => router.push(`/user/${name}/available-forms`)}
                >
                    Show All Available Forms <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </div>
            )}
            </div>
        )}
        </div>
    );
};

export default AvailableForms;
