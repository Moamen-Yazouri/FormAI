import React, { Suspense } from 'react';
import PageContent from '../components/pageContent';
import LoadingPage from '@/components/loadingPage/loadingPage';
export const metadata = {
    title: "My Forms | FormAI",
    description:
        "Access and manage all your forms in one place. Edit, share, or analyze form performance with the Form AI Builder page.",
    keywords: [
        "creator forms",
        "admin forms",
        "my forms",
        "created forms",
    ],
    metadataBase: new URL(new URL("https://form-ai-gold.vercel.app"),),
    openGraph: {
        title: "My Forms | FormAI",
        description:
        "View and manage all the forms you’ve created. Edit, duplicate, or track performance from one centralized page.",
        url: "/my-forms/[name]",
        siteName: "FormAI",
        images: ["/landing.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "My Forms | FormAI",
        description:
            "View and manage all the forms you’ve created. Edit, duplicate, or track performance from one centralized page.",
        images: ["/landing.png"],
    },
    other: {
        formai: "Moamen-Yazouri", 
        charSet: "utf-8", 
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
}
interface IProps {
    params: Promise<{name: string}>
}
const page = async (props: IProps) => {
    const name = decodeURIComponent((await props.params).name);
    
    return (
        <Suspense fallback={<LoadingPage />}>
            <PageContent name={name} />
        </Suspense>
    )
}

export default page;