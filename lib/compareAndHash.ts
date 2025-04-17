"server-only"
import bcrypt from "bcryptjs";
const salt = process.env.SALT_ROUNDS;
export const hashPassword = async(password: string): Promise<string> => {
    return await bcrypt.hash(password, Number(salt) || 10);
}
export const comparePassword = async(password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
}