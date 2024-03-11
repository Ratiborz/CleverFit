export type Exercise = {
    id: string;
    name: string;
    replays: number;
    wight: number;
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

// export type Training = {
//     id: string;
//     name: string;
//     date: string;
//     isImplementation?: false;
//     userId: string;
//     parameters?: {
//         repeat: boolean;
//         period: number;
//         jointTraining: boolean;
//         participants: string[];
//     };
//     exercises: Exercise[];
// }[];

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
