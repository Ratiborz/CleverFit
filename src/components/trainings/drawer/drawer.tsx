import React from 'react';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { editFlowTrainingSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/training.slice';
import { Button, Drawer } from 'antd';

import { DrawerFormTraining } from './drawer-form-training/drawer-form-training';

import styles from './drawer.module.scss';

type Props = {
    setOpen: (arg: boolean) => void;
    open: boolean;
    setShowSuccessAlert: (arg: boolean) => void;
};

export const DrawerTraining = ({ setOpen, open, setShowSuccessAlert }: Props) => {
    const dispatch = useAppDispatch();
    const editFlow = useAppSelector(editFlowTrainingSelector);

    const handleDrawerClose = () => {
        dispatch(actions.setDataForInputs([]));
        dispatch(actions.setEditFlowTraining(false));
        setOpen(false);
    };

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            className={styles.drawer}
            title={
                editFlow ? (
                    <React.Fragment>
                        <EditOutlined style={{ marginRight: '8px' }} />
                        <span>Редактировать тренировку</span>
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
            open={open}
            destroyOnClose={true}
            maskClosable={false}
            mask={false}
        >
            <DrawerFormTraining
                setOpen={setOpen}
                setShowSuccessAlert={setShowSuccessAlert}
                handleDrawerClose={handleDrawerClose}
            />

            <div className={styles.wrapper__position_btn}>
                <Button
                    type='text'
                    htmlType='submit'
                    onClick={() => handleDrawerClose()}
                    className={styles.close__icon}
                    data-test-id='modal-drawer-right-button-close'
                >
                    <CloseOutlined />
                </Button>
            </div>
        </Drawer>
    );
};
