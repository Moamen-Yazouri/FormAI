import React from 'react'
import FormsTable from '@/components/forms-table/formsTable';
import { getCreatorForms } from '../service/fetchData.service';
export const metadata = {
    title: "My Forms | FormAI",
    description:
        "Powerful admin dashboard to oversee form submissions, manage users, and control platform settings in one centralized interface.",
    keywords: [
        "creator forms",
        "admin forms",
        "my forms",
        "created forms",
    ],
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "My Forms | FormAI",
        description:
        "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        url: "/my-forms/[name]",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "My Forms | FormAI",
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
    const forms = await getCreatorForms(name)
    return (
        <FormsTable forms={forms}/>
    )
}

export default page;