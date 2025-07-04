import * as Yup from 'yup';
export const validationSchema = Yup.object({
    prevPassword: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number"),

    newPassword: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("newPassword")], "Passwords must match"),
})