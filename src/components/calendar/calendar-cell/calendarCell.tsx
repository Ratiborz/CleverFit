import styles from './calendarCell.module.scss';
import { useRef } from 'react';
import { Badge } from 'antd';
import { Training } from '../../../types/calendarTypes';
import { getCurrentColor } from '../choose-color-badge/chooseColorBadge';
import type { Moment } from 'moment';
import { CreateTrainingModal } from '../create-training-modal/createTrainingModal';
import useWindowResize from '@hooks/useWindowResize';

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

    const trainingNames = filteredTrainings.map((training) => {
        return { name: training.name, isImplementation: training.isImplementation };
    });

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
                    {trainingNames.map(({ name, isImplementation }) => (
                        <li
                            style={{ fontSize: '12px' }}
                            key={name}
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
                        (isMiddleWidth ? 700 : 1500)
                    }
                    trainingNames={trainingNames}
                />
            )}
        </div>
    );
};
