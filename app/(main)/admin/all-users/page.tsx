import React from 'react';
import fetchDataService from '../dashboard/services/fetchData.service';
import UsersTable from '@/components/user-table/userTable';

export const metadata = {
    title: "All users | FormAI",
    description:
        "Monitor and manage every user across the platform. This admin panel gives you full control to all users and creators on the platform.",
    keywords: [
        "admin users management",
        "view all users",
        "users moderation",
        "platform oversight",
        "admin tools",
    ],
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL(new URL("https://formai.vercel.app"),),
    openGraph: {
        title: "All forms | FormAI",
        description:
        "Access a centralized page to view and manage all users and creators. Ensure platform quality, moderate content, and streamline oversight with powerful admin tools.",
        url: "/admin/all-users",
        siteName: "FormAI",
        images: ["/logo.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@FormAI",
        creator: "@Moamen-Yazouri",
        title: "All forms | FormAI",
        description:
            "Access a centralized page to view and manage all users and creators. Ensure platform quality, moderate content, and streamline oversight with powerful admin tools.",
        images: ["/logo.png"],
    },
    other: {
        formai: "Moamen-Yazouri", 
        charSet: "utf-8", 
    },
};
const page = async() => {
    const users = await fetchDataService.usersData();
    return (
        <UsersTable users={users}/>
    )
}

export default page;