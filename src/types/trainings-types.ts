import { TrainingInviteStatus } from '@constants/constants';
import type { Moment } from 'moment';

import { Training } from './calendar-types';

export type Nullebel<T> = T | null;

export type InputsData = {
    exercise: string;
    replays: number;
    weight: number;
    count: number;
    id: string;
};

export type FinishValues = {
    name_training: string;
    date: Moment;
    inputsBlock: InputsData[];
    period?: string;
};

export type DataForInputs = {
    name: string;
    exercisesName: string;
    replays: number;
    weight: number;
    count: number;
    id: string;
    date: string;
    period?: number;
};

export type TrainingDataPals = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: string;
    avgWeightInWeek: number;
    status: null;
    inviteId: null;
};

export type UserDataForDrawer = {
    name: string;
    trainingType: string;
    imgSrc: string;
    trainingId: string;
    id?: string;
};

export type CatalogTrainingPalsResponse = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: string;
    avgWeightInWeek: number;
    status: Nullebel<string>;
    inviteId: Nullebel<string>;
};

export type JointTrainingParticipantsQuery = {
    trainingType?: string;
    status?: Nullebel<string>;
};

export type CreateCommonTraining = {
    name: string;
    trainingType: string;
    imgSrc: string;
    id: string;
};

export type TcreateInvite = {
    to: string;
    trainingId: string;
};

type InviteFrom = {
    _id: string;
    lastName: Nullebel<string>;
    imageSrc: Nullebel<string>;
    firstName?: string;
};

export type InviteResponse = {
    _id: string;
    from: InviteFrom;
    training: Training;
    status: string;
    createdAt: string;
};

export type TrainingInviteResponse = InviteResponse & {
    to: InviteFrom;
};

export type InviteIdData = {
    inviteId: Nullebel<string>;
};

export type ErrorTypeResponse = {
    status: number;
    data: {
        statusCode: number;
        error: string;
        message: string;
    };
};

export type InviteStatusData = {
    id: string;
    status: typeof TrainingInviteStatus.ACCEPTED | typeof TrainingInviteStatus.REJECTED;
};
