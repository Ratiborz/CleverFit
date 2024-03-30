import type { Moment } from 'moment';

type ImgSrc = {
    file: {
        thumbUrl: string;
    };
    fileList: [];
};

export type User = {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: string;
    readyForJointTraining?: boolean;
    sendNotification?: boolean;
    tariff?: {
        expired?: string;
        tariffId?: string;
    };
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

export type Tariff = {
    tariffId: string;
    days: number;
};
