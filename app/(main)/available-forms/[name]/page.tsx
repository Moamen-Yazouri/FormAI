import React from 'react'
import fetchDataService from '../service/fetchData.service';
import FormsTable from '@/components/forms-table/formsTable';

export const metadata = {
    title: "Available Forms | FormAI",
    description:
        "Discover and access a wide range of available forms created using Form AI Builder. Join surveys, provide feedback, or submit responses easily.",
    keywords: [
        "view forms",
        "available forms",
        "Your forms"
    ],
    metadataBase: new URL(new URL("https://form-ai-gold.vercel.app"),),
    openGraph: {
        title: "Available Forms | FormAI",
        description:
        "Explore all available forms created by the community. Browse, preview, and participate in AI-enhanced data collection.",
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
            "Explore all available forms created by the community. Browse, preview, and participate in AI-enhanced data collection.",
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
    params: Promise<{name: string}>
}
const AvailableForms = async(props: IProps) => {
    const name = decodeURIComponent((await props.params).name);
    const availableForms = await fetchDataService.getAvailableForms(name);
    return (
        <FormsTable forms= {availableForms} available={true}/>
    )
}

export default AvailableForms;