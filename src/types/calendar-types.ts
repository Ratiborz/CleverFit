export type Exercise = {
    id: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

type Participant = string;

type Parameters = {
    repeat?: boolean;
    period?: number;
    jointTraining?: boolean;
    participants?: Participant[];
};

export type Training = {
    name: string;
    date: string;
    exercises: Exercise[];
    isImplementation?: boolean;
    _id?: string;
    userId?: string;
    parameters?: Parameters;
};

export type CreateTraining = {
    name: string;
    date: string;
    isImplementation?: boolean;
    parameters?: Parameters;
    exercises: Array<{
        name: string;
        replays: number;
        weight: number;
        approaches: number;
        isImplementation?: boolean;
    }>;
};

export type TrainingsListItem = {
    name: string;
    key: string;
};

export type InputsData = {
    name: string;
    replays: number;
    weight: number;
    count: number;
    date: string;
    id: string;
};

export type FormFieldType = {
    key: string;
    name: string;
    exercise: string;
    replays: number;
    weight: number;
    count: number;
    id: string;
};
export type FormFieldsType = { inputsBlock: FormFieldType[] };
