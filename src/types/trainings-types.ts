import type { Moment } from 'moment';

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
