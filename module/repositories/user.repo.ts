import { IUserFromDB, UserRoles } from "@/@types";
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

    async updateEmail (userId: string, newEmail: string) {
        return await userModel.findOneAndUpdate(
            {_id: userId},
            {$set: {email: newEmail}}
        ).lean<IUserFromDB>();
    }
    async updateRole (userId: string, newRole: UserRoles) {
        return await userModel.findOneAndUpdate(
            {_id: userId},
            {$set: {role: newRole}}
        ).lean<IUserFromDB>();
    }
    async updateName (userId: string, newName: string) {
        return await userModel.findOneAndUpdate(
            {_id: userId},
            {$set: {name: newName}}
        ).lean<IUserFromDB>();
    }
    async updatePassword (userId: string, newPassword: string) {
        return await userModel.findOneAndUpdate(
            {_id: userId},
            {$set: {password: newPassword}}
        ).lean<IUserFromDB>();
    }
}

export default new UserRepo();