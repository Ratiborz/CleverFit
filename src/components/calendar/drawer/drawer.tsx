import { PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Drawer, Input, InputNumber } from 'antd';
import styles from './drawer.module.scss';
import type { Moment } from 'moment';
import { getCurrentColor } from '../choose-color-badge/chooseColorBadge';

type Props = {
    showDrawer: boolean;
    setOpen: (open: boolean) => void;
    dateMoment: Moment;
    selectedTraining: string;
};

export const Drawerz = ({ showDrawer, setOpen, dateMoment, selectedTraining }: Props) => {
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
            onClose={() => setOpen(false)}
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
            <Input name='exercises' placeholder='Упражнение' className={styles.exercises} />
            <div className={styles.container}>
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
                                placeholder='0'
                                min={0}
                            />
                        </div>
                        <span className={styles.separator}>x</span>
                        <div className={styles.input__container}>
                            <InputNumber
                                className={styles.count_input}
                                name='count'
                                placeholder='3'
                                min={1}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Button type='link' className={styles.addMore_btn}>
                <PlusOutlined style={{ marginRight: '8px' }} />
                Добавить ещё
            </Button>
        </Drawer>
    );
};
