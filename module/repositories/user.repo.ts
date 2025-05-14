import { IUserFromDB } from "@/@types";
import userModel from "@/DB/models/user.model";

class UserRepo {
    async getAllUsers() {
        return await userModel.find({});
    }
    async getUserByName(username: string) {
        return await userModel.findOne({name: username}).lean<IUserFromDB>();
    }
}

export default new UserRepo();