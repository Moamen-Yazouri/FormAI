import { getDateOnly } from "./dateUtils";

export const getDataPerDate = <T extends {createdAt?: Date | string, date?: Date | string}>(data: T[]) => {
    const dataPerDate: {[date: string]: number} = {};
    data.map(item => {
        const date = getDateOnly(item.createdAt || item.date || "");
        dataPerDate[date] = (dataPerDate[date] || 0) + 1;
    });
    return dataPerDate;
}