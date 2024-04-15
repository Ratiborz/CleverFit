import React from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
    editFlowSelector,
    isMobileSelector,
    pastFlowSelector,
    readOnlyFlowSelector,
} from '@constants/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Badge, Drawer } from 'antd';
import classNames from 'classnames';
import type { Moment } from 'moment';

import { getCurrentColor } from '../../choose-color-badge/choose-color-badge';

import { DrawerForm } from './drawer-form/drawer-form';

import styles from './drawer.module.scss';

type Props = {
    showDrawer: boolean;
    setOpen: (open: boolean) => void;
    dateMoment: Moment;
    selectedTraining: string;
};

export const Drawerz = ({ showDrawer, setOpen, dateMoment, selectedTraining }: Props) => {
    const editFlow = useAppSelector(editFlowSelector);
    const pastFlow = useAppSelector(pastFlowSelector);
    const readOnlyFlow = useAppSelector(readOnlyFlowSelector);
    const isMobile = useAppSelector(isMobileSelector);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const titleStatus = {
        true: readOnlyFlow ? (
            ''
        ) : (
            <p className={styles.warning__text}>
                После сохранения внесенных изменений отредактировать проведенную тренировку будет
                невозможно
            </p>
        ),
    };

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            width={isMobile ? 360 : 408}
            className={classNames(styles.drawer, isMobile && styles.drawer_mobile)}
            title={
                editFlow ? (
                    <React.Fragment>
                        <EditOutlined style={{ marginRight: '8px' }} />
                        <span>Редактирование</span>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <PlusOutlined style={{ marginRight: '8px' }} />
                        <span>Добавление упражнений</span>
                    </React.Fragment>
                )
            }
            closeIcon={false}
            placement='right'
            onClose={handleDrawerClose}
            open={showDrawer}
            maskClosable={false}
            mask={false}
        >
            <div className={styles.drawer__container}>
                <div>
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
                </div>
                {pastFlow ? titleStatus.true : ''}
            </div>
        </Drawer>
    );
};
