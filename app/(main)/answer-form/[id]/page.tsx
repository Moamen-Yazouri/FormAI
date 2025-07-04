import { Suspense } from "react";
import LoadingPage from "@/components/loadingPage/loadingPage";
import PageContent from "../components/pageContent";
export const metadata = {
    title: "Answer Form | FormAI",
    description:
        "Answer AI-enhanced forms designed for speed and accuracy. Submit your responses with ease using Form AI Builder.",
    keywords: [
        "Answer Form",
    ],
    metadataBase: new URL(new URL("https://form-ai-gold.vercel.app"),),
    openGraph: {
        title: "Answer Form | FormAI",
        description:
            "Fill out this AI-powered form to provide your input. Fast, responsive, and tailored to your needs.",
        url: "/answer-form/[id]",
        siteName: "FormAI",
        images: ["/landing.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Answer Form | FormAI",
        description:
            "Fill out this AI-powered form to provide your input. Fast, responsive, and tailored to your needs.",
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
    params: Promise<{id: string}>
}


const AnswerFormPage = async (props: IProps) => {
    const id = (await props.params).id;
    
    
    return (
        <Suspense fallback={<LoadingPage/>}>
            <PageContent id={id} />
        </Suspense>

    );
};

export default AnswerFormPage;