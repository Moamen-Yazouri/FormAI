import FormTemplate from "@/components/form-template/formTemplate";
import { getAccessRights } from "../service/accessRights.service";
import { handleAccess } from "@/lib/triggerCoventions";
export const metadata = {
    title: "Answer Form | FormAI",
    description:
        "Powerful admin dashboard to oversee form submissions, manage users, and control platform settings in one centralized interface.",
    keywords: [
        "Answer Form",
    ],
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "Answer Form | FormAI",
        description:
        "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        url: "/answer-form/[id]",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Answer Form | FormAI",
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


const AnswerFormPage = async (props: IProps) => {
  const id = (await props.params).id;
  const accessRight = await getAccessRights(id);
  handleAccess(accessRight);
  
  return (
    <FormTemplate id={id} isPreview={false}  isView={false}/>
    
  );
};

export default AnswerFormPage;