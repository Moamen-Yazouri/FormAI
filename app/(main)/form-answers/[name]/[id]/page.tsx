import React from 'react'
import { getFormAnswers } from '../../service/answers.service';
import ResponsesTable from '@/components/responses-table/responsesTable';
import { getAccessRights } from '../../service/accessRights.service';
import { handleAccess } from '@/lib/triggerCoventions';
export const metadata = {
    title: "Form Answers | FormAI",
    description:
        "Powerful admin dashboard to oversee form submissions, manage users, and control platform settings in one centralized interface.",
    keywords: [
        "admin answers management",
        "creator answers management",
        "view all answers",
        "answers moderation",
        "admin tools",
        "creator tools",
    ],
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "Form Answers | FormAI",
        description:
        "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        url: "/form-answers/[name]/[id]",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Form Answers | FormAI",
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
    params: Promise<{id: string, name: string}>
}
const page = async(props: IProps) => {
    const {id, name} = await props.params;
    const validName = decodeURIComponent(name);
    const access = await getAccessRights(id, name);
    handleAccess(access);

    const { answers} = await getFormAnswers(id, validName);
    return (
        <ResponsesTable responses={answers} />
    )
}

export default page