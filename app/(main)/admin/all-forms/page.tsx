import { IFormTable } from '@/@types';
import React from 'react';
import fetchDataService from '../dashboard/services/fetchData.service';
import FormsTable from '@/components/forms-table/formsTable';

export const dynamic = "force-dynamic";

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

    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "All forms | FormAI",
        description:
        "Access a centralized page to view and manage all creators forms. Ensure platform quality, moderate content, and streamline oversight with powerful admin tools.",
        url: "/admin/all-forms",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "All forms | FormAI",
        description:
            "Access a centralized page to view and manage all creators forms. Ensure platform quality, moderate content, and streamline oversight with powerful admin tools.",
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

    const forms: IFormTable[] = await fetchDataService.formsData();
    return (
        <FormsTable forms={forms}/>
    )
}

export default page;