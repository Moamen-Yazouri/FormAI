import { connection } from "@/DB/connection";

export const getFormAnswers = async (id: string) => {
    await connection();
    try {
        
    }
    catch (error) {
        return [];
    }
};