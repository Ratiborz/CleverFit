export const getCurrentColor = (value: string): string => {
    switch (value.toLocaleLowerCase()) {
        case 'ноги':
            return 'red';
        case 'силовая':
            return 'yellow';
        case 'руки':
            return 'blue';
        case 'грудь':
            return 'green';
        case 'спина':
            return 'orange';
        case 'кардио':
            return 'pink';
        default:
            return '';
    }
};
