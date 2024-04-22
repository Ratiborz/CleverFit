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
): { type: string; id: string } | undefined => {
    const result: Record<string, { totalValue: number; name: string }> = {};

    if (trainingData.length === 0) return undefined;

    trainingData.forEach(({ _id, name, exercises }) => {
        if (exercises && exercises.length > 0) {
            const totalValue = exercises.reduce((acc, exercise) => {
                const { replays, weight, approaches } = exercise;
                return acc + replays * weight * approaches;
            }, 0);

            result[_id] = { totalValue, name };
            result[name] = { totalValue, name };
        }
    });

    const popularTrainingId = Object.keys(result).reduce((a, b) =>
        result[a].totalValue > result[b].totalValue ? a : b,
    );

    return {
        type: Trainings[result[popularTrainingId].name as keyof typeof Trainings],
        id: popularTrainingId,
    };
};
