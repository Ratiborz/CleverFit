import type { Moment } from 'moment';

export type InputsData = {
    exercise: string;
    replays: number;
    weight: number;
    count: number;
    id: string;
};

export type FinishValues = {
    type_training: string;
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
