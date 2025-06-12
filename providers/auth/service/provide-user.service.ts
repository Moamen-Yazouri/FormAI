import { IContextUser } from "@/@types";

export const provideUser = async() => {
        try {
            const res = await fetch("/api/auth/provide-logged-user", {
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