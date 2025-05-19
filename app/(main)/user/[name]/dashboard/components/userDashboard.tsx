"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { CheckCircle, ClipboardList, Clock } from "lucide-react"
import { IUserForm } from "@/@types"
import AvailableForms from "./availableForms"
import CompletedForms from "./completedForms"
import { IAnsweredForms } from "../types"

interface IProps {
    formsCompleted: number,
    formsAvailable: number,
    averageCompletionTime: string,
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
            availableForms
        } = props;
    return (
        <div className="w-full p-6 md:p-10 min-h-screen bg-gradient-to-br from-purple-50 to-white">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
        >
            <h1 className="text-3xl font-bold text-purple-700 mb-2">My Forms</h1>
            <p className="text-purple-600 mb-8">Track your form submissions and see available forms</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card className="border-purple-200 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium text-purple-700 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-purple-500" />
                            Forms Completed
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-purple-800">{formsCompleted}</div>
                            <div className="text-sm text-purple-600 mt-1">
                            {formsCompleted + formsAvailable} total assigned
                            </div>
                            <Progress
                                value={(formsCompleted! / (formsCompleted! + formsAvailable!)) * 100}
                                className="h-2 mt-3 bg-purple-100"
                                indicatorClassName="bg-gradient-to-r from-purple-400 to-purple-600"
                            />
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="border-purple-200 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium text-purple-700 flex items-center gap-2">
                            <ClipboardList className="h-5 w-5 text-purple-500" />
                            Forms Available
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-purple-800">{formsAvailable}</div>
                            <div className="text-sm text-purple-600 mt-1">waiting for your response</div>
                            <div className="mt-3 text-sm text-purple-600">
                            {availableForms.filter((form) => form.deadline).length} with upcoming deadlines
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card className="border-purple-200 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium text-purple-700 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-purple-500" />
                        Average Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-purple-800">{averageCompletionTime}</div>
                        <div className="text-sm text-purple-600 mt-1">to complete a form</div>
                        <div className="mt-3 text-sm text-purple-600">Based on your previous submissions</div>
                    </CardContent>
                    </Card>
                </motion.div>
            </div>


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8"
            >
                <AvailableForms availableForms={availableForms} name={props.name}/>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            >
                <CompletedForms completedForms={completedForms} name={props.name}/>
            </motion.div>

        </motion.div>
        </div>
    )
}
