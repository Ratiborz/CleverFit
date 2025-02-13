export const baseURL = 'https://marathon-api.clevertec.ru/';

export const authGoogle = 'auth/google';

export const forbiddenStatus = 403;

export const backgroundImage = '/Main_page_light.png';

export const defaultItemPerPage = 10;

export const itemsPerPage = 12;

export const positionImage = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
};

export const maskStyle = {
    backgroundColor: 'rgba(121, 156, 213, 0.5)',
    backdropFilter: 'blur(5px)',
};

export const emailRegex =
    /^(?=.{1,64}@)(?=.{1,255}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const periodValue = [
    'Через 1 день',
    'Через 2 дня',
    'Через 3 дня',
    'Через 4 дня',
    'Через 5 дней',
    'Через 6 дней',
    '1 раз в неделю',
];

export const periodValueMap = {
    1: 'Через 1 день',
    2: 'Через 2 дня',
    3: 'Через 3 дня',
    4: 'Через 4 дня',
    5: 'Через 5 дней',
    6: 'Через 6 дней',
    7: '1 раз в неделю',
};

export const sortByValues = [
    'Сортировка по периоду',
    'Сортировка по дате',
    'Сортировка по дням',
    'Сортировка по всему',
];

export const TrainingInviteStatus = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
};
