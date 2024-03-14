import { PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Drawer, Input, InputNumber } from 'antd';
import styles from './drawer.module.scss';
import type { Moment } from 'moment';
import { getCurrentColor } from '../choose-color-badge/chooseColorBadge';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/calendar.slice';
import { inputsDataSelector } from '@constants/selectors';

type Props = {
    showDrawer: boolean;
    setOpen: (open: boolean) => void;
    dateMoment: Moment;
    selectedTraining: string;
};

export const Drawerz = ({ showDrawer, setOpen, dateMoment, selectedTraining }: Props) => {
    const dispatch = useAppDispatch();
    const inputsData = useAppSelector(inputsDataSelector);
    const [inputs, setInputs] = useState([
        { index: 0, exercise: '', approaches: 0, weight: 0, count: 0 },
    ]);
    const [indexCounter, setIndexCounter] = useState(1);

    const addMoreInputs = () => {
        setInputs([
            ...inputs,
            { index: indexCounter, exercise: '', approaches: 0, weight: 0, count: 0 },
        ]);
        setIndexCounter(indexCounter + 1);
    };

    useEffect(() => {
        if (inputsData.length > 0) {
            addMoreInputs();
        }
    }, [inputsData]);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement> | number | null,
        index: number,
        field: string,
    ) => {
        const newInputs = [...inputs];
        newInputs[index] = {
            ...newInputs[index],
            [field]:
                field === 'exercise'
                    ? (event as React.ChangeEvent<HTMLInputElement>).target.value
                    : event,
        };
        setInputs(newInputs);
    };

    const handleDrawerClose = () => {
        const exercisesData = inputs
            .filter((exercise) => exercise.exercise !== '')
            .map((exercise) => ({
                name: exercise.exercise,
                replays: exercise.approaches,
                weight: exercise.weight,
                count: exercise.count,
                date: dateMoment.format('DD.MM.YYYY'),
            }));
        dispatch(actions.setInputsData(exercisesData));
        setOpen(false);
    };

    return (
        <Drawer
            width={408}
            className={styles.drawer}
            title={
                <>
                    <PlusOutlined style={{ marginRight: '8px' }} />
                    <span>Добавление упражнений</span>
                </>
            }
            placement='right'
            onClose={handleDrawerClose}
            open={showDrawer}
            maskClosable={false}
            mask={false}
        >
            <div className={styles.badge__content}>
                <span>
                    <Badge
                        color={getCurrentColor(selectedTraining)}
                        style={{ marginRight: '8px' }}
                    />
                    <span className={styles.selected_trainings}>{selectedTraining}</span>
                </span>

                <span className={styles.date}>{dateMoment.format('DD.MM.YYYY')}</span>
            </div>
            {inputs.map((input, index) => {
                const defaultExercise = inputsData[index] || {};

                return (
                    <div key={input.index} className={styles.container}>
                        <Input
                            name='exercises'
                            placeholder='Упражнение'
                            defaultValue={defaultExercise.name || ''}
                            onChange={(e) => handleInputChange(e, input.index, 'exercise')}
                            className={styles.exercises}
                        />
                        <div className={styles.descrip__text}>
                            <div className={styles.repeat}>Подходы</div>
                            <div className={styles.weight}>Вес, кг</div>
                            <div className={styles.count}>Количество</div>
                        </div>
                        <div className={styles.inputs__wrapper}>
                            <div className={styles.input__container}>
                                <InputNumber
                                    className={styles.repeat_input}
                                    name='approaches'
                                    defaultValue={defaultExercise.replays || 1}
                                    onChange={(e) =>
                                        handleInputChange(e, input.index, 'approaches')
                                    }
                                    placeholder='1'
                                    addonBefore='+'
                                    min={1}
                                />
                            </div>
                            <div className={styles.wrapper__weight_count}>
                                <div className={styles.input__container}>
                                    <InputNumber
                                        className={styles.weight_input}
                                        name='weight'
                                        defaultValue={defaultExercise.weight || 0}
                                        onChange={(e) =>
                                            handleInputChange(e, input.index, 'weight')
                                        }
                                        placeholder='0'
                                        min={0}
                                    />
                                </div>
                                <span className={styles.separator}>x</span>
                                <div className={styles.input__container}>
                                    <InputNumber
                                        className={styles.count_input}
                                        name='count'
                                        defaultValue={defaultExercise.count || 1}
                                        onChange={(e) => handleInputChange(e, input.index, 'count')}
                                        placeholder='3'
                                        min={1}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            <Button type='link' className={styles.addMore_btn} onClick={addMoreInputs}>
                <PlusOutlined style={{ marginRight: '8px' }} />
                Добавить ещё
            </Button>
        </Drawer>
    );
};
