    "use client"

    import { useEffect, useState } from "react"
    import { motion } from "framer-motion"
    import { Button } from "@/components/ui/button"
    import { Card, CardHeader, CardTitle } from "@/components/ui/card"
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
    import { ArrowLeft, Calendar, Filter, Search, User } from "lucide-react"
    import { Input } from "@/components/ui/input"
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
    import { getDateOnly } from "@/lib/dateUtils"

    interface CompletedFormData {
    id: string
    name: string
    description: string
    creator: string
    createdAt: string
    completedAt?: string
    }

    export default function CompletedFormsPage() {
    const [loading, setLoading] = useState(true)
    const [forms, setForms] = useState<CompletedFormData[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [timeFilter, setTimeFilter] = useState("all")
    const [creatorFilter, setCreatorFilter] = useState("all")

    // Simulated fetch
    useEffect(() => {
        const responseFromDB: any[] = [
        {
            _id: "form-1",
            title: "Customer Feedback Survey",
            description: "Customer service feedback",
            creatorId: { name: "Sarah Johnson" },
            createdAt: new Date("2023-04-15"),
            completedAt: "2 days ago",
        },
        {
            _id: "form-2",
            title: "Product Satisfaction",
            description: "Rate satisfaction",
            creatorId: { name: "Michael Chen" },
            createdAt: new Date("2023-04-20"),
            completedAt: "1 week ago",
        },
        ]

        const mapped = responseFromDB.map(form => ({
        id: String(form._id),
        name: form.title,
        description: form.description,
        creator: form.creatorId?.name ?? "Unknown",
        createdAt: getDateOnly(form.createdAt),
        completedAt: form.completedAt,
        }))

        setForms(mapped)
        setLoading(false)
    }, [])

    const filteredForms = forms.filter((form) => {
        const matchesSearch =
        form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCreator = creatorFilter === "all" || form.creator === creatorFilter
        const matchesTime =
        timeFilter === "all" ||
        (timeFilter === "week" && form.completedAt?.includes("week")) ||
        (timeFilter === "month" && (form.completedAt?.includes("week") || form.completedAt?.includes("day"))) ||
        (timeFilter === "older" && form.completedAt?.includes("month"))

        return matchesSearch && matchesCreator && matchesTime
    })

    const creators = ["all", ...new Set(forms.map(form => form.creator))]

    if (loading) {
        return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="text-purple-600 text-xl">Loading completed forms...</div>
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
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
                <Button
                variant="ghost"
                className="mb-2 pl-0 text-purple-700 hover:text-purple-800 hover:bg-transparent"
                onClick={() => window.history.back()}
                >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
                <h1 className="text-3xl font-bold text-purple-700">Completed Forms</h1>
                <p className="text-purple-600">View all your completed form submissions</p>
            </div>
            <Card className="w-full md:w-auto border-purple-200 shadow-sm">
                <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-purple-700 flex items-center">
                    {forms.length} forms completed
                </CardTitle>
                </CardHeader>
            </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative w-full md:w-2/5">
                <Input
                placeholder="Search forms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-purple-200"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">
                <Search className="h-4 w-4" />
                </div>
            </div>

            <div className="w-full md:w-1/5">
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="border-purple-200">
                    <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-purple-500" />
                    <SelectValue placeholder="Filter by time" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="older">Older</SelectItem>
                </SelectContent>
                </Select>
            </div>

            <div className="w-full md:w-1/5">
                <Select value={creatorFilter} onValueChange={setCreatorFilter}>
                <SelectTrigger className="border-purple-200">
                    <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-purple-500" />
                    <SelectValue placeholder="Filter by creator" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    {creators.map((creator) => (
                    <SelectItem key={creator} value={creator}>
                        {creator === "all" ? "All Creators" : creator}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </div>

            {/* Table */}
            <Card className="border-purple-200 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                <TableHeader className="bg-purple-50">
                    <TableRow>
                    <TableHead className="text-purple-700">Form Name</TableHead>
                    <TableHead className="text-purple-700">Creator</TableHead>
                    <TableHead className="text-purple-700">Created Date</TableHead>
                    <TableHead className="text-purple-700 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredForms.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-purple-600">
                        No completed forms match your search criteria
                        </TableCell>
                    </TableRow>
                    ) : (
                    filteredForms.map((form) => (
                        <TableRow key={form.id} className="hover:bg-purple-50">
                        <TableCell className="font-medium text-purple-800">{form.name}</TableCell>
                        <TableCell className="text-purple-700 flex items-center">
                            <User className="h-3.5 w-3.5 mr-1.5 text-purple-500" />
                            {form.creator}
                        </TableCell>
                        <TableCell className="text-purple-700 flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1.5 text-purple-500" />
                            {form.createdAt}
                        </TableCell>
                        <TableCell className="text-right">
                            <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-200 text-purple-700 hover:bg-purple-50"
                            onClick={() => (window.location.href = `/form/${form.id}/view`)}
                            >
                            View
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))
                    )}
                </TableBody>
                </Table>
            </div>
            </Card>
        </motion.div>
        </div>
    )
    }
