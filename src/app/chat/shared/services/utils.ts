
export class Utils {
    static convertISO8601toDate(dateStr) {
        dateStr = dateStr.replace(/\D/g," ");

        dateStr = dateStr.replace(/\s+$/,"");

        const dtcomps = dateStr.split(" ");

        // not all ISO 8601 dates can convert, as is
        // unless month and date specified, invalid
        if (dtcomps.length < 3) return "invalid date";
        // if time not provided, set to zero
        if (dtcomps.length < 4) {
            dtcomps[3] = 0;
            dtcomps[4] = 0;
            dtcomps[5] = 0;
        }

        dtcomps[1]--;

        const convdt = new Date(Date.UTC(dtcomps[0],dtcomps[1],dtcomps[2],dtcomps[3],dtcomps[4],dtcomps[5]));

        return convdt.toUTCString();
    }
}
