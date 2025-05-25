import { IUserFromDB, UserRoles } from "@/@types";
import userRepo from "../repositories/user.repo";
import { comparePassword, hashPassword } from "@/lib/compareAndHash";

class UserService {
    async findUserById(id: string) {
        return await userRepo.getUserById(id);
    }
    async deleteUser(userId: string) {
        const user = await userRepo.getUserById(userId);
        if(!user) {
            throw new Error("User not found");
        }

        const deletedUser: IUserFromDB | null = await userRepo.deleteUser(userId);
        if(!deletedUser) {
            throw new Error("Error deleting user");
        }
        return deletedUser;
    }

    async updateEmail (userId: string, newEmail: string) {
        const user = await userRepo.updateEmail(userId, newEmail);
        if(!user) {
            throw new Error("User not found");
        }
        return user;
    }
    async updateName (userId: string, newName: string) {
        const user = await userRepo.updateName(userId, newName);
        if(!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async updatePassword (userId: string, prevPassword: string, newPassword: string) {
        const user = await userRepo.getUserById(userId);
        if(!user) {
            throw new Error("User not found");
        }
        const isMatched = await comparePassword(prevPassword, user.password);
        if(!isMatched) {
            throw new Error("Incorrect current password!");
        }
        const hashedPassword = await hashPassword(newPassword);
        const updatedUser = await userRepo.updatePassword(userId, hashedPassword);
        if(!updatedUser) {
            throw new Error("Error updating password");
        }
        return updatedUser;
    }

    async updateRole (userId: string, newRole: UserRoles) {
        const user = await userRepo.updateRole(userId, newRole);
        if(!user) {
            throw new Error("User not found");
        }
        return user;
    }
}
export default new UserService();