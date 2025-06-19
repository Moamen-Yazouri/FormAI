import LoadingPage from '@/components/loadingPage/loadingPage';
import { Suspense } from 'react';
import PageContent from '../components/pageContent';

export const metadata = {
    title: "Creator forms | FormAI",
    description:
        "Monitor and manage a creator forms across the platform. This admin panel gives you full control to ensure quality, compliance, and seamless user interactions.",
    keywords: [
        "admin form management",
        "view all forms",
        "form moderation",
        "platform oversight",
        "admin tools",
        "creator forms"
    ],
    metadataBase: new URL(new URL("https://form-ai-gold.vercel.app"),),
    openGraph: {
        title: "Creator Forms | FormAI",
        description:
        "Access a centralized page to view and manage a creator forms. Ensure platform quality, moderate content, and streamline oversight with powerful admin tools.",
        url: "/admin/creator-forms",
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

interface IProps {
    params: Promise < {
        name: string
    } >;
}
const AllForms = async (props : IProps) => {
    const username = (await props.params).name;

    return (
        <Suspense fallback= {<LoadingPage />}>
            <PageContent name={username}/>
        </Suspense>
    )
}

export default AllForms
