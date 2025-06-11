import FormTemplate from '@/components/form-template/formTemplate';
import { handleAccess } from '@/lib/triggerCoventions';
import { getAccessRights } from '../service/accessRight.service';
export const metadata = {
    title: "View Form | FormAI",
    description:
        "Powerful admin dashboard to oversee form submissions, manage users, and control platform settings in one centralized interface.",
    keywords: [
        "See Form",
        "view form",
        "form review",
        "creator tools",
        "admin tools",
    ],
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "View Forms | FormAI",
        description:
        "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        url: "/view-forms/[id]",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "View Forms | FormAI",
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
    params: Promise<{id: string}>
}
const page = async(props: IProps) => {
    const id = (await props.params).id;
    const access = await getAccessRights(id);
    handleAccess(access);
    return (
        <FormTemplate isPreview={false} id={id} isView={true}/>
    )
}

export default page