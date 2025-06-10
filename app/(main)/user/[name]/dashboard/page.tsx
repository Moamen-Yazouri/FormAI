import UserDashboard from "./components/userDashboard";
import fetchDataService from "./service/fetchData.service";
export const metadata = {
    title: "User Dashboard | FormAI",
    description:
        "Powerful admin dashboard to oversee form submissions, manage users, and control platform settings in one centralized interface.",
    keywords: [
        "user management",
        "user responses",
        "user moderation",
        "user activity",
        "user tools",
    ],
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "User Dashboard | FormAI",
        description:
        "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        url: "/user/[name]",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "User Dashboard | FormAI",
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
export default async function UserFormActivityPage(props: IProps) {
    const name = decodeURIComponent((await props.params).name);
    const [
        responses,
        availableForms,
    ] = await Promise.all([
        fetchDataService.answeredForms(name),
        fetchDataService.availableForms(name),
    ]) 
    const data = {
        formsCompleted: responses.length,
        formsAvailable: availableForms.length,
        averageCompletionTime: "3m 45s",
        availableForms,
        completedForms: responses,
    }
    return (
        <UserDashboard {...data} name={name}/>
    )
}
