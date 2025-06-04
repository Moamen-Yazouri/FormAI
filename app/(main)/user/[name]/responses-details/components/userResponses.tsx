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
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 px-4 md:px-10 py-8 text-slate-200">
        <motion.div
            className="max-w-7xl mx-auto space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Link
                href={`/user/dashboard/${user!.name}`}
                className="text-cyan-400 hover:text-cyan-300 hover:bg-transparent -ml-2"
            >
                <ArrowLeftIcon className="h-5 w-5 inline-block mr-1" />
                Back to Dashboard
            </Link>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Completed Forms</h1>
                <p className="text-slate-400 text-sm">Manage and view your submitted forms.</p>
            </div>
            </div>

            {/* Summary Card */}
            <div className="rounded-xl bg-gradient-to-r from-cyan-800/30 via-blue-900/30 to-cyan-800/30 border border-cyan-700 shadow-lg flex items-center p-6 md:max-w-md backdrop-blur-sm">
            <div className="flex-shrink-0 bg-slate-950 rounded-full p-3 shadow-inner border border-cyan-700">
                <ListChecks className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-cyan-300">Total Forms Completed</p>
                <p className="text-3xl font-bold text-white">{responsesDetails.length}</p>
            </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-800">
                <thead className="bg-slate-800">
                    <tr>
                    {["Form Title", "Description", "Creator", "Created", "Completed", "Actions"].map((col) => (
                        <th
                        key={col}
                        className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider"
                        >
                        {col}
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody className="bg-gradient-to-br from-blue-900/40 via-indigo-800/30 to-cyan-600/40 divide-y divide-slate-800">
                    {responsesDetails.length > 0 ? (
                    responsesDetails.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-800/50 transition">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-white">{r.title}</td>
                        <td className="px-6 py-4 text-slate-300 max-w-xs truncate">{r.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center text-slate-300">
                            <User className="h-4 w-4 mr-2 text-cyan-400" />
                            {r.creator}
                        </td>
                        <td className="px-6 py-4 text-slate-400">{r.createdAt}</td>
                        <td className="px-6 py-4 text-slate-400">{r.completedAt}</td>
                        <td className="px-6 py-4 text-right">
                            <Button
                            size="sm"
                            variant="outline"
                            className="border-cyan-700 text-cyan-400 hover:bg-cyan-700/20 hover:text-white"
                            onClick={() => router.push(`/review-response/${r.id}`)}
                            >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                            </Button>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
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
