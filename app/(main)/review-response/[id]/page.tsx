import React from 'react';
import ResponseDetailsPage from '../components/responseReview';
import FetchDataService from '../service/FetchData.service';
import { getAccessRight } from '../service/accessRight.service';
import { handleAccess } from '@/lib/triggerCoventions';
export const metadata = {
    title: "Review Response | FormAI",
    description:
        "Powerful admin dashboard to oversee form submissions, manage users, and control platform settings in one centralized interface.",
    keywords: [
        "review response",
        "view response",
        "response details",
        "response export",
        "contact",
    ],
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "Review Response | FormAI",
        description:
        "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
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
            "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        images: ["/logo.png"],
    },
    other: {
        formai: "Moamen-Yazouri", 
        charSet: "utf-8", 
    },
};
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