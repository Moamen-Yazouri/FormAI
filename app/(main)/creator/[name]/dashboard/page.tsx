import CreatorDashboard from '../dashboard/components/creatorDashboard';
import FetchServices from '../dashboard/services/fetchData.service';
export const metadata = {
    title: "Creator Dashboard | FormAI",
    description:
        "Powerful admin dashboard to oversee form submissions, manage users, and control platform settings in one centralized interface.",
    keywords: [
        "creator management",
        "view creator forms",
        "form moderation",
        "responses moderation",
        "creator tools",
    ],
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "Creator Dashboard | FormAI",
        description:
        "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        url: "/creator/[name]/dashboard",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Creator Dashboard | FormAI",
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
const page = async (props: IProps) => {
      const name = decodeURIComponent((await props.params).name); 

      const [
        formData,
        formCreationData,
        formResponseData,
        creatorActivityData,
        responses,
    ] = await Promise.all([
        FetchServices.formsData(name),      
        FetchServices.formCreationData(name),
        FetchServices.formResponseData(name),
        FetchServices.creatorActivityData(name),
        FetchServices.creatorResponses(name),
    ]);
  return (
    <CreatorDashboard 
      formsData={formData} 
      formCreationData={formCreationData} 
      formResponsesData={formResponseData} 
      creatorActivityData={creatorActivityData}
      responses={responses}
    />
  )
}

export default page