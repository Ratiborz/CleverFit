export function currentTime(time: string) {
    if (!time) return null;

    const date = new Date(time);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

export function addDaysToDate(dateStr: string, days: number): string {
    const date = new Date(dateStr);

    date.setDate(date.getDate() + days + 1);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

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

export const getConvertStringFromNumb = (number: number) => {
    if (number === 1) {
        return 'Через 1 день';
    }
    if (number <= 6) {
        return `Через ${number} ${number < 5 ? 'дня' : 'дней'}`;
    }
    if (number === 7) {
        return '1 раз в неделю';
    }

    return '';
};
