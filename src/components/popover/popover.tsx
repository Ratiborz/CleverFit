import { useState } from 'react';
// import { CloseOutlined, ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Drawer, Popover, Select } from 'antd';
import type { Moment } from 'moment';
// import { useResponsiveBreakpoints } from '@hooks/useResponsiveBreakpoints';
// import { Box } from '@svg/Box';

import styles from './popover.module.scss';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
// import { selectTrainingList } from '@redux/trainingsListReducer/trainingListSelectors';

type CustomPopoverProps = {
    index: string;
    date: Moment;
    handlePopoverVisibleChange: (date: Moment) => void;
    isActive: boolean;
};

export const CustomPopover = ({
    index,
    date,
    handlePopoverVisibleChange,
    isActive,
}: CustomPopoverProps) => {
    const { isXs } = useResponsiveBreakpoints();
    const trainingList = useAppSelector(selectTrainingList);

    const [addTraining, setAddTraining] = useState(false);
    const [createTraining, setCreateTraining] = useState(false);
    const [selectValue, setSelectValue] = useState('Выбор типа тренировки');
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    // const align = isXs
    //     ? { points: ['tc', 'bc'], offset: [0, 0] }
    //     : { points: ['tl', 'tl'], offset: [0, 0] };

    const handleTrainingChange = (value: string) => {
        setSelectValue(value);
    };

    return (
        <>
            <Popover
                overlayClassName={styles.popoverWrapper}
                overlayStyle={{ zIndex: 4 }}
                key={index}
                title={
                    addTraining ? (
                        <>
                            {/* <ArrowLeftOutlined onClick={() => setAddTraining(false)} /> */}
                            <Select
                                defaultValue={'Выбор типа тренировки'}
                                style={{ width: '90%' }}
                                onChange={handleTrainingChange}
                                value={selectValue}
                            >
                                {/* {trainingList.map((training) => (
                                    <Select.Option key={training.key} value={training.name}>
                                        {training.name}
                                    </Select.Option>
                                ))} */}
                            </Select>
                            <Divider />
                        </>
                    ) : (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '16px',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <div>
                                    <h4>Тренировки на {date.format('DD.MM.YYYY')}</h4>
                                    <h5>Нет активных тренировок</h5>
                                </div>
                                {/* <CloseOutlined onClick={() => handlePopoverVisibleChange(date)} /> */}
                            </div>
                            <div style={{ marginTop: '32px', textAlign: 'center' }}>
                                {/* <Box /> */}
                            </div>
                        </>
                    )
                }
                showArrow={false}
                trigger='click'
                // align={align}
                open={isActive}
                onOpenChange={() => {
                    if (createTraining) {
                        return false;
                    }
                    handlePopoverVisibleChange(date);
                    setAddTraining(false);
                    setSelectValue('Выбор типа тренировки');
                }}
                content={
                    addTraining ? (
                        <>
                            <Button
                                type='default'
                                onClick={() => {
                                    if (selectValue !== 'Выбор типа тренировки')
                                        setCreateTraining(true);
                                }}
                            >
                                Добавить тренировку
                            </Button>
                            <Button type='link'>Сохранить</Button>
                        </>
                    ) : (
                        <Button
                            type='primary'
                            style={{ width: '100%', height: '40px' }}
                            onClick={() => {
                                setAddTraining(true);
                            }}
                        >
                            Создать тренировку
                        </Button>
                    )
                }
            >
                <div className={styles.popoverTrigger}></div>
            </Popover>

            {createTraining && (
                <Drawer
                    title='Название бокового меню'
                    placement='right'
                    open={createTraining}
                    onClose={() => setCreateTraining(false)}
                ></Drawer>
            )}
        </>
    );
};
