import type { Moment } from 'moment';

type ImgSrc = {
    file: {
        thumbUrl: string;
    };
    fileList: [];
};

export type User = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
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
