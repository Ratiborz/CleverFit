import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Badge, Drawer } from 'antd';
import styles from './drawer.module.scss';
import type { Moment } from 'moment';
import { getCurrentColor } from '../choose-color-badge/chooseColorBadge';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { editFlowSelector } from '@constants/selectors';
import { DrawerForm } from './drawer-form/drawerForm';

type Props = {
    showDrawer: boolean;
    setOpen: (open: boolean) => void;
    dateMoment: Moment;
    selectedTraining: string;
};

export const Drawerz = ({ showDrawer, setOpen, dateMoment, selectedTraining }: Props) => {
    const editFlow = useAppSelector(editFlowSelector);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            width={408}
            className={styles.drawer}
            title={
                <>
                    {editFlow ? (
                        <>
                            <EditOutlined style={{ marginRight: '8px' }} />
                            <span>Редактирование</span>
                        </>
                    ) : (
                        <>
                            <PlusOutlined style={{ marginRight: '8px' }} />
                            <span>Добавление упражнений</span>
                        </>
                    )}
                </>
            }
            closeIcon={false}
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
            <DrawerForm setOpen={setOpen} dateMoment={dateMoment} />
        </Drawer>
    );
};
