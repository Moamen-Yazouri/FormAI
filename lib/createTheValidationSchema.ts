import * as yup from "yup";
import { IFormField } from "@/@types";
const numberFields = ["number", "range", "rating", "quantity", "age"];
export const vcreateValidationScehma = (formData: IFormField[]) => {
    const dynamicValidationSchema = formData.reduce((acc, field) => {
        if(numberFields.includes(field.type)) {
            let validator = yup.number();
            field.min && (validator = validator.min(field.min, `The min value is ${field.min}`));
            field.max && (validator = validator.max(field.max, `The max value is ${field.min}`));
            field.required && (validator = validator.required("This field is required"));
            acc[field.fieldId] = validator;
            return acc;
        }
        let validator = yup.string();
        field.required && (validator = validator.required("This field is required"));
        field.type === "email" && (validator = validator.email("Please enter a valid email"));
        field.options && (validator = validator.oneOf(field.options, "Please select a valid option"));
        field.min && (validator = validator.min(field.min, `The min length is ${field.min}`));
        field.max && (validator = validator.max(field.max, `The max length is ${field.max}`));
        acc[field.fieldId] = validator;
        return acc;
    }, {} as Record<string, yup.AnySchema>);
    return dynamicValidationSchema;
}