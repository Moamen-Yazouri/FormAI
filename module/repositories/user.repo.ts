import { IUserFromDB } from "@/@types";
import userModel from "@/DB/models/user.model";

class UserRepo {
    async getAllUsers() {
        return await userModel.find({});
    }
    async getUserByName(username: string) {
        return await userModel.findOne({name: username}).lean<IUserFromDB>();
    }
    async getUserById(userId: string) {
        return await userModel.findById(userId).lean<IUserFromDB>();
    }

    
    async deleteUser(userId: string) {
        return await userModel.findByIdAndDelete(userId).lean<IUserFromDB>();
    }
}

export default new UserRepo();