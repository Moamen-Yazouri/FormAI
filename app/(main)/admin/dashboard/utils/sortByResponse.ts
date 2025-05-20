import { IFormTable } from "@/@types";

export const getSortedForms = (forms: IFormTable[]) => {
    const sortedForms = forms.sort((a, b) => {
        return b.responses - a.responses;
    }).slice(0, 5);
    return sortedForms;
}