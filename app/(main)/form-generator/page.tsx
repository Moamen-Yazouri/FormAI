import FormGeneratorPage from './components/formGeneratorPage';
export const metadata = {
    title: "Form Generator | FormAI",
    description:
        "Powerful admin dashboard to oversee form submissions, manage users, and control platform settings in one centralized interface.",
    keywords: [
        "generate forms",
        "build forms",
        "create forms",
        "AI generator",
    ],
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "All forms | FormAI",
        description:
        "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        url: "/form-generator",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Form Generator | FormAI",
        description:
            "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        images: ["/logo.png"],
    },
    other: {
        formai: "Moamen-Yazouri", 
        charSet: "utf-8", 
    },
};

const page = () => {
  return (
    <FormGeneratorPage />
  )
}

export default page;