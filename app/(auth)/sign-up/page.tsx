import SignUp from "./components/signup-form/signup-page";

export const metadata = {
    title: "Sign-Up | FormAI",
    description:
        "Sign up for Form AI Builder to unlock powerful tools for creating, sharing, and analyzing intelligent forms tailored to your business needs.",
    keywords: [
        "signup",
        "sign-up",
        "create account",
        "new account",
    ],
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "Sign-Up | FormAI",
        description:
        "Create your Form AI Builder account and start building intelligent, dynamic forms powered by AI.",
        url: "/sign-up",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Sign-Up | FormAI",
        description:
            "Create your Form AI Builder account and start building intelligent, dynamic forms powered by AI.",
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
        <SignUp />
    )
}

export default page