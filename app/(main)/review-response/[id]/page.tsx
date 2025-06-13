import React from 'react';
import ResponseDetailsPage from '../components/responseReview';
import FetchDataService from '../service/FetchData.service';
import { getAccessRight } from '../service/accessRight.service';
import { handleAccess } from '@/lib/triggerCoventions';
export const metadata = {
    title: "Review Response | FormAI",
    description:
        "Review and analyze a specific response submitted to your form. Access detailed answers and insights with Form AI Builder.",
    keywords: [
        "review response",
        "view response",
        "response details",
        "response export",
        "contact",
    ],
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "Review Response | FormAI",
        description:
        "Examine individual form submissions in detail. Review answers, assess input quality, and take action if needed.",
        url: "/review-response/[id]",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Review Response | FormAI",
        description:
            "Examine individual form submissions in detail. Review answers, assess input quality, and take action if needed.",
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
    params: Promise<{id: string}>
}
const page = async(props: IProps) => {
    const id = (await props.params).id;
    const validateAccess = await getAccessRight(id);
    handleAccess(validateAccess);
    const response = await FetchDataService.getResponseDetails(id);
    return (
        <ResponseDetailsPage response={response}/>
    )
}

export default page