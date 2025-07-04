import React, { Suspense } from 'react';
import PageContent from './components/pageContent';
import LoadingPage from '@/components/loadingPage/loadingPage';

export const metadata = {
    title: "Creator Forms Responses | FormAI",
    description:
        "Access all responses submitted to your forms. Track feedback, export data, and extract insights using our intuitive AI-powered dashboard.",
    keywords: [
        "creator responses management",
        "view all responses",
        "responses moderation",
        "creator tools",
    ],
    metadataBase: new URL(new URL("https://form-ai-gold.vercel.app"),),
    openGraph: {
        title: "All forms | FormAI",
        description:
        "View and analyze responses submitted to your forms. Gain insights and manage data effortlessly with Form AI Builder.",
        url: "/creator/[name]/all-responses",
        siteName: "FormAI",
        images: ["/landing.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Creator Forms Responses | FormAI",
        description:
            "View and analyze responses submitted to your forms. Gain insights and manage data effortlessly with Form AI Builder.",
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

interface IProps {
    params: Promise<{name: string}>
}
const page = async (props: IProps) => {
    const name = decodeURIComponent((await props.params).name);

    return (
        <Suspense fallback={<LoadingPage />}>
            <PageContent name={name}/>
        </Suspense>
    )
}

export default page;