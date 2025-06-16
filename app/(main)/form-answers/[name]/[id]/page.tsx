import React from 'react';
import { getFormAnswers } from '../../service/answers.service';
import ResponsesTable from '@/components/responses-table/responsesTable';
import { getAccessRights } from '../../service/accessRights.service';
import { handleAccess } from '@/lib/triggerCoventions';
export const metadata = {
    title: "Form Answers | FormAI",
    description:
        "View and manage detailed responses for your form. Gain insights from user input and track engagement in real time.",
    keywords: [
        "admin answers management",
        "creator answers management",
        "view all answers",
        "answers moderation",
        "admin tools",
        "creator tools",
    ],
    metadataBase: new URL(new URL("https://form-ai-gold.vercel.app"),),
    openGraph: {
        title: "Form Answers | FormAI",
        description:
        "Review individual responses submitted to your form. Filter, analyze, and manage data effortlessly with AI-enhanced tools.",
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
            "Review individual responses submitted to your form. Filter, analyze, and manage data effortlessly with AI-enhanced tools.",
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
    params: Promise<{id: string, name: string}>
}
const page = async(props: IProps) => {
    const {id, name} = await props.params;
    const validName = decodeURIComponent(name);
    const access = await getAccessRights(id);
    handleAccess(access);

    const { answers} = await getFormAnswers(id, validName);
    console.log(answers);
    return (
        <ResponsesTable responses={answers} />
    )
}

export default page