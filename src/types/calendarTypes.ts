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
    repeat: boolean;
    period: 7;
    jointTraining: boolean;
    participants: Participant[];
};

export type Training = {
    id?: string;
    name: string;
    date: string;
    isImplementation?: boolean;
    userId?: string;
    parameters?: Parameters;
    exercises: Exercise[];
};

export type CreateTraining = {
    name: string;
    date: string;
    exercises: {
        name: string;
        replays: number;
        weight: number;
        approaches: number;
        isImplementation: boolean;
    }[];
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
};
