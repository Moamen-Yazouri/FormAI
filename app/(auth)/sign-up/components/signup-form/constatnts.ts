import { IUser } from "@/@types";
import { FormValues } from "./types";

export const INITIAL_VALUES: FormValues= {
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
    role: "user",
}