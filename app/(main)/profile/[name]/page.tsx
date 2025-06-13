import ProfilePage from "../components/profile-Page";
export const metadata = {
    title: "Profile | FormAI",
    description:
        "Manage your account settings. Edit your profile information and update your password securely with Form AI Builder.",
    keywords: [
        "profile",
        "account",
        "settings",
        "change password",
        "change name",
        "change email",
        "change role"
    ],
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "Profile | FormAI",
        description:
        "Update your personal information and change your password securely. Manage your account settings with ease.",
        url: "/profile/[name]",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "Profile | FormAI",
        description:
            "Update your personal information and change your password securely. Manage your account settings with ease.",        
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

export default async function Page() {
    return (
        <ProfilePage />
    )
}
