import { CreateTrainingModal } from '@components/calendar/create-training-modal/createTrainingModal';
import styles from './calendarCell.module.scss';
import { useRef } from 'react';
import { Badge } from 'antd';
import { Training } from '../../../types/calendarTypes';
import { getBadgeColor } from '../choose-color-badge/chooseColorBadge';
import type { Moment } from 'moment';

type Props = {
    date: Moment;
    activeDateModal: string;
    handleCloseModal: () => void;
    tranings: Training[];
};
export const CalendarCell = ({ date, tranings, handleCloseModal, activeDateModal }: Props) => {
    const positionRef = useRef<HTMLDivElement>(null);

    const filteredTrainings = tranings.filter((training) => {
        const trainingDate = new Date(training.date);
        const trainingDateString = trainingDate.toISOString().slice(0, 10);
        return trainingDateString === date.format('YYYY-MM-DD');
    });

    const trainingNames = filteredTrainings.map((training) => training.name);

    return (
        <div className='modal' ref={positionRef}>
            {
                <ul style={{ listStyle: 'none', margin: 0 }}>
                    {trainingNames.map((name) => (
                        <li style={{ fontSize: '12px' }} key={name}>
                            <Badge color={getBadgeColor(name)} style={{ marginRight: '8px' }} />
                            {name}
                        </li>
                    ))}
                </ul>
            }
            {/* {date === activeDateModal && (
                <CreateTrainingModal
                    date={date}
                    handleClose={handleCloseModal}
                    isRightPosition={
                        (positionRef?.current?.getBoundingClientRect?.()?.left || 0) + 264 > 1500
                    }
                />
            )} */}
        </div>
    );
};
