import LandingPage from '@/components/landing/landingPage';
export const metadata = {
  title: "FormAI | AI-Driven Form Builder",
  description:
    "FormAI helps you generate, manage, and share smart forms effortlessly using AI. Streamline data collection, publishing, and response analysis with a modern UI.",
  keywords: [
    "FormAI",
    "AI form builder",
    "generate forms",
    "smart forms",
    "form creation",
    "collect responses",
    "form management",
    "AI-driven forms"
  ],
  metadataBase: new URL("https://form-ai-gold.vercel.app"),
  openGraph: {
    title: "FormAI | AI-Driven Form Builder",
    description:
      "Create and manage intelligent forms powered by AI. Design custom workflows, share forms, and analyze submissions easily with FormAI.",
    url: "https://form-ai-gold.vercel.app",
    siteName: "FormAI",
    images: ["/landing.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@FormAI",
    creator: "@Moamen-Yazouri",
    title: "FormAI | AI-Driven Form Builder",
    description:
      "AI-powered form creation and response management made simple. Explore FormAI to streamline your workflow and improve data quality.",
    images: ["/landing.png"],
  },
  other: {
    formai: "Moamen-Yazouri",
    charSet: "utf-8",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const page = () => {
  return (
    <LandingPage />
  )
}

export default page;