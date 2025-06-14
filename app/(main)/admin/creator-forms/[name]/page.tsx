import {connection} from '@/DB/connection';
import dashboardService from '@/module/services/admin/dashboard.service';
import FormsTable from '@/components/forms-table/formsTable';
export const dynamic = "force-dynamic";
export const metadata = {
    title: "Creator forms | FormAI",
    description:
        "Monitor and manage a creator forms across the platform. This admin panel gives you full control to ensure quality, compliance, and seamless user interactions.",
    keywords: [
        "admin form management",
        "view all forms",
        "form moderation",
        "platform oversight",
        "admin tools",
        "creator forms"
    ],
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "Creator Forms | FormAI",
        description:
        "Access a centralized page to view and manage a creator forms. Ensure platform quality, moderate content, and streamline oversight with powerful admin tools.",
        url: "/admin/creator-forms",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "All forms | FormAI",
        description:
            "Access a centralized page to view and manage all creators forms. Ensure platform quality, moderate content, and streamline oversight with powerful admin tools.",
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
    params: Promise < {
        name: string
    } >;
}
const AllForms = async (props : IProps) => {
    const username = (await props.params).name;
    await connection();
    const userFormsData = await dashboardService.getCreatorForms(username);
    return (
        <FormsTable forms={userFormsData}/>
    )
}

export default AllForms
