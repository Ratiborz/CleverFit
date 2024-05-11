import { Training } from '../types/calendar-types';

enum Trainings {
    'Ноги' = 'legs',
    'Руки' = 'hands',
    'Силовая' = 'strength',
    'Спина' = 'back',
    'Грудь' = 'chest',
}

export const getPopularTypeTraining = (
    trainingData: Training[],
): { type: string; id: string; data: Training } | undefined => {
    const result: Record<string, { totalValue: number; name: string; data: Training }> = {};

    if (trainingData.length === 0) return undefined;

    trainingData.forEach(({ _id, name, ...training }) => {
        if (training.exercises && training.exercises.length > 0) {
            const totalValue = training.exercises.reduce((acc, exercise) => {
                const { replays, weight, approaches } = exercise;

                return acc + replays * weight * approaches;
            }, 0);

            const data = training;

            result[_id] = { totalValue, name, data };
            result[name] = { totalValue, name, data };
        }
    });

    const popularTrainingId = Object.keys(result).reduce((a, b) =>
        result[a].totalValue > result[b].totalValue ? a : b,
    );

    return {
        type: Trainings[result[popularTrainingId].name as keyof typeof Trainings],
        id: popularTrainingId,
        data: result[popularTrainingId].data,
    };
};
