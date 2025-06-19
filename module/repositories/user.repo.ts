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
            {$set: {email: newEmail}},
            { new: true }
        ).lean<IUserFromDB>();
    }
    async updateRole (userId: string, newRole: UserRoles) {
        return await userModel.findOneAndUpdate(
            {_id: userId},
            {$set: {role: newRole}},
            { new: true }
        ).lean<IUserFromDB>();
    }
    async updateName (userId: string, newName: string) {
        return await userModel.findOneAndUpdate(
            {_id: userId},
            {$set: {name: newName}},
            { new: true }
        ).lean<IUserFromDB>();
    }
    async updatePassword (userId: string, newPassword: string) {
        return await userModel.findOneAndUpdate(
            {_id: userId},
            {$set: {password: newPassword}},
            { new: true }
        ).lean<IUserFromDB>();
    }
    async setLastActive (userId: string, date: Date) {
        return await userModel.findOneAndUpdate(
            {_id: userId},
            {$set: {lastActive: date}},
            { new: true }
        ).lean<IUserFromDB>();
    }
}

export default new UserRepo();