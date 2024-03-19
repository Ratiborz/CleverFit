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
