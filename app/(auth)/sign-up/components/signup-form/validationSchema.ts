import * as yup from "yup";
import {ERole} from "@/@types/index";
export const validationSchema = yup.object({
    name: yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters long"),

    email: yup.string()
        .required("Email is required")
        .email("Invalid email format"),
        
    role: yup.string()
        .required("Role is required")
        .oneOf(Object.values(ERole), "Invalid role"),
    
    password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number"),
    
    confirmedPassword: yup.string()
        .required("Confirmed password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
})