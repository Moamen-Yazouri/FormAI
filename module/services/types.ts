import { IResponseFromDB } from "@/@types";

export interface IResponseDetailsFromDB extends Omit<IResponseFromDB, 'formId'> {
    formId: {
        _id: string;
        title: string;
        description: string;
        createdAt: Date;
        creatorId: {
            name: string;
        }
    }
}