
export const getDateFromISO = (isoDate: string) => {
    const date = isoDate.split("T")[0];
    return date;
}

export const  getActiveStatus = (date: string) => {
    const today = Date.now();
    const provided = new Date(date).getTime();

    const threeDays = 3 * 24 * 60 * 60 * 1000;
    const lastSeen = today - provided;

    if(lastSeen > threeDays) {
        return "inactive";
    }
    else {
        return "active"
    }

}