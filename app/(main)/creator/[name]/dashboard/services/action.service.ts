import { IFormFromDB, IResponseFromDB } from "@/@types";

class ActionServices {
    private nextPublic: string = process.env.NEXT_PUBLIC_URL || "";
    private baseUrl: string = `${this.nextPublic}/api/dashboard`;
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
        catch {

            console.error("faild to delete the form!");
            return null;
        }
    }

    async deleteResponse(responseId: string): Promise<IResponseFromDB | null> {
                try {
            const res = await fetch(`${this.baseUrl}/delete-response`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({responseId}), 
                }
            );
            const data = await res.json();
            if(!res.ok) {
                console.error(data.message);
                return null;
            }
            return data.response as IResponseFromDB;
        }
        catch {
            console.error("faild to delete the response!");
            return null;
        }
    }
}

export default new ActionServices();