import { IFormFromDB, IFormTable, IResponsePopulatedCreator } from "@/@types";
import { ICreatorResponses } from "@/app/(main)/creator/[name]/dashboard/types";
import { getDateOnly } from "@/lib/dateUtils";


export const formatCreatorResponses = (responses: IResponsePopulatedCreator[]) => {
    const formatedResponses: ICreatorResponses[] = responses.filter(
            response => response.formId !== null
        )
        .map(
            res => ({
                id: String(res._id),
                formTitle: res.formId.title, 
                respondentName: res.userId.name,
                respondentEmail: res.userId.email,
                date: getDateOnly(res.createdAt)
            })
        );
        return sortCreatorResponses(formatedResponses);
}

export const sortCreatorResponses = (responses: ICreatorResponses[]) => {
    return responses.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        })
}

export const formatCreatorForms = (forms: IFormFromDB[], name: string) => {
    const formsData: IFormTable[] = forms.map((form) => {
            const responses = (form.answeredBy?.length || 0) + (form?.anonymousNumber || 0);
            return {
                id: String(form._id),
                name: form.title,
                creator: name,
                description: form.description,
                createdAt: getDateOnly(form.createdAt),
                responses: responses,
                deadline: form.expiredAt ? getDateOnly(form.expiredAt) : "No deadline",
            }
    });
    return formsData;
}