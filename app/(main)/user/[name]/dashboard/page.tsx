import UserDashboard from "./components/userDashboard";
import fetchDataService from "./service/fetchData.service";
export const metadata = {
    title: "User Dashboard | FormAI",
    description:
        "Your personal dashboard to manage form submissions, update profile settings, and monitor your activity across Form AI Builder.",
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
            "Access your dashboard to view submitted forms, manage account settings, and track your activity in one place.",
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
            "Access your dashboard to view submitted forms, manage account settings, and track your activity in one place.",
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
