import CreatorDashboard from '../dashboard/components/creatorDashboard';
import FetchServices from '../dashboard/services/fetchData.service';

export const metadata = {
    title: "Creator Dashboard | FormAI",
    description:
        "Access your creator dashboard to build new forms, view response metrics, and manage your published forms—all in one place.",
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
          "Manage your forms, track response data, and build smarter user experiences with your personalized dashboard.",
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
            "Manage your forms, track response data, and build smarter user experiences with your personalized dashboard.",
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