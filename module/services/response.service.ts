import { IAnswer, IDisplayResponse, IFormResponse, IResponseFromDB } from "@/@types";
import formsRepo from "../repositories/forms.repo";
import responseRepo from "../repositories/response.repo";
import formsService from "./forms.service";
import { getDateOnly } from "@/lib/dateUtils";
import { validateResponse } from "@/lib/validateResponse";


class ResponseService {
        async addResponse (response: IFormResponse) {
        const form = await formsRepo.getFormById(String(response.formId));
        const userId = String(response.userId);
        const formId = String(response.formId);

        if(!form) {
            throw new Error("No form found");
        }

        const isValid = await validateResponse(response.answers, form.fields);

        if(!isValid) {
            throw new Error("Invalid response");
        }

        const prevResponse = await responseRepo.getResponseByUserIdAndFormId(userId, formId);

        if(!prevResponse) {
            let idToSend = userId;
            if(response.anonymous) {
                idToSend = "Anonymous";
            }
            await formsRepo.addRespondant(String(response.formId), idToSend);
            return await responseRepo.addResponse(response);
        }

        else {
            await this.handleEditResponse(prevResponse, response);
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

    async getResponseByUserAndFormId(userId: string, formId: string) {
        const response = await responseRepo.getResponseByUserIdAndFormId(userId, formId);
        return response;
    }
    async getResponseData(id: string) {
        const response = await responseRepo.getResponseData(id);
        if(!response) {
            throw new Error("No response found");
        }
        return response;
    }
    async getResponse(id: string) {
        const response = await responseRepo.getResponseData(id);
        if(!response) {
            throw new Error("No response found");
        }
        const answers: IAnswer[] = response.answers;
        const responseData: IDisplayResponse = {
            formTitle: response.formId.title,
            respondentName: response.anonymous? "Anonymous" : response.userId.name,
            respondentEmail: response.anonymous? "Anonymous" : response.userId.email,
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
        const hideAnonymousNames = responses.map(res => {
                return {
                    ...res,
                    userId: {
                        name: "Anonymous",
                        email: "Anonymous"
                    }
                }
            
        })
        const responsesData = hideAnonymousNames.map(res => {
            return {
                id: String(res._id),
                formTitle: res.formId.title, 
                respondentName: res.userId.name,
                respondentEmail: res.userId.email,
                date: getDateOnly(res.createdAt)}
        })
        return responsesData;
    }
    async handleEditResponse(prevResponse: IResponseFromDB, newResponse: IFormResponse) {
        const uId = String(newResponse.userId);
        const fId = String(prevResponse.formId);
        if(prevResponse.anonymous && !newResponse.anonymous) {
            await formsService.removeAnonymous(fId);
            await formsService.addRespondant(fId, uId);
        }
        else {
            if(newResponse.anonymous) {
                await formsService.removeRespondant(fId, uId);
                await formsService.addAnonymous(fId);
            }
        }
    }
}

export default new ResponseService();