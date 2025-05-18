import userRepo from "../repositories/user.repo";

class UserService {
    async findUserById(id: string) {
        return await userRepo.getUserById(id);
    }
}
export default new UserService();