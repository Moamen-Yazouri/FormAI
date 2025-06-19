import React, { Suspense } from 'react';
import PageContent from './components/pageContent';
import LoadingPage from '@/components/loadingPage/loadingPage';

export const metadata = {
    title: "All forms | FormAI",
    description:
        "Monitor and manage every form created across the platform. This admin panel gives you full control to ensure quality, compliance, and seamless user interactions.",
    keywords: [
        "admin form management",
        "view all forms",
        "form moderation",
        "platform oversight",
        "admin tools",
    ],

    metadataBase: new URL(new URL("https://form-ai-gold.vercel.app"),),
    openGraph: {
        title: "All forms | FormAI",
        description:
        "Access a centralized page to view and manage all creators forms. Ensure platform quality, moderate content, and streamline oversight with powerful admin tools.",
        url: "/admin/all-forms",
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
            "Access a centralized page to view and manage all creators forms. Ensure platform quality, moderate content, and streamline oversight with powerful admin tools.",
        images: ["/landing.png"],
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
        <Suspense fallback={<LoadingPage/>}>
            <PageContent />
        </Suspense>
    )
}

export default page;