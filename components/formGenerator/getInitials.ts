import { IFormField } from "@/@types";
import { IFormValues } from "./types";

export const getInitials = (fields: IFormField[]) => {
    const intitialValues: IFormValues = fields.reduce((acc, field) => {
            if (field.type === "checkbox") {
                acc[field.name || field.label.toLowerCase()] = false;
            }
            else {
                acc[field.name || field.label.toLowerCase()] = "";
            }
        return acc;
    }, {} as IFormValues);
    return intitialValues;
}