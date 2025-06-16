import * as yup from "yup";
import { IFormField } from "@/@types";

const numberFields = ["number", "range", "rating", "quantity", "age"];

export const generateValidationSchema = (formData: IFormField[]) => {
    const dynamicValidationSchema = formData.reduce((acc, field) => {
        if (numberFields.includes(field.type)) {
            let validator = yup.number();
            
            if (field.min) {
                validator = validator.min(field.min, `The min value is ${field.min}`);
            }
            if (field.max) {
                validator = validator.max(field.max, `The max value is ${field.max}`);
            }
            if (field.required) {
                validator = validator.required("This field is required");
            }
            
            acc[field.fieldId.toLowerCase()] = validator;
            return acc;
        }
        if(field.type === "checkbox") {
            let validator = yup.boolean();

            if (field.required) {
                validator = validator.required("This field is required");
            }

            acc[field.fieldId.toLowerCase()] = validator;
            return acc;
        }
        if (field.type === "radio") {
            let validator = yup.string();

            if (field.required) {
                if(field.options?.length) {
                    const trimmedOptions = field.options.map((option) => option.trim());
                    validator = validator.oneOf(
                        trimmedOptions,
                        "Please select a valid option"
                        );

                }
            }

            acc[field.fieldId.toLowerCase()] = validator;
            return acc;
        }

        let validator = yup.string();
        
        if (field.required) {
            validator = validator.required("This field is required");
        }
        if (field.type === "email") {
            validator = validator.email("Please enter a valid email");
        }
        if (field.options?.length) {
            validator = validator.oneOf(field.options, "Please select a valid option");
        }
        if (field.min) {
            validator = validator.min(field.min, `The min length is ${field.min}`);
        }
        if (field.max) {
            validator = validator.max(field.max, `The max length is ${field.max}`);
        }
        
        acc[field.fieldId.toLowerCase()] = validator;
        return acc;
    }, {} as Record<string, yup.Schema<any>>);
    
    return yup.object(dynamicValidationSchema);
}