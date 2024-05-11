import { CloseOutlined } from '@ant-design/icons';
import { getCurrentColor } from '@components/choose-color-badge/choose-color-badge';
import { currentTime, getConvertStringFromNumb } from '@utils/utils';
import { Badge, Button, Card, Divider } from 'antd';

import { InviteResponse } from '../../../../../types/trainings-types';

import styles from './training-info.module.scss';

type Props = {
    inviteList: InviteResponse;
    setOpenCard: (arg: boolean) => void;
};

export const TrainingInfo = ({ inviteList, setOpenCard }: Props) => {
    const closeInfoCard = () => {
        setOpenCard(false);
    };

    return (
        <div className={styles.card}>
            <div className={styles.badge__block}>
                <div>
                    <Badge
                        color={getCurrentColor(inviteList.training.name)}
                        style={{ marginRight: 8 }}
                    />
                    {inviteList.training.name}
                </div>
                <Button
                    icon={<CloseOutlined />}
                    onClick={() => closeInfoCard()}
                    className={styles.btn_close}
                />
            </div>
            <Divider className={styles.divider} />
            <div className={styles.training__details}>
                <div className={styles.period__time}>
                    <span className={styles.period}>
                        {inviteList.training.parameters?.period
                            ? getConvertStringFromNumb(inviteList.training.parameters?.period)
                            : null}
                    </span>
                    <span className={styles.time}>{currentTime(inviteList.createdAt)}</span>
                </div>
                <ul className={styles.list_trainings}>
                    {inviteList.training.exercises.map((exercise) => (
                        <li key={exercise._id} className={styles.exercise_info}>
                            <p className={styles.exercise_name}>{exercise.name}</p>
                            <span className={styles.count}>{`
														${exercise.approaches} x (${`${exercise.weight}кг` ?? exercise.replays})`}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
