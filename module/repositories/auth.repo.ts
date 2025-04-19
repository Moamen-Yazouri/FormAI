import { IUser, IUserFromDB } from "@/@types";
import userModel from "@/DB/models/user.model";

class AuthRepo {
    async findUserByEmail(email: string): Promise<IUserFromDB | null>  {
        return await userModel.findOne({ email });
    }

    async createUser(user: IUser) {
        return await userModel.create(user);
    }
}

export default new AuthRepo();