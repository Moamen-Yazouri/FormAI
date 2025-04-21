import responseModel from "@/DB/models/response.model";

class ResponseRepo {
    async getUserResponses(userId: string) {
        return await responseModel.find({userId});
    }
}

export default new ResponseRepo();