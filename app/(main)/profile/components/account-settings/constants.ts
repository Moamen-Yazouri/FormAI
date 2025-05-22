import { FormValues } from "./types";

export const INITIAL_VALUES: FormValues = {
    email: "",
    name: "",
} 
export const OPTIONS: IOptions[] = [
    {
        value: "user",
        label: "User",
    },
    {
        value: "creator",
        label: "Creator",
    },

]