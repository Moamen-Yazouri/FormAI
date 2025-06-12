import { days } from "@/constants/dateConstants";

export const getDateFromISO = (isoDate: string) => {
    const date = isoDate.split("T")[0];
    return date;
}

export const  getActiveStatus = (date: string) => {
    const compare = new Date().getTime();
    const provided = new Date(date).getTime();

    const threeDays = 3 * 24 * 60 * 60 * 1000;
    const lastSeen = compare - provided;

    if(lastSeen > threeDays) {
        return "inactive";
    }
    else {
        return "active"
    }
}
export const getISOStringFromDay = (day: number) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); 
    const date = new Date(Date.UTC(year, month, day, 0, 0, 0)); 
    return date.toISOString();
}
export const getDayFromIndex = (index: number) => {
    return days[index];
}

export const getWeekDaysDates = () => {
    const daysIndces: number[] = [];

    for(let i = 0; i < 7; i++) {
        daysIndces.push(i)
    }

    const today = new Date().getDay();
    const date = new Date().getDate();

    const daysDates = daysIndces.map((day) => {
        if(day == today) {
            return {
                day: getDayFromIndex(day),
                date: getISOStringFromDay(date),
            }
        }
        else {
            return {
                day: getDayFromIndex(day),

                date: getISOStringFromDay(
                    day < today ? date - (today - day) 
                    : date - 7 + (day - today)
                )
                

            }

        }
    })
    return daysDates;
}

export const getDateOnly = (date: Date | string) => new Date(date).toISOString().split("T")[0];

export const getMonthName = (isoDate: string | Date) => new Date(isoDate).toLocaleString("en-US", {month: "short"});
