import CompletedFormsPage from './components/userResponses';
import fetchDataService from '../dashboard/service/fetchData.service';
export const metadata = {
    title: "Responses Details | FormAI",
    description:
        "Access all the responses you’ve submitted through Form AI Builder. Review your answers and track form participation history easily.",
    keywords: [
        "responses table",
        "view all responses",
        "my responses",
        "user responses",
        "user tools",
    ],
    metadataBase: new URL(new URL("https://form-ai-gold.vercel.app"),),
    openGraph: {
        title: "Responses Details | FormAI",
        description:
        "View and manage the responses you’ve submitted to forms. Keep track of your activity and submissions in one place.",
        url: "/user/[name]/responses-details",
        siteName: "FormAI",
        images: ["/landing.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Responses Details | FormAI",
        description:
            "View and manage the responses you’ve submitted to forms. Keep track of your activity and submissions in one place.",
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
    params: Promise<{name: string}>;
}
const page = async(props: IProps) => {
    const nameParam = (await props.params);
    const name = decodeURIComponent(nameParam.name); 
    const responseDetails = await fetchDataService.getUserResponseDetails(name);
    return (
        <CompletedFormsPage responsesDetails={responseDetails} />
    )
}

export default page