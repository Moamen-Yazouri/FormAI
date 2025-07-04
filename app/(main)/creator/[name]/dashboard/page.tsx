import { Suspense } from 'react';
import DashboardContent from './components/dashboardContent';
import LoadingPage from '@/components/loadingPage/loadingPage';
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
    metadataBase: new URL(new URL("https://form-ai-gold.vercel.app"),),
    openGraph: {
        title: "Creator Dashboard | FormAI",
        description:
          "Manage your forms, track response data, and build smarter user experiences with your personalized dashboard.",
        url: "/creator/[name]/dashboard",
        siteName: "FormAI",
        images: ["/landing.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Creator Dashboard | FormAI",
        description:
            "Manage your forms, track response data, and build smarter user experiences with your personalized dashboard.",
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
const page = async (props: IProps) => {
  const name = decodeURIComponent((await props.params).name); 
  return (
    <Suspense fallback={<LoadingPage />}>
      <DashboardContent name={name} />
    </Suspense>
  )
}

export default page