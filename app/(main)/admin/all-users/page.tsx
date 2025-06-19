import React, { Suspense } from 'react';
import LoadingPage from '@/components/loadingPage/loadingPage';
import PageContent from './components/pageContent';

export const metadata = {
    title: "All users | FormAI",
    description:
        "Monitor and manage every user across the platform. This admin panel gives you full control to all users and creators on the platform.",
    keywords: [
        "admin users management",
        "view all users",
        "users moderation",
        "platform oversight",
        "admin tools",
    ],
    metadataBase: new URL(new URL("https://form-ai-gold.vercel.app"),),
    openGraph: {
        title: "All forms | FormAI",
        description:
        "Access a centralized page to view and manage all users and creators. Ensure platform quality, moderate content, and streamline oversight with powerful admin tools.",
        url: "/admin/all-users",
        siteName: "FormAI",
        images: ["/landing.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "All forms | FormAI",
        description:
            "Access a centralized page to view and manage all users and creators. Ensure platform quality, moderate content, and streamline oversight with powerful admin tools.",
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
    return (
        <Suspense fallback={<LoadingPage />}>
            <PageContent />
        </Suspense>
    )
}

export default page;