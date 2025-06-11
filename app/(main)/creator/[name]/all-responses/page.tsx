import React from 'react'
import fetchDataService from '../dashboard/services/fetchData.service';
import ResponsesTable from '@/components/responses-table/responsesTable';
export const metadata = {
    title: "Creator Forms Responses | FormAI",
    description:
        "Powerful admin dashboard to oversee form submissions, manage users, and control platform settings in one centralized interface.",
    keywords: [
        "creator responses management",
        "view all responses",
        "responses moderation",
        "creator tools",
    ],
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "All forms | FormAI",
        description:
        "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        url: "/creator/[name]/all-responses",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Creator Forms Responses | FormAI",
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
    params: Promise<{name: string}>
}
const page = async (props: IProps) => {
    const name = decodeURIComponent((await props.params).name);
    const responses = await fetchDataService.creatorResponses(name)
    return (
        <ResponsesTable responses={responses} />
    )
}

export default page;