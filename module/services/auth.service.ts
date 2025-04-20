"server-only"
import { IUser, IUserFromDB } from "@/@types";
import { validationSchema } from "@/app/(auth)/sign-up/components/signup-form/validationSchema";
import authRepo from "../repositories/auth.repo";
import { comparePassword, hashPassword } from "@/lib/compareAndHash";
import xss from "xss";
import { generateToken } from "@/lib/generateAndVerifyToken";

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

    async signin(data: Pick<IUser, "email" | "password">) {
        const user: IUserFromDB | null = await authRepo.findUserByEmail(xss(data.email));

        if(!user) {
            throw new Error("User not found");
        }

        const isMatch = await comparePassword(data.password, user.password);

        if(!isMatch) {
            throw new Error("Invalid credentials");
        }
        const payload = {
            email: user.email,
            userId: String(user._id),
            name: user.name,
            role: user.role
        }
        console.log(payload);
        const token = await generateToken(payload);
        return {
            user,
            token,
        };
    }   
}
export default new AuthService();