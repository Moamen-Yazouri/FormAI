import { 
    IFormTable, 
    IFormCreationData, 
    IFormResponseData, 
    IUserData, 
    IUsersActivityData 
} from "@/@types";

class FetchData {
    private publicNext: string = process.env.NEXT_PUBLIC_URL || "";
    private baseUrl: string = `${this.publicNext}/api/admin`;

    async usersActivity(): Promise<IUsersActivityData[]> {
        try {
            const res = await fetch(`${this.baseUrl}/activity-data`);
            const data = await res.json();
            if(!res.ok) {
                console.error(data.message);
                return [];
            }
            const userActivityData: IUsersActivityData[] = data.usersActivityData;
            return userActivityData;
        }
        catch {
            console.error("faild to fetch users activity data!");
            return []
        }
    }
    
    async formCreationData(): Promise<IFormCreationData[]> {
        try {
            const res = await fetch(`${this.baseUrl}/form-creation-data`);
            const data = await res.json();
            if(!res.ok) {
                console.error(data.message);
                return [];
            }
            const formCreationData: IFormCreationData[] = data.formsCreationData;
            return formCreationData;
        }
        catch {
            console.error("faild to fetch forms creation data!");
            return []
        }
    }

    async formResponsesData() {
        try {
            const res = await fetch(`${this.baseUrl}/form-response-data`);
            const data = await res.json();
            if(!res.ok) {
                console.error(data.message);
                return [];
            }
            const formResponsesData: IFormResponseData[] = data.formResponsesData;
            return formResponsesData;
        }
        catch {

            console.error("faild to fetch forms responses data!");
            return []
        }        
    }

    async usersData(): Promise<IUserData[]> {
        try {
            const res = await fetch(`${this.baseUrl}/users-data`);
            const data = await res.json();
            if(!res.ok) {
                console.error(data.message);
                return [];
            }
            const usersData: IUserData[] = data.usersData;
            return usersData;
        }
        catch {
    
            console.error("faild to fetch users data!");
            return []
        }    
    }
    
    async formsData(): Promise<IFormTable[]> {
        try {
            const res = await fetch(`${this.baseUrl}/forms-data`);
            const data = await res.json();
            if(!res.ok) {
                console.error(data.message);
                return [];
            }
            const formsData: IFormTable[] = data.formsData;
            return formsData;
        }
        catch {
            console.error("faild to fetch forms data!");
            return []
        }    
    }
}

export default new FetchData();