import { IFormFromDB, IUserFromDB } from "@/@types";

class ActionsService {
    private baseUrl: string = "http://localhost:3000//api/dashboard";

    async deleteForm(formId: string): Promise<IFormFromDB | null> {
        try {
            const res = await fetch(`${this.baseUrl}/delete-from`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({formId}), 
                }
            );
            const data = await res.json();
            if(!res.ok) {
                console.error(data.message);
                return null;
            }
            return data.deletedForm as IFormFromDB;
        }
        catch(err) {
            if(err instanceof Error) {
                console.error(err.message);
            }
            console.error("faild to delete the form!");
            return null;
        }
    }
    async deleteUser(userId: string): Promise<IUserFromDB | null> {

        try {
            const res = await fetch(`${this.baseUrl}/delete-user`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({userId}), 
                }
            );
            const data = await res.json();
            if(!res.ok) {
                console.error(data.message);
                return null;
            }
            return data.deletedUser as IUserFromDB;
        }
        catch(err) {
            if(err instanceof Error) {
                console.error(err.message);
            }
            console.error("faild to delete the user!");
            return null;
        }
    }
}

export default new ActionsService();