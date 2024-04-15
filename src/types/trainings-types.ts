import type { Moment } from 'moment';

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
