"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { CheckCircle, ClipboardList, Clock } from "lucide-react";
import { IUserForm } from "@/@types";
import AvailableForms from "./availableForms";
import CompletedForms from "./completedForms";
import { IAnsweredForms } from "../types";

interface IProps {
    formsCompleted: number;
    formsAvailable: number;
    averageCompletionTime: string;
    completedForms: IAnsweredForms[];
    availableForms: IUserForm[];
    name: string;
}

export default function UserDashboard(props: IProps) {
    const {
        formsAvailable,
        formsCompleted,
        averageCompletionTime,
        completedForms,
        availableForms,
        name,
    } = props;

    const totalForms = formsCompleted + formsAvailable;
    const completionRate = totalForms === 0 ? 0 : (formsCompleted / totalForms) * 100;

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-indigo-900 text-slate-200 pb-20 pt-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-6 md:px-10"
        >
            <h1 className="text-3xl font-bold text-[#93c1ff] mb-2">My Forms</h1>
            <p className="text-slate-400 mb-8">
            Track your form submissions and see available forms
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Forms Completed */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Card className="bg-gradient-to-br from-slate-950/60 via-blue-900/40 to-indigo-900/40 border border-blue-700/30 shadow-xl backdrop-blur-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-cyan-400 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-cyan-500" />
                    Forms Completed
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-[#93c1ff]">{formsCompleted}</div>
                    <div className="text-sm text-slate-400 mt-1">
                    {totalForms} total assigned
                    </div>
                    <Progress
                    value={completionRate}
                    className="h-2 mt-3 bg-slate-800"
                    indicatorClassName="bg-gradient-to-r from-blue-800 via-indigo-700 to-cyan-500"
                    />
                </CardContent>
                </Card>
            </motion.div>

            {/* Forms Available */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="bg-gradient-to-br from-slate-950/60 via-blue-900/40 to-indigo-900/40 border border-blue-700/30 shadow-xl backdrop-blur-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-cyan-400 flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-cyan-500" />
                    Forms Available
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-[#93c1ff]">{formsAvailable}</div>
                    <div className="text-sm text-slate-400 mt-1">
                    waiting for your response
                    </div>
                    <div className="mt-3 text-sm text-slate-400">
                    {
                        availableForms.filter((form) => form.deadline).length
                    }{" "}
                    with upcoming deadlines
                    </div>
                </CardContent>
                </Card>
            </motion.div>

            {/* Average Time */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Card className="bg-gradient-to-br from-slate-950/60 via-blue-900/40 to-indigo-900/40 border border-blue-700/30 shadow-xl backdrop-blur-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-cyan-400 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-cyan-500" />
                    Average Time
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-[#93c1ff]">
                    {averageCompletionTime}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">to complete a form</div>
                    <div className="mt-3 text-sm text-slate-400">
                    Based on your previous submissions
                    </div>
                </CardContent>
                </Card>
            </motion.div>
            </div>

            {/* Available Forms */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
            >
            <AvailableForms availableForms={availableForms} name={name} />
            </motion.div>

            {/* Completed Forms */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            >
            <CompletedForms completedForms={completedForms} name={name} />
            </motion.div>
        </motion.div>
        </div>
    );
}
