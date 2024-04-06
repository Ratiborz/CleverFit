import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { useSaveTrainingMutation } from '@redux/api-rtk/training-requests';
import { DrawerFormTraining } from './drawer-form-training/drawer-form-training';

import styles from './drawer.module.scss';

type Props = {
    setOpen: (arg: boolean) => void;
    open: boolean;
};

export const DrawerTraining = ({ setOpen, open }: Props) => {
    const [saveTraining, { isSuccess }] = useSaveTrainingMutation();

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            width={408}
            className={styles.drawer}
            title={
                <React.Fragment>
                    <PlusOutlined style={{ marginRight: '8px' }} />
                    <span>Новая тренировка</span>
                </React.Fragment>
            }
            closeIcon={false}
            placement='right'
            onClose={handleDrawerClose}
            open={open}
            maskClosable={false}
            mask={false}
        >
            <div className={styles.drawer__container}>
                <DrawerFormTraining setOpen={setOpen} />
            </div>
        </Drawer>
    );
};
