import { IAnswer, IDisplayResponse, IFormResponse } from "@/@types";
import formsRepo from "../repositories/forms.repo";
import responseRepo from "../repositories/response.repo";
import formsService from "./forms.service";
import { getDateOnly } from "@/lib/dateUtils";
import { generateValidationSchema } from "@/lib/createTheValidationSchema";


class ResponseService {
        async addResponse (response: IFormResponse) {
        const form = await formsRepo.getFormById(String(response.formId));

        if(!form) {
            throw new Error("No form found");
        }
        const validation: {[key: string]: any} = {};
        response.answers.forEach(answer => {
            validation[String(answer.fieldId).toLowerCase()] = answer.answer;
        })
        console.log(generateValidationSchema(form.fields));
        const isValid = await generateValidationSchema(form.fields).isValid(validation);

        if(!isValid) {
            throw new Error("Invalid response");
        }
        const responded = form.answeredBy.some(res => res === response.userId);
        if(!responded) {
            let idToSend = String(response.userId);
            if(response.anonymous) {
                idToSend = "Anonymous";
            }
            await formsRepo.addRespondant(String(response.formId), idToSend);
            return await responseRepo.addResponse(response);
        }
        else {
            console.log("Already responded");
            return await responseRepo.updateResponse(response);
        }
    }
    async getResponseById(id: string) {
        const response = await responseRepo.getResponseById(id);
        if(!response) {
            throw new Error("No response found");
        }
        return response;
    }
    async getResponse(id: string) {
        const response = await responseRepo.getResponseData(id);
        const answers: IAnswer[] = response.answers;
        if(!response) {
            throw new Error("No response found");
        }
        const responseData: IDisplayResponse = {
            formTitle: response.formId.title,
            respondentName: response.userId.name || "Anonymous",
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

    async getFormResponses(formId: string, creatorName: string) {
        const isOwner = await formsService.ensureFormCreator(formId, creatorName);
        if(!isOwner) {
            throw new Error("You are not the owner of this form");
        }
        const responses = await responseRepo.getFormResponses(formId);
        if(!responses) {
            throw new Error("No responses found");
        }
        const responsesData = responses.map(res => {
            return {
                id: String(res._id),
                formTitle: res.formId.title, 
                respondentName: res.userId.name,
                respondentEmail: res.userId.email,
                date: getDateOnly(res.createdAt)}
        })
        return responsesData;
    }
}

export default new ResponseService();