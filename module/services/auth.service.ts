"server-only"
import { IUser, IUserFromDB } from "@/@types";
import { validationSchema } from "@/app/(auth)/sign-up/components/signup-form/validationSchema";
import authRepo from "../repositories/auth.repo";
import { comparePassword, hashPassword } from "@/lib/compareAndHash";
import xss from "xss";
import { generateToken } from "@/lib/generateAndVerifyToken";
import { cookies } from "next/headers";
import userService from "./user.service";

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
            lastActive: new Date(),
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
            role: user.role,
            lastActive: new Date(),
        }
        
        const token = await generateToken(payload);
        (await cookies()).set("auth-token", token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        });
        await userService.updateLastActive(user._id, new Date());
        return {
            user,
            token,
        };
    }
    
}
export default new AuthService();