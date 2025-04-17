import { IUser } from "@/@types";
import { validationSchema } from "@/app/(auth)/sign-up/components/signup-form/validationSchema";
import authRepo from "../repositories/auth.repo";
import { hashPassword } from "@/lib/compareAndHash";
import xss from "xss";

class AuthService {
    async signUp(user: IUser) {
        const validateUser = await validationSchema.validate(user);
        if(!validateUser) {
            throw new Error("Invalid data");
        }

        const existingUser = await authRepo.findUserByEmail(user.email);
        
        if(existingUser) {
            throw new Error("User already exists");
        }

        const hashedPass = await hashPassword(user.password);

        const data: IUser = {
            email: xss(user.email),
            password: hashedPass,
            name: xss(user.name),
            role: user.role,
        }

        const newUser = await authRepo.createUser(data);

        if(!newUser) {
            throw new Error("Something went wrong");
        }
        return newUser;
    }
}
export default new AuthService();