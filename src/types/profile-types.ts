import type { Moment } from 'moment';

type ImgSrc = {
    file: {
        thumbUrl: string;
    };
    fileList: [];
};

export type User = {
    email: string | undefined;
    password: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    birthday: string | undefined;
    imgSrc: string | undefined;
    readyForJointTraining: boolean;
    sendNotification: boolean;
};

export type FieldValues = {
    avatar: ImgSrc;
    name: string;
    secondName: string;
    birthday: Moment;
    email: string;
    password: string;
    confirm: string;
};

type Periods = {
    cost: number;
    days: number;
    text: string;
};

export type TariffData = {
    name: string;
    periods: Periods[];
    _id: string;
};
