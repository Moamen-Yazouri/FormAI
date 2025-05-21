import { IAnswer, IDisplayResponse, IFormResponse } from "@/@types";
import formsRepo from "../repositories/forms.repo";
import { generateValidationScehma } from "@/lib/createTheValidationSchema";
import responseRepo from "../repositories/response.repo";

class ResponseService {
        async addResponse (response: IFormResponse) {
        const form = await formsRepo.getFormById(String(response.formId));
        if(!form) {
            throw new Error("No form found");
        }
        const isValid = generateValidationScehma(form.fields).validate(response, {abortEarly: true});
        if(!isValid) {
            throw new Error("Invalid response");
        }
        return await formsRepo.addResponse(response);
    }

    async getResponse(id: string) {
        const response = await responseRepo.getResponseData(id);
        const answers: IAnswer[] = response.answers;
        if(!response) {
            throw new Error("No response found");
        }
        const responseData: IDisplayResponse = {
            formTitle: response.formId.title,
            respondentName: response.userId.name,
            respondentEmail: response.userId.email,
            submittedAt: response.createdAt,
            responses: answers.map(answer => {
                {
                    return {
                        fieldId: String(answer.fieldId).replace(/([A-Z])/g, " $1").trim(),
                        answer: answer.answer
                    }
                }
            })
        }
        return responseData;
    }

    async deleteResponse(id: string) {
        const response = await responseRepo.getResponseById(id);
        if(!response) {
            throw new Error("No response found");
        }
        return response;
    }

    async deleteFromResponses(formId: string) {
        const responses = await responseRepo.deleteFormResponses(formId);
        if(!responses) {
            throw new Error("Error deleting user responses");
        }
        return responses;
    }
    async deleteUserResponses(userId: string) {
        const responses = await responseRepo.deleteUserResponses(userId);
        if(!responses) {
            throw new Error("Error deleting user responses");
        }
        return responses;
    }
}

export default new ResponseService();