import SignIn from "./components/signin-page"

export const metadata = {
    title: "Sign-In | FormAI",
    description:
        "Powerful admin dashboard to oversee form submissions, manage users, and control platform settings in one centralized interface.",
    keywords: [
        "Login",
        "signin",
        "sign-in",
        "login to your account",
        "Credentials",
        "authentication",
    ],
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "Sign-In | FormAI",
        description:
        "Access the admin dashboard to manage users, forms, and platform activity. Monitor submissions, enforce policies, and maintain control over your application's operations.",
        url: "/sign-in",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Sign-In | FormAI",
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
    <SignIn />
  )
}

export default page