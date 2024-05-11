import React, { useState } from 'react';
import { usersTrainingPalsSelector } from '@constants/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Image } from 'antd';
import { DetailsTrainingModal } from './details-training-modal/details-training-modal';

import styles from './partners-cards.module.scss';

type Props = {
    setListPartners: (arg: boolean) => void;
};

export const PartnersCards = ({ setListPartners }: Props) => {
    const usersTrainingPals = useAppSelector(usersTrainingPalsSelector);
    const [openModal, setOpenModal] = useState(false);
    const [userData, setUserData] = useState();

    const detailsTrainingUser = (user) => {
        setUserData(user);
        setOpenModal(true);
    };

    return (
        <React.Fragment>
            {userData && (
                <DetailsTrainingModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    userData={userData}
                    setListPartners={setListPartners}
                />
            )}
            <div className={styles.wrapper__partners_cards}>
                {usersTrainingPals.map((user) => (
                    <div
                        key={user.id}
                        className={styles.card}
                        onClick={() => detailsTrainingUser(user)}
                    >
                        <div className={styles.avatar_name}>
                            <Image
                                src={user.imageSrc ? user.imageSrc : '/Avatar-mock.svg'}
                                alt='avatar'
                                preview={false}
                                className={styles.avatar}
                            />
                            <p>{user.name ? user.name : 'Пользователь'}</p>
                        </div>

                        <div className={styles.type_training}>
                            <p className={styles.type_training__p}>Тип тренировки:</p>
                            <span className={styles.training}>{user.trainingType}</span>
                        </div>
                        <div className={styles.average_load}>
                            <p className={styles.average_load__p}>Средняя нагрузка:</p>
                            <span className={styles.weight}>
                                {user.avgWeightInWeek}

                                {user.avgWeightInWeek > 999 ? (
                                    <React.Fragment>
                                        <br /> кг/нед
                                    </React.Fragment>
                                ) : (
                                    ` ${'кг/нед'}`
                                )}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};
