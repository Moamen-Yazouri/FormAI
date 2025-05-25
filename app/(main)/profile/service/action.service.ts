import { IUserFromDB } from "@/@types";


class ActionService {
    private urlAddress: string = process.env.NEXT_PUBLIC_URL || ""; 

    async updateEmail(id: string, email: string): Promise<{message: string, user: IUserFromDB | undefined}> {
        try {
            const res = await fetch(`${this.urlAddress}/api/auth/aut/update/user-email`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id, email})
                }
            );

            const data = await res.json();
            return {message: `Email updated to: ${data.updatedUser.email}, successfully`, user: data.updatedUser};
        }
        catch(e) {
            if(e instanceof Error) {
                return {message: e.message, user: undefined};
            }
            return {message: "Something went wrong", user: undefined};
        }
    }

    async updateName(id: string, name: string): Promise<{message: string, user: IUserFromDB | undefined}> {
    
        try {
            const res = await fetch(`${this.urlAddress}/api/auth/update/user-name`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id, name})
                }
            );

            const data = await res.json();
            return {message: `Name updated to: ${data.updatedUser.name}, successfully`, user: data.updatedUser};
        }
        catch(e) {
            if(e instanceof Error) {
                return {message: e.message, user: undefined};
            }
            return {message: "Something went wrong", user: undefined};
        }
    }

    async updateRole(id: string, role: string): Promise<{message: string, user: IUserFromDB | undefined}> {
        try {
            const res = await fetch(`${this.urlAddress}/api/auth/update/user-role`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id, role})
                }
            );

            const data = await res.json();
            return {message: `Role updated to: ${data.updatedUser.role}, successfully`, user: data.updatedUser};
        }
        catch(e) {
            if(e instanceof Error) {
                return {message: e.message, user: undefined};
            }
            return {message: "Something went wrong", user: undefined};
        }
    }

    async updatePassword(id: string, prevPassword: string, newPassword: string): Promise<{message: string, user: IUserFromDB | undefined}> {
        try {
            const res = await fetch(`${this.urlAddress}/api/auth/update/user-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id, prevPassword, newPassword})
                }
            );

            const data = await res.json();
            return {message: `Password updated successfully!`, user: data.updatedUser}; 
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