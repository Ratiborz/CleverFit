import { useState } from 'react';
import { TrainingInviteStatus } from '@constants/constants';
import { inviteListSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    useDeleteInviteMutation,
    useResponseToInviteMutation,
} from '@redux/api-rtk/invite-requests';
import { useLazyGetTrainingPalsQuery } from '@redux/api-rtk/training-requests';
import { actions } from '@redux/reducers/training.slice';
import { currentTime } from '@utils/utils';
import { Button, Image } from 'antd';

import { TrainingInfo } from './training-info/training-info';

import styles from './invitation-training.module.scss';

type Props = {
    setListPartners: (arg: boolean) => void;
};

export const InvitationTraining = ({ setListPartners }: Props) => {
    const dispatch = useAppDispatch();
    const [openCard, setOpenCard] = useState(false);
    const inviteList = useAppSelector(inviteListSelector);
    const [deleteInvite] = useDeleteInviteMutation();
    const [responseToInvite] = useResponseToInviteMutation();
    const [getTrainingPals] = useLazyGetTrainingPalsQuery();

    const watchInfo = () => {
        setOpenCard(true);
    };

    const trainTogether = async (idInvite: string) => {
        setListPartners(true);
        await responseToInvite({ id: idInvite, status: TrainingInviteStatus.ACCEPTED });
        await getTrainingPals();
    };

    const rejectedRequest = (id: string) => {
        deleteInvite({ inviteId: id });
        dispatch(actions.deleteInvite(id));
    };

    return (
        <div className={styles.container}>
            <div className={styles.card_invite}>
                <span className={styles.new_message}>Новое сообщение ({inviteList?.length})</span>
                <div className={styles.profile__block}>
                    <Image
                        src={
                            inviteList[0]?.from?.imageSrc
                                ? inviteList[0]?.from?.imageSrc
                                : '/Avatar-mock.svg'
                        }
                        alt='avatar'
                        className={styles.avatar}
                        preview={false}
                    />
                    <p className={styles.invite__name}>
                        {inviteList[0]?.from?.firstName ?? 'Пользователь'}
                    </p>
                </div>
                <div className={styles.message_block}>
                    <div className={styles.invite__date}>
                        {currentTime(inviteList[0]?.createdAt)}
                    </div>
                    <h2 className={styles.invite__message}>
                        Привет, я ищу партнёра для совместных [силовых тренировок]. Ты хочешь
                        присоединиться ко мне на следующих тренировках?
                    </h2>
                    <div className={styles.details__btn_block}>
                        <Button
                            className={styles.invite__btn__all_details}
                            type='link'
                            onClick={() => watchInfo()}
                        >
                            Посмотреть детали тренировки
                        </Button>
                        {openCard && (
                            <TrainingInfo inviteList={inviteList[0]} setOpenCard={setOpenCard} />
                        )}
                    </div>
                </div>
                <div className={styles.btn__block}>
                    <Button
                        className={styles.invite__btn__accepted}
                        onClick={() => trainTogether(inviteList[0]?._id)}
                    >
                        Тренироваться вместе
                    </Button>
                    <Button
                        className={styles.invite__btn__rejected}
                        onClick={() => rejectedRequest(inviteList[0]?._id)}
                    >
                        Отклонить запрос
                    </Button>
                </div>
            </div>
        </div>
    );
};
