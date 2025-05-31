"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import React from "react";
import { IAnsweredForms } from "../types";
import { useRouter } from "next/navigation";

interface IProps {
    completedForms: IAnsweredForms[];
    name: string;
}

const CompletedForms = ({ completedForms, name }: IProps) => {
    const router = useRouter();

    return (
        <div>
        <h2 className="text-2xl font-bold text-[#93c1ff] mb-4">Completed Forms</h2>

        <Card className="bg-gradient-to-br from-slate-950/60 via-blue-900/40 to-indigo-900/40 border border-blue-700/30 shadow-xl backdrop-blur-sm">
            <CardContent className="p-6">
            <div className="space-y-4">
                {completedForms.length === 0 ? (
                <div className="text-center text-slate-400">
                    You haven't completed any forms yet.
                </div>
                ) : (
                <>
                    {completedForms.map((form) => (
                    <div
                        key={form.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-blue-800/30 hover:bg-blue-900/20 transition-colors"
                    >
                        <div className="flex items-center">
                        <div className="bg-blue-800/20 p-2 rounded-full mr-3">
                            <CheckCircle className="h-5 w-5 text-cyan-500" />
                        </div>
                        <div>
                            <h3 className="font-medium text-slate-100">{form.title}</h3>
                            <p className="text-sm text-slate-400">Completed {form.date}</p>
                        </div>
                        </div>
                        <Button
                        variant="outline"
                        className="border-cyan-600 text-cyan-400 hover:bg-cyan-500/10"
                        onClick={() => router.push(`/user/${name}/responses-details`)}
                        >
                        Show All Responses Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                    ))}
                </>
                )}
            </div>
            </CardContent>
        </Card>
        </div>
    );
};

export default CompletedForms;
