import { IUserFromDB } from "@/@types";
import { connection } from "@/DB/connection";

class ActionService {
    private urlAddress: string = process.env.NEXT_PUBLIC_URL || ""; 

    async updateEmail(id: string, email: string): Promise<{message: string, user: IUserFromDB | undefined}> {
        await connection();
        try {
            const res = await fetch(`${this.urlAddress}/api/update/user-email`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id, email})
                }
            );

            const data = await res.json();
            return {message: "Email updated successfully", user: data.updatedUser};
        }
        catch(e) {
            if(e instanceof Error) {
                return {message: e.message, user: undefined};
            }
            return {message: "Something went wrong", user: undefined};
        }
    }

    async updateName(id: string, name: string): Promise<{message: string, user: IUserFromDB | undefined}> {
                await connection();
        try {
            const res = await fetch(`${this.urlAddress}/api/update/user-name`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id, name})
                }
            );

            const data = await res.json();
            return {message: "Name updated successfully", user: data.updatedUser};
        }
        catch(e) {
            if(e instanceof Error) {
                return {message: e.message, user: undefined};
            }
            return {message: "Something went wrong", user: undefined};
        }
    }    
}

export default new ActionService();