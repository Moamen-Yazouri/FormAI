import { connection } from "@/DB/connection";
import userService from "@/module/services/user.service";

class UserAction {
    async deleteUser(userId: string) {
        await connection();
        try {
            const deletedUser = await userService.deleteUser(userId);
            return deletedUser;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            }
            console.error("Failed to delete the user!");
            return null;
        }
    }
}

export default new UserAction();