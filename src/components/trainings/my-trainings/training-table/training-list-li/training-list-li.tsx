import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { getCurrentColor } from '@components/choose-color-badge/choose-color-badge';
import { defaultItemPerPage } from '@constants/constants';
import { trainingsDataSelector } from '@constants/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { mirrorDate } from '@utils/utils';
import { Badge, Button } from 'antd';

import { InfoCard } from '../../info-card/info-card';

import styles from './training-list-li.module.scss';

type Props = {
    currentPage: number;
    infoCard: {
        date: string;
        name: string;
    };
    handleEditTraining: (name: string, date: string, infoCard?: string) => void;
    setOpen: (arg: boolean) => void;
    setInfoCard: ({ date, name }: { date: string; name: string }) => void;
    sort: string;
};

export const TrainingListLi = ({
    currentPage,
    infoCard,
    handleEditTraining,
    setOpen,
    setInfoCard,
    sort,
}: Props) => {
    const trainingData = useAppSelector(trainingsDataSelector);
    const startIndex = (currentPage - 1) * defaultItemPerPage;
    const endIndex = startIndex + defaultItemPerPage;
    const sortedTrainingData = [...trainingData];

    if (sort === 'Сортировка по периоду') {
        sortedTrainingData.sort((a, b) => {
            const periodA = a.parameters?.period;
            const periodB = b.parameters?.period;

            if ((periodA === null || periodA === 0) && (periodB === null || periodB === 0)) {
                return 0;
            }
            if (periodA === null || periodA === 0) {
                return 1;
            }
            if (periodB === null || periodB === 0) {
                return -1;
            }

            return periodA - periodB;
        });
    }

    if (sort === 'Сортировка по дате') {
        sortedTrainingData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    const dayOfWeekMap = {
        0: 'Понедельник',
        1: 'Вторник',
        2: 'Среда',
        3: 'Четверг',
        4: 'Пятница',
        5: 'Суббота',
        6: 'Воскресенье',
    };

    if (sort === 'Сортировка по дням') {
        sortedTrainingData.sort((a, b) => {
            const dayOfWeekA = new Date(a.date).getDay();
            const dayOfWeekB = new Date(b.date).getDay();
            return dayOfWeekA - dayOfWeekB;
        });
    }

    console.log(sortedTrainingData);

    const periodValueMap = {
        1: 'Через 1 день',
        2: 'Через 2 дня',
        3: 'Через 3 дня',
        4: 'Через 4 дня',
        5: 'Через 5 дней',
        6: 'Через 6 дней',
        7: '1 раз в неделю',
    };

    const currentTrainingData = sortedTrainingData.slice(startIndex, endIndex);

    return currentTrainingData.map((training, index) => (
        <li className={styles.default_li} key={training._id}>
            <div className={styles.type_training__badge}>
                <Badge color={getCurrentColor(training.name)} className={styles.badge} />
                <div className={styles.wrapper__type}>
                    <p>{training.name}</p>
                    <Button
                        className={styles.dropDown_btn}
                        onClick={() => handleEditTraining(training.name, training.date, 'infoCard')}
                    >
                        <DownOutlined />
                    </Button>
                    {infoCard.date === training.date && infoCard.name === training.name && (
                        <InfoCard
                            setOpen={setOpen}
                            setInfoCard={setInfoCard}
                            color={getCurrentColor(training.name)}
                        />
                    )}
                </div>
            </div>
            <div className={styles.date_training}>
                <span className={styles.training__date}>
                    {sort === 'Сортировка по периоду' &&
                        training.parameters?.period !== undefined &&
                        periodValueMap[training.parameters?.period]}

                    {sort === 'Сортировка по дате' && mirrorDate(training.date.slice(0, 10))}
                    {sort === 'Сортировка по дням' &&
                        dayOfWeekMap[new Date(training.date).getDay()]}
                </span>
                <Button
                    data-test-id={`update-my-training-table-icon${index}`}
                    disabled={training.isImplementation}
                    className={styles.btn__edit_training}
                >
                    <EditOutlined
                        style={{
                            fontSize: 30,
                            color: training.isImplementation ? '#BFBFBF' : '#2F54EB',
                        }}
                        onClick={() => handleEditTraining(training.name, training.date)}
                    />
                </Button>
            </div>
        </li>
    ));
};
