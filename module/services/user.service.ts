import { IUserFromDB } from "@/@types";
import userRepo from "../repositories/user.repo";

class UserService {
    async findUserById(id: string) {
        return await userRepo.getUserById(id);
    }
    async deleteUser(userId: string) {
        const deletedUser: IUserFromDB | null = await userRepo.deleteUser(userId);
        return deletedUser;
    }
}
export default new UserService();