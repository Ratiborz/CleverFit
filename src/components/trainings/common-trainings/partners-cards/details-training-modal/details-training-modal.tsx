import React, { useEffect } from 'react';
import { CheckCircleFilled, CloseOutlined } from '@ant-design/icons';
import { maskStyle } from '@constants/constants';
import { Button, Image, Modal } from 'antd';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/common-modal.slice';
import { useDeleteInviteMutation } from '@redux/api-rtk/invite-requests';
import { CatalogTrainingPalsResponse } from '../../../../../types/trainings-types';

import styles from './details-training-modal.module.scss';

type Props = {
    openModal: boolean;
    setOpenModal: (arg: boolean) => void;
    userData: CatalogTrainingPalsResponse;
    setListPartners: (arg: boolean) => void;
};

export const DetailsTrainingModal = ({
    openModal,
    setOpenModal,
    userData,
    setListPartners,
}: Props) => {
    const dispatch = useAppDispatch();
    const [deleteInvite, { isError }] = useDeleteInviteMutation();

    useEffect(() => {
        if (isError) dispatch(actions.setModalError(true));
    }, [dispatch, isError]);

    const closeModal = () => {
        setOpenModal(false);
    };

    const cancelInvite = () => {
        deleteInvite({ inviteId: userData.inviteId });
        setOpenModal(false);
        setListPartners(false);
    };

    return (
        <Modal
            maskStyle={maskStyle}
            centered={true}
            closeIcon={<CloseOutlined onClick={() => closeModal()} />}
            footer={false}
            open={openModal}
            className={styles.modal}
            destroyOnClose={true}
            data-test-id='partner-modal'
        >
            <div className={styles.avatar_name__container}>
                <div className={styles.avatar_name}>
                    <Image
                        src={userData.imageSrc ? userData.imageSrc : '/Avatar-mock.svg'}
                        alt='avatar'
                        preview={false}
                        className={styles.avatar}
                    />
                    <p>{userData.name ? userData.name : 'Пользователь'}</p>
                </div>
                <p>
                    тренировка одобрена{' '}
                    <CheckCircleFilled style={{ marginLeft: 8, color: '#52C41A' }} />
                </p>
            </div>
            <div className={styles.training_direction__container}>
                <div className={styles.type_training}>
                    <p className={styles.type_training__p}>Тип тренировки:</p>
                    <span className={styles.training}>{userData.trainingType}</span>
                </div>
                <div className={styles.average_load}>
                    <p className={styles.average_load__p}>Средняя нагрузка:</p>
                    <span className={styles.weight}>
                        {userData.avgWeightInWeek}

                        {userData.avgWeightInWeek > 999 ? (
                            <React.Fragment>
                                <br /> кг/нед
                            </React.Fragment>
                        ) : (
                            ` ${'кг/нед'}`
                        )}
                    </span>
                </div>
                <Button className={styles.btn__reject} onClick={() => cancelInvite()}>
                    Отменить тренировку
                </Button>
            </div>
        </Modal>
    );
};
