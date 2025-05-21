import { IFormTable } from "@/@types";
import { ICreatorResponses } from "../types";

function parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); 
}
export function summarizeForms(forms: IFormTable[]): IFormTable[] {
    return forms
        .sort((a, b) => b.responses - a.responses)
        .slice(0, 5);
}

export function summarizeResponses(responses: ICreatorResponses[]): ICreatorResponses[] {
    return responses
        .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
        .slice(0, 5);
}


