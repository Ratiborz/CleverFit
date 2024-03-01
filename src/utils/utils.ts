export function currentTime(time: string) {
    const fullDate = time;
    const [year, month, day] = fullDate.split('T')[0].split('-');

    return `${day}.${month}.${year}`;
}
