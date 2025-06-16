import { IAnswer, IFormField } from "@/@types";
import { generateValidationSchema } from "./createTheValidationSchema";

export const validateResponse = async(answers: IAnswer[], fields: IFormField[]) => {
        const validation: {[key: string]: any} = {};

        answers.forEach(answer => {
            validation[String(answer.fieldId).toLowerCase()] = answer.answer;
        })

        const isValid = await generateValidationSchema(fields).isValid(validation);

        return isValid;
}