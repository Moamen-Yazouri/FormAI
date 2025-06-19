import SignIn from "./components/signin-page";

export const metadata = {
    title: "Sign-In | FormAI",
    description:
        "Sign in to your Form AI Builder account and take control of your intelligent forms. Secure and seamless access to your dashboard.",
    keywords: [
        "Login",
        "signin",
        "sign-in",
        "login to your account",
        "Credentials",
        "authentication",
    ],
    metadataBase: new URL(new URL("https://form-ai-gold.vercel.app"),),
    openGraph: {
        title: "Sign-In | FormAI",
        description:
        "Access your Form AI Builder account to create, manage, and analyze smart forms powered by AI.",
        url: "/sign-in",
        siteName: "FormAI",
        images: ["/signin.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Sign-In | FormAI",
        description:
            "Access your Form AI Builder account to create, manage, and analyze smart forms powered by AI.",
        images: ["/signin.png"],
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
        <SignIn />
    )
}

export default page