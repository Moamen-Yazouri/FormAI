import userModel from "@/DB/models/user.model";

class UserRepo {
    async getAllUsers() {
        return await userModel.find({});
    }
}

export default new UserRepo();