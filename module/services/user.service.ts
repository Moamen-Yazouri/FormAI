import { IUserFromDB } from "@/@types";
import userRepo from "../repositories/user.repo";
import formsRepo from "../repositories/forms.repo";
import responseRepo from "../repositories/response.repo";

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
}
export default new UserService();