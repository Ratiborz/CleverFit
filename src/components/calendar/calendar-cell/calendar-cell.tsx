import { useRef } from 'react';
import useWindowResize from '@hooks/use-window-resize';
import { Badge } from 'antd';
import type { Moment } from 'moment';

import { Training } from '../../../types/calendar-types';
import { getCurrentColor } from '../../choose-color-badge/choose-color-badge';
import { CreateTrainingModal } from '../create-training-modal/create-training-modal';

import styles from './calendar-cell.module.scss';

type Props = {
    dateForBadge: Moment;
    activeDateModal: string;
    handleCloseModal: () => void;
    tranings: Training[];
    dateForModal: string;
};
export const CalendarCell = ({
    dateForBadge,
    tranings,
    handleCloseModal,
    activeDateModal,
    dateForModal,
}: Props) => {
    const positionRef = useRef<HTMLDivElement>(null);
    const { width } = useWindowResize();
    const isMobile = width <= 830;
    const isMiddleWidth = width <= 835;

    const filteredTrainings = tranings.filter((training) => {
        const trainingDate = new Date(training.date);
        const trainingDateString = trainingDate.toISOString().slice(0, 10);

        return trainingDateString === dateForBadge.format('YYYY-MM-DD');
    });

    const trainingNames = filteredTrainings.map((training) => ({
        name: training.name,
        isImplementation: training.isImplementation,
        id: training._id,
    }));

    return (
        <div className={styles.modal} ref={positionRef} style={{ position: 'static' }}>
            {isMobile ? (
                ''
            ) : (
                <ul
                    style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    {trainingNames.map(({ name, isImplementation, id }) => (
                        <li
                            style={{ fontSize: '12px' }}
                            key={id}
                            className={isImplementation ? styles.past__color : styles.default_li}
                        >
                            <Badge color={getCurrentColor(name)} style={{ marginRight: '8px' }} />
                            {name}
                        </li>
                    ))}
                </ul>
            )}
            {dateForModal === activeDateModal && (
                <CreateTrainingModal
                    date={dateForModal}
                    dateMoment={dateForBadge}
                    handleClose={handleCloseModal}
                    isRightPosition={
                        (positionRef?.current?.getBoundingClientRect?.()?.left || 0) + 264 >
                        (isMiddleWidth ? 700 : 1400)
                    }
                    trainingNames={trainingNames}
                />
            )}
        </div>
    );
};
