import AdminDashboard from './components/adminDashboard';
import FetchData from "./services/fetchData.service";
import { getActives } from './utils/getActives';
export const dynamic = "force-dynamic";
export const metadata = {
    title: "Admin Dashboard | FormAI",
    description:
        "Powerful admin dashboard to oversee form submissions, manage users, and control platform settings in one centralized interface.",
    keywords: [
        "admin form management",
        "view all forms",
        "form moderation",
        "platform oversight",
        "admin tools",
    ],
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "All forms | FormAI",
        description:
        "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        url: "/admin/dashboard",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Admin Dashboard | FormAI",
        description:
            "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        images: ["/logo.png"],
    },
    other: {
        formai: "Moamen-Yazouri", 
        charSet: "utf-8", 
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1
}

const page = async() => {

    const [
        userActivityData,
        formCreationData,
        formResponsesData,
        usersData,
        formsData,
    ] = await Promise.all([
        FetchData.usersActivity(),      
        FetchData.formCreationData(),
        FetchData.formResponsesData(),
        FetchData.usersData(),
        FetchData.formsData(),
    ]);
    const activeUsers = getActives(usersData);
    return (
        <AdminDashboard 
            usersData={usersData}
            formsData={formsData}
            userActivityData={userActivityData}
            formCreationData={formCreationData}
            formResponsesData={formResponsesData} 
            activeUsers={activeUsers}        
        />
    )
}

export default page