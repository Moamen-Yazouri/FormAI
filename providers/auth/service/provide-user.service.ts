import { IContextUser } from "@/@types";

export const provideUser = async() => {
        const publicNext: string = process.env.NEXT_PUBLIC_URL || "";
        try {
            const res = await fetch(`${publicNext}/api/auth/provide-logged-user`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                }
            })

            
                const { user }: { user: IContextUser } = await res.json();
                return user;
            
        }
        catch {
            return null;
        }

    }