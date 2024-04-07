export function currentTime(time: string) {
    const fullDate = time;
    const [year, month, day] = fullDate.split('T')[0].split('-');

    return `${day}.${month}.${year}`;
}

export function timeConverter(UNIX_timestamp: number) {
    const a = new Date(UNIX_timestamp);
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const year = a.getUTCFullYear();
    const month = months[a.getUTCMonth()];
    const date = a.getUTCDate();
    const time = `${date}.${month}.${year}`;

    return time;
}

export const mirrorDate = (dateString: string) =>
    dateString.split('-').reverse().join('.').replace(/-/g, '.');

export const getNumberFromPeriod = (period: string) => {
    const regex = /\d+/;
    const match = period.match(regex);

    if (match && match[0]) {
        const number = parseInt(match[0], 10);

        if (period.includes('неделю')) {
            return number * 7;
        }

        return number;
    }

    return null;
};
