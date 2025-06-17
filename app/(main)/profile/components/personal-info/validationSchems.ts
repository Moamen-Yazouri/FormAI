import * as yup from "yup";
export const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    role: yup.string().oneOf(["user", "creator", "admin"]).required("Role is required"),
});