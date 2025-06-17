import FormTemplate from '@/components/form-template/formTemplate';
import { handleAccess } from '@/lib/triggerCoventions';
import { getAccessRights } from '../service/accessRight.service';
export const metadata = {
    title: "View Form | FormAI",
    description:
        "Review the layout, logic, and content of your form as a creator or admin. Ensure everything is correct before sharing or analyzing responses.",
    keywords: [
        "See Form",
        "view form",
        "form review",
        "creator tools",
        "admin tools",
    ],
    metadataBase: new URL(new URL("https://form-ai-gold.vercel.app"),),
    openGraph: {
        title: "View Forms | FormAI",
        description:
            "Preview and inspect the structure of your form. Ensure accuracy, logic, and design before publishing or reviewing responses.",
        url: "/view-forms/[id]",
        siteName: "FormAI",
        images: ["/landing.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "View Forms | FormAI",
        description:
            "Preview and inspect the structure of your form. Ensure accuracy, logic, and design before publishing or reviewing responses.",
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
const page = async(props: IProps) => {
    const id = (await props.params).id;
    const access = await getAccessRights(id);
    handleAccess(access);
    return (
        <FormTemplate isPreview={false} id={id} isView={true}/>
    )
}

export default page