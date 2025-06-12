import * as yup from "yup";
import { IFormField } from "@/@types";
const numberFields = ["number", "range", "rating", "quantity", "age"];
export const generateValidationScehma = (formData: IFormField[]) => {
    const dynamicValidationSchema = formData.reduce((acc, field) => {
        if(numberFields.includes(field.type)) {
            let validator = yup.number();
            field.min && (validator = validator.min(field.min, `The min value is ${field.min}`));
            field.max && (validator = validator.max(field.max, `The max value is ${field.min}`));
            field.required && (validator = validator.required("This field is required"));
            acc[field.fieldId.toLowerCase()] = validator;
            return acc;
        }
        if (field.type === "checkbox") {
            let validator = yup.boolean();

            if (field.required) {
                validator = validator.oneOf([true], "required field");
            }

            acc[field.fieldId.toLowerCase()] = validator;
            return acc;
        }

        let validator = yup.string();
        field.required && (validator = validator.required("This field is required"));
        field.type === "email" && (validator = validator.email("Please enter a valid email"));
        field.options?.length && (validator = validator.oneOf(field.options, "Please select a valid option"));
        field.min && (validator = validator.min(field.min, `The min length is ${field.min}`));
        field.max && (validator = validator.max(field.max, `The max length is ${field.max}`));
        acc[field.fieldId.toLowerCase()] = validator;
        return acc;
    }, {} as Record<string, yup.Schema<any>>);
    return  yup.object(dynamicValidationSchema);
}