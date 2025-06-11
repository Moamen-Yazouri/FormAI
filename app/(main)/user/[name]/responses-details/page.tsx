import CompletedFormsPage from './components/userResponses';
import fetchDataService from '../dashboard/service/fetchData.service';
export const metadata = {
    title: "Responses Details | FormAI",
    description:
        "Powerful admin dashboard to oversee form submissions, manage users, and control platform settings in one centralized interface.",
    keywords: [
        "responses table",
        "view all responses",
        "my responses",
        "user responses",
        "user tools",
    ],
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "Responses Details | FormAI",
        description:
        "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        url: "/user/[name]/responses-details",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Responses Details | FormAI",
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