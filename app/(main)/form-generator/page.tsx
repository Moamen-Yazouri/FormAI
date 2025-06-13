import FormGeneratorPage from './components/formGeneratorPage';
export const metadata = {
    title: "Form Generator | FormAI",
    description:
        "Build smart forms using our AI-powered generator. Customize layouts, set conditions, and launch dynamic forms in minutes.",
    keywords: [
        "generate forms",
        "build forms",
        "create forms",
        "AI generator",
    ],
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "All forms | FormAI",
        description:
            "Create intelligent, responsive forms with our AI-powered builder. Customize fields, logic, and design effortlessly.",
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
            "Create intelligent, responsive forms with our AI-powered builder. Customize fields, logic, and design effortlessly.",
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

const page = () => {
    return (
        <FormGeneratorPage />
    )
}

export default page;