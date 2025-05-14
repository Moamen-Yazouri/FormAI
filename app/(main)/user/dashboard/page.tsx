    "use client"

    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
    import { Progress } from "@/components/ui/progress"
    import { Button } from "@/components/ui/button"
    import { motion } from "framer-motion"
    import { CheckCircle, ClipboardList, Clock, ArrowRight, User } from "lucide-react"
    import { useState, useEffect } from "react"
import { IUserForm, IUserResponseTable } from "@/@types"

    interface UserFormData {
    formsCompleted: number
    formsAvailable: number
    averageCompletionTime: string
    completedForms: IUserResponseTable[]
    availableForms: IUserForm[]
    }
    const initialUserFormData: UserFormData = {
    formsCompleted: 0,
    formsAvailable: 0,
    averageCompletionTime: "",
    completedForms: [],
    availableForms: [],
    }

export default function UserFormActivityPage() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<UserFormData>(initialUserFormData)

    // Simulating data fetch - replace with actual API call
    useEffect(() => {
        // Mock data - replace with actual API call
        const mockData: UserFormData = {
        formsCompleted: 6,
        formsAvailable: 4,
        averageCompletionTime: "3m 45s",
        completedForms: [
            {
                id: "form-1",
                formTitle: "Customer Feedback Survey",
                date: "2 days ago",
            },
            {
                id: "form-2",
                formTitle: "Product Satisfaction",
                date: "1 week ago",
            },
            {
                id: "form-3",
                formTitle: "Website Usability Test",
                date: "2 weeks ago",
            },
            {
                id: "form-4",
                formTitle: "Service Quality Evaluation",
                date: "3 weeks ago",
            },
            {
                id: "form-5",
                formTitle: "Feature Request Form",
                date: "1 month ago",
            },
            {
                id: "form-6",
                formTitle: "User Experience Survey",
                date: "1 month ago",
            },
        ],
        availableForms: [
            {
                id: "form-7",
                formTitle: "Quarterly Feedback",
                description: "Help us improve our services with your quarterly feedback",
                deadline: "3 days left",
                creator: "Sarah Johnson",
            },
            {
                id: "form-8",
                formTitle: "New Feature Evaluation",
                description: "Evaluate our latest features and provide your thoughts",
                deadline: "5 days left",
                creator: "Michael Chen",
            },
            {
                id: "form-9",
                formTitle: "User Satisfaction Survey",
                description: "Tell us about your overall satisfaction with our platform",
                deadline: "1 week left",
                creator: "Alex Rodriguez",
            },
            {
                id: "form-10",
                formTitle: "Product Improvement Ideas",
                description: "Share your ideas on how we can improve our products",
                creator: "Emily Parker",
            },
        ],
        }

        // Simulate loading
        setTimeout(() => {
        setData(mockData)
        setLoading(false)
        }, 1000)
    }, [])

    if (loading) {
        return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="text-purple-600 text-xl">Loading your forms...</div>
        </div>
        )
    }

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
            {/* Forms Completed Card */}
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
                    <div className="text-3xl font-bold text-purple-800">{data?.formsCompleted}</div>
                    <div className="text-sm text-purple-600 mt-1">
                    {data?.formsCompleted + data?.formsAvailable} total assigned
                    </div>
                    <Progress
                    value={(data?.formsCompleted! / (data?.formsCompleted! + data?.formsAvailable!)) * 100}
                    className="h-2 mt-3 bg-purple-100"
                    indicatorClassName="bg-gradient-to-r from-purple-400 to-purple-600"
                    />
                </CardContent>
                </Card>
            </motion.div>

            {/* Forms Available Card */}
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
                    <div className="text-3xl font-bold text-purple-800">{data?.formsAvailable}</div>
                    <div className="text-sm text-purple-600 mt-1">waiting for your response</div>
                    <div className="mt-3 text-sm text-purple-600">
                    {data?.availableForms.filter((form) => form.deadline).length} with upcoming deadlines
                    </div>
                </CardContent>
                </Card>
            </motion.div>

            {/* Average Time Card */}
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
                    <div className="text-3xl font-bold text-purple-800">{data?.averageCompletionTime}</div>
                    <div className="text-sm text-purple-600 mt-1">to complete a form</div>
                    <div className="mt-3 text-sm text-purple-600">Based on your previous submissions</div>
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
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Forms to Answer</h2>
            {data?.availableForms.length === 0 ? (
                <Card className="border-purple-200 shadow-md p-6 text-center text-purple-600">
                You have no pending forms to complete.
                </Card>
            ) : (
                <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data?.availableForms.slice(0, 4).map((form, index) => (
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

                {data?.availableForms.length > 4 && (
                    <div className="text-center mt-6">
                    <p className="text-purple-600 mb-3">
                        {data.availableForms.length - 4} more {data.availableForms.length - 4 === 1 ? "form" : "forms"}{" "}
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
            </motion.div>

            {/* Completed Forms */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            >
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Completed Forms</h2>
            <Card className="border-purple-200 shadow-md">
                <CardContent className="p-6">
                <div className="space-y-4">
                    {data?.completedForms.length === 0 ? (
                    <div className="text-center text-purple-600">You haven't completed any forms yet.</div>
                    ) : (
                    <>
                        {data?.completedForms.slice(0, 4).map((form, index) => (
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

                        {data?.completedForms.length > 4 && (
                        <div className="text-center mt-6">
                            <p className="text-purple-600 mb-3">
                            {data.completedForms.length - 4} more{" "}
                            {data.completedForms.length - 4 === 1 ? "form" : "forms"} completed
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
            </motion.div>
        </motion.div>
        </div>
    )
}
