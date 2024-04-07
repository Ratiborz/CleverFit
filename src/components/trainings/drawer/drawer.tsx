import React from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';

import { DrawerFormTraining } from './drawer-form-training/drawer-form-training';

import styles from './drawer.module.scss';

type Props = {
    setOpen: (arg: boolean) => void;
    open: boolean;
    setShowSuccessAlert: (arg: boolean) => void;
};

export const DrawerTraining = ({ setOpen, open, setShowSuccessAlert }: Props) => {
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
            destroyOnClose={true}
            maskClosable={false}
            mask={false}
        >
            <DrawerFormTraining setOpen={setOpen} setShowSuccessAlert={setShowSuccessAlert} />

            <div className={styles.wrapper__position_btn}>
                <Button
                    type='text'
                    onClick={() => setOpen(false)}
                    className={styles.close__icon}
                    data-test-id='modal-drawer-right-button-close'
                >
                    <CloseOutlined />
                </Button>
            </div>
        </Drawer>
    );
};
