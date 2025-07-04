import { IFormField } from "@/@types";
import { IFormValues } from "./types";

export const getInitials = (fields: IFormField[]) => {
    const intitialValues: IFormValues = fields.reduce((acc, field) => {
            if (Array.isArray(field.options) && field.type === "radio") {
                acc[field.fieldId.toLowerCase()] = [];
            }
            else if(field.type === "checkbox") {
                acc[field.fieldId.toLowerCase()] = false;
            }
            else {
                acc[field.fieldId.toLowerCase()] = "";
            }
        return acc;
    }, {} as IFormValues);
    return intitialValues;
}