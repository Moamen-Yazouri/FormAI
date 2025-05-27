import { connection } from "@/DB/connection";
import responseService from "@/module/services/response.service";

export const getFormAnswers = async (id: string, name: string) => {
    await connection();
    try {
        const answers = await responseService.getFormResponses(id, name);
        if(answers.length === 0) {
            return {message: "No answers found!", answers: []};
        }
        return {message: "Success", answers: answers};
    }
    catch (error) {
        if(error instanceof Error) {
            return {message: error.message, answers: []}
        }
        return {message: "Something went wrong!", answers: []}
    }
};