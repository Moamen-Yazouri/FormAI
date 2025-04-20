"use client" 
import {useState} from "react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
    BarChart,
    LineChart,
    PieChart,
    ChartContainer,
    ChartTooltip,
    Legend,
    Title,
    XAxis,
    YAxis,
    Bar,
    Line,
    Pie,
    Cell,
    ResponsiveContainer
} from "@/components/ui/chart"
import {
    Users,
    FileText,
    MessageSquare,
    Activity,
    MoreVertical,
    Search,
    Trash2,
    Eye,
    UserX,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Calendar
} from 'lucide-react'

// Mock data for the dashboard
const mockUserData = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "active",
        forms: 12,
        lastActive: "2025-04-18"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        status: "active",
        forms: 8,
        lastActive: "2025-04-17"
    },
    {
        id: 3,
        name: "Robert Johnson",
        email: "robert@example.com",
        status: "inactive",
        forms: 3,
        lastActive: "2025-04-10"
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily@example.com",
        status: "active",
        forms: 15,
        lastActive: "2025-04-18"
    }, {
        id: 5,
        name: "Michael Wilson",
        email: "michael@example.com",
        status: "active",
        forms: 6,
        lastActive: "2025-04-16"
    }, {
        id: 6,
        name: "Sarah Brown",
        email: "sarah@example.com",
        status: "inactive",
        forms: 0,
        lastActive: "2025-04-05"
    }, {
        id: 7,
        name: "David Miller",
        email: "david@example.com",
        status: "active",
        forms: 9,
        lastActive: "2025-04-17"
    }, {
        id: 8,
        name: "Lisa Garcia",
        email: "lisa@example.com",
        status: "active",
        forms: 4,
        lastActive: "2025-04-15"
    },
]

const mockFormData = [
    {
        id: 1,
        name: "Contact Form",
        creator: "John Doe",
        responses: 145,
        createdAt: "2025-04-10"
    },
    {
        id: 2,
        name: "Job Application",
        creator: "Emily Davis",
        responses: 78,
        createdAt: "2025-04-12"
    },
    {
        id: 3,
        name: "Customer Survey",
        creator: "Jane Smith",
        responses: 213,
        createdAt: "2025-04-08"
    },
    {
        id: 4,
        name: "Event Registration",
        creator: "Michael Wilson",
        responses: 56,
        createdAt: "2025-04-15"
    }, {
        id: 5,
        name: "Feedback Form",
        creator: "David Miller",
        responses: 92,
        createdAt: "2025-04-11"
    }, {
        id: 6,
        name: "Newsletter Signup",
        creator: "John Doe",
        responses: 187,
        createdAt: "2025-04-09"
    }, {
        id: 7,
        name: "Product Order",
        creator: "Emily Davis",
        responses: 124,
        createdAt: "2025-04-14"
    }, {
        id: 8,
        name: "Support Request",
        creator: "Lisa Garcia",
        responses: 67,
        createdAt: "2025-04-16"
    },
]

// Chart data
const userActivityData = [
    {
        name: "Mon",
        active: 120,
        new: 15
    },
    {
        name: "Tue",
        active: 132,
        new: 12
    },
    {
        name: "Wed",
        active: 141,
        new: 18
    },
    {
        name: "Thu",
        active: 158,
        new: 24
    }, {
        name: "Fri",
        active: 142,
        new: 16
    }, {
        name: "Sat",
        active: 90,
        new: 8
    }, {
        name: "Sun",
        active: 85,
        new: 7
    },
]

const formCreationData = [
    {
        name: "Jan",
        forms: 65
    },
    {
        name: "Feb",
        forms: 78
    },
    {
        name: "Mar",
        forms: 90
    },
    {
        name: "Apr",
        forms: 112
    }, {
        name: "May",
        forms: 130
    }, {
        name: "Jun",
        forms: 142
    }, {
        name: "Jul",
        forms: 151
    }, {
        name: "Aug",
        forms: 160
    }, {
        name: "Sep",
        forms: 175
    }, {
        name: "Oct",
        forms: 190
    }, {
        name: "Nov",
        forms: 205
    }, {
        name: "Dec",
        forms: 220
    },
]

const formResponsesData = [
    {
        name: "Contact Form",
        value: 145
    },
    {
        name: "Job Application",
        value: 78
    },
    {
        name: "Customer Survey",
        value: 213
    },
    {
        name: "Event Registration",
        value: 56
    }, {
        name: "Feedback Form",
        value: 92
    },
]

const COLORS = [
    '#8b5cf6',
    '#a78bfa',
    '#c4b5fd',
    '#ddd6fe',
    '#ede9fe'
]

export default function AdminDashboard() {
    const [searchUsers, setSearchUsers] = useState("")
    const [searchForms, setSearchForms] = useState("")
    const [userToDelete, setUserToDelete] = useState < number | null > (null)

    // Filter users based on search
    const filteredUsers = mockUserData.filter(user => user.name.toLowerCase().includes(searchUsers.toLowerCase()) || user.email.toLowerCase().includes(searchUsers.toLowerCase()))

    // Filter forms based on search
    const filteredForms = mockFormData.filter(form => form.name.toLowerCase().includes(searchForms.toLowerCase()) || form.creator.toLowerCase().includes(searchForms.toLowerCase()))

    // Calculate total stats
    const totalUsers = mockUserData.length
    const activeUsers = mockUserData.filter(user => user.status === "active").length
    const totalForms = mockFormData.length
    const totalResponses = mockFormData.reduce((sum, form) => sum + form.responses, 0)

    // Handle user deletion
    const handleDeleteUser = (userId : number) => { // In a real app, you would call an API to delete the user
        console.log(`Deleting user with ID: ${userId}`)
        setUserToDelete(null)
        // Then refresh the user list
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 pb-20 pt-0 md:pt-0 w-full">
            <header className="bg-white border-b border-purple-100 shadow-sm sticky top-0 z-10 mt-14 md:mt-0">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-xl font-bold text-purple-900">Admin Dashboard</h1>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Dashboard Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="bg-white border border-purple-100">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="users" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900">
                            Users
                        </TabsTrigger>
                        <TabsTrigger value="forms" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900">
                            Forms
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                                    <Users className="h-4 w-4 text-purple-600"/>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-purple-900">
                                        {totalUsers}</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        <span className="text-green-600 font-medium flex items-center">
                                            <ArrowUpRight className="h-3 w-3 mr-1"/>
                                            12% from last month
                                        </span>
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                                    <Activity className="h-4 w-4 text-purple-600"/>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-purple-900">
                                        {activeUsers}</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        <span className="text-green-600 font-medium flex items-center">
                                            <ArrowUpRight className="h-3 w-3 mr-1"/>
                                            8% from last month
                                        </span>
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Forms</CardTitle>
                                    <FileText className="h-4 w-4 text-purple-600"/>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-purple-900">
                                        {totalForms}</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        <span className="text-green-600 font-medium flex items-center">
                                            <ArrowUpRight className="h-3 w-3 mr-1"/>
                                            15% from last month
                                        </span>
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Form Responses</CardTitle>
                                    <MessageSquare className="h-4 w-4 text-purple-600"/>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-purple-900">
                                        {totalResponses}</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        <span className="text-red-600 font-medium flex items-center">
                                            <ArrowDownRight className="h-3 w-3 mr-1"/>
                                            3% from last month
                                        </span>
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* User Activity Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>User Activity</CardTitle>
                                    <CardDescription>Daily active users and new registrations</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-2">
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={userActivityData}>
                                                <XAxis dataKey="name"/>
                                                <YAxis/>
                                                <ChartTooltip/>
                                                <Legend/>
                                                <Bar dataKey="active" name="Active Users" fill="#8b5cf6"/>
                                                <Bar dataKey="new" name="New Users" fill="#c4b5fd"/>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Form Creation Trend */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Form Creation Trend</CardTitle>
                                    <CardDescription>Monthly form creation activity</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-2">
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={formCreationData}>
                                                <XAxis dataKey="name"/>
                                                <YAxis/>
                                                <ChartTooltip/>
                                                <Line type="monotone" dataKey="forms" name="Forms Created" stroke="#8b5cf6"
                                                    strokeWidth={2}/>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Form Responses Distribution */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Form Responses Distribution</CardTitle>
                                    <CardDescription>Top forms by number of responses</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-2">
                                    <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={formResponsesData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    label={
                                                        ({name, percent}) => `${name}: ${
                                                            (percent * 100).toFixed(0)
                                                        }%`
                                                }>
                                                    {
                                                    formResponsesData.map((entry, index) => (
                                                        <Cell key={
                                                                `cell-${index}`
                                                            }
                                                            fill={
                                                                COLORS[index % COLORS.length]
                                                            }/>
                                                    ))
                                                } </Pie>
                                                <ChartTooltip/>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recent Activity */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Latest actions on the platform</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {
                                        [
                                            {
                                                user: "John Doe",
                                                action: "created a new form",
                                                time: "2 hours ago",
                                                icon: FileText
                                            },
                                            {
                                                user: "Emily Davis",
                                                action: "received 24 new responses",
                                                time: "4 hours ago",
                                                icon: MessageSquare
                                            },
                                            {
                                                user: "Jane Smith",
                                                action: "updated their profile",
                                                time: "6 hours ago",
                                                icon: Users
                                            },
                                            {
                                                user: "Michael Wilson",
                                                action: "created a new form",
                                                time: "8 hours ago",
                                                icon: FileText
                                            }, {
                                                user: "David Miller",
                                                action: "received 12 new responses",
                                                time: "10 hours ago",
                                                icon: MessageSquare
                                            },
                                        ].map((activity, i) => (
                                            <div key={i}
                                                className="flex items-center gap-3">
                                                <div className="bg-purple-100 p-2 rounded-full">
                                                    <activity.icon className="h-4 w-4 text-purple-600"/>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">
                                                        <span className="text-purple-900">
                                                            {
                                                            activity.user
                                                        }</span>
                                                        {
                                                        activity.action
                                                    } </p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Calendar className="h-3 w-3"/> {
                                                        activity.time
                                                    } </p>
                                                </div>
                                            </div>
                                        ))
                                    } </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Users Tab */}
                    <TabsContent value="users" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Management</CardTitle>
                                <CardDescription>View and manage all users on the platform</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center mb-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                        <Input placeholder="Search users..." className="pl-8 bg-white"
                                            value={searchUsers}
                                            onChange={
                                                (e) => setSearchUsers(e.target.value)
                                            }/>
                                    </div>
                                </div>

                                <div className="rounded-md border">

                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Forms Tab */}
                    <TabsContent value="forms" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Form Analytics</CardTitle>
                                <CardDescription>View and analyze all forms on the platform</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center mb-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                        <Input placeholder="Search forms..." className="pl-8 bg-white"
                                            value={searchForms}
                                            onChange={
                                                (e) => setSearchForms(e.target.value)
                                            }/>
                                    </div>
                                </div>

                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Form Name</TableHead>
                                                <TableHead>Creator</TableHead>
                                                <TableHead>Responses</TableHead>
                                                <TableHead>Created Date</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody> {
                                            filteredForms.map((form) => (
                                                <TableRow key={
                                                    form.id
                                                }>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <FileText className="h-4 w-4 text-purple-600"/>
                                                            <span className="font-medium">
                                                                {
                                                                form.name
                                                            }</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{
                                                        form.creator
                                                    }</TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                                                            {
                                                            form.responses
                                                        } </Badge>
                                                    </TableCell>
                                                    <TableCell>{
                                                        form.createdAt
                                                    }</TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreVertical className="h-4 w-4"/>
                                                                    <span className="sr-only">Open menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem className="flex items-center gap-2">
                                                                    <Eye className="h-4 w-4"/>
                                                                    View Form
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="flex items-center gap-2">
                                                                    <MessageSquare className="h-4 w-4"/>
                                                                    View Responses
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator/>
                                                                <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-600">
                                                                    <Trash2 className="h-4 w-4"/>
                                                                    Delete Form
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        } </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
