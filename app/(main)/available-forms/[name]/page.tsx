import React from 'react'
import fetchDataService from '../service/fetchData.service';
import FormsTable from '@/components/forms-table/formsTable';
export const metadata = {
    title: "Available Forms | FormAI",
    description:
        "Powerful admin dashboard to oversee form submissions, manage users, and control platform settings in one centralized interface.",
    keywords: [
        "view forms",
        "available forms",
        "Your forms"
    ],
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "Available Forms | FormAI",
        description:
        "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        url: "/available-forms/[name]",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Available Forms | FormAI",
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
const AvailableForms = async(props: IProps) => {
    const name = decodeURIComponent((await props.params).name);
    const availableForms = await fetchDataService.getAvailableForms(name);
    return (
        <FormsTable forms= {availableForms} />
    )
}

export default AvailableForms;