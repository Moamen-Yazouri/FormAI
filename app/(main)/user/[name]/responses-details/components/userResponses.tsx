"use client"

import { motion } from "framer-motion"
import { ArrowLeftIcon, Eye, User, ListChecks } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { IUserResponseDetails } from "@/@types"
import { AuthContext } from "@/providers/auth/authProvider"
import { useContext } from "react"
import { useRouter } from "next/navigation"
import LoadingPage from "@/components/loadingPage/loadingPage"
interface IProps {
    responsesDetails: IUserResponseDetails[];
}
const UserResponsesDetails = (props: IProps) => {
    const router = useRouter();
    const {user, isLoading} = useContext(AuthContext)
    const {responsesDetails} = props;
    if(isLoading) {
        return (
            <div className="w-full min-h-screen bg-white px-4 md:px-10 py-8">
                <LoadingPage/>
            </div>
        )
    }
    return (
        <div className="w-full min-h-screen bg-white px-4 md:px-10 py-8">
        <motion.div
            className="max-w-7xl mx-auto space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Link href={`/user/dashboard/${user!.name}`} className="pl-0 text-purple-800 hover:text-purple-900 hover:bg-transparent -ml-2">
                <ArrowLeftIcon className="h-5 w-5 inline-block mr-1 align-text-top cursor-pointer" />
                Back to Dashboard
            </Link>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Completed Forms</h1>
                <p className="text-gray-600 text-sm">Manage and view your submitted forms.</p>
            </div>
            </div>

            <div className="w-full">
            <div className="rounded-xl bg-gradient-to-r from-purple-100 via-purple-200 to-purple-100 border border-purple-300 shadow flex items-center p-6 md:max-w-md">
                <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-inner border border-purple-300">
                <ListChecks className="h-6 w-6 text-purple-700" />
                </div>
                <div className="ml-4">
                <p className="text-sm font-medium text-purple-700">Total Forms Completed</p>
                <p className="text-3xl font-bold text-purple-900">{responsesDetails.length}</p>
                </div>
            </div>
            </div>


            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-purple-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Form Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Creator</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Completed</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-purple-800 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {responsesDetails.length > 0 ? (
                    responsesDetails.map((rsponse) => (
                        <tr key={rsponse.id} className="hover:bg-purple-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{rsponse.title}</div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-gray-700 max-w-xs truncate">{rsponse.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-purple-500" />
                            <span className="text-gray-700">{rsponse.creator}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{rsponse.createdAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{rsponse.completedAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition cursor-pointer"
                            onClick={() =>{router.push(`/review-response/${rsponse.id}`)}}
                            >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                            </Button>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                        No completed forms found
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
            </div>
        </motion.div>
        </div>
    );
};

export default UserResponsesDetails;
