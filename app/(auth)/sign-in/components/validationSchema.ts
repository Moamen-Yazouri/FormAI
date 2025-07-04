import * as yup from "yup";

export const validationSchema = yup.object().shape({
    email: yup.string()
    .required("Email is required")
    .email("Invalid email format"),

    password: yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
})