import { Button, Divider, Drawer, Select } from 'antd';
import { ArrowBack } from '../../../assets/arrow-back/arrowBack';
import styles from './chooseTypeWorkout.module.scss';
import classNames from 'classnames';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingsListSelector } from '@constants/selectors';
import { useState } from 'react';
import type { Moment } from 'moment';
import { Drawerz } from '../drawer/drawer';

type Props = {
    swapModal: () => void;
    isRightPosition: boolean;
    trainingNames: string[];
    dateMoment: Moment;
};

export const ChooseTypeWorkout = ({
    isRightPosition,
    trainingNames,
    swapModal,
    dateMoment,
}: Props) => {
    const [open, setOpen] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState('');

    const trainingsList = useAppSelector(trainingsListSelector);
    const currentTrainingForSelect = trainingsList.filter(
        (trainingItem) => !trainingNames.includes(trainingItem.name),
    );

    return (
        <>
            <div
                className={classNames(
                    styles.wrapper__add_exercises,
                    isRightPosition ? styles.right_position : styles.left_position,
                )}
            >
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div style={{ height: 16 }} onClick={swapModal}>
                            <ArrowBack />
                        </div>
                        <Select
                            defaultValue='Выбор типа тренировки'
                            style={{ width: 220 }}
                            onSelect={(training) => setSelectedTraining(training)}
                            bordered={false}
                            options={currentTrainingForSelect?.map(({ name }) => ({
                                value: name,
                                label: name,
                            }))}
                        />
                    </div>
                    <Divider className={styles.divider_top} />
                </div>
                <div className={styles.buttons}>
                    <Divider className={styles.divider_bottom} />
                    <Button
                        className={styles.addExecsise_btn}
                        disabled={selectedTraining ? false : true}
                        onClick={() => setOpen(true)}
                    >
                        Добавить упражнения
                    </Button>
                    <Button type='text' disabled>
                        Сохранить
                    </Button>
                </div>
            </div>
            <Drawerz
                showDrawer={open}
                setOpen={setOpen}
                dateMoment={dateMoment}
                selectedTraining={selectedTraining}
            />
        </>
    );
};
