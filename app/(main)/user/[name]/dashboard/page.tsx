import { Suspense } from "react";
import DashboardContent from "./components/dashboardContent";
import LoadingPage from "@/components/loadingPage/loadingPage";
export const metadata = {
    title: "User Dashboard | FormAI",
    description:
        "Your personal dashboard to manage form submissions, update profile settings, and monitor your activity across Form AI Builder.",
    keywords: [
        "user management",
        "user responses",
        "user moderation",
        "user activity",
        "user tools",
    ],
    metadataBase: new URL(new URL("https://form-ai-gold.vercel.app"),),
    openGraph: {
        title: "User Dashboard | FormAI",
        description:
            "Access your dashboard to view submitted forms, manage account settings, and track your activity in one place.",
        url: "/user/[name]",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "User Dashboard | FormAI",
        description:
            "Access your dashboard to view submitted forms, manage account settings, and track your activity in one place.",
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

interface IProps {
    params: Promise<{name: string}>
}
export default async function UserFormActivityPage(props: IProps) {
    
    const name = decodeURIComponent((await props.params).name);

    return (
        <Suspense fallback={<LoadingPage/>}>
            <DashboardContent name={name} />
        </Suspense>
    )
}
