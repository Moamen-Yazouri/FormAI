import { IContextUser } from "@/@types";

export const getLoggedUser = async () => {
        try {
            const res = await fetch("/api/auth/provide-logged-user", {
                method: "GET",
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                }
            })
            const data = await res.json();

            return  data.user as IContextUser;
        
        }
        catch {
            return null;
        }
} 