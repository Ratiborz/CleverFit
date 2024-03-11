import { Button, Divider, Image, Typography } from 'antd';
import styles from './createTrainingModal.module.scss';
import { CloseIcon } from '../../../assets/close-icon/closeIcon';
import { useCreateTrainingMutation } from '@redux/api-rtk/calendarRequests';

type Props = {
    date: string;
    handleClose: () => void;
    isRightPosition: boolean;
};

export const CreateTrainingModal = ({ date, handleClose, isRightPosition }: Props) => {
    const [createTraining, { isLoading, data, error }] = useCreateTrainingMutation();
    console.log(error);

    const handleTraining = () => {
        const test = {
            name: 'Ноги',
            date: '2024-03-10T13:47:30.548Z',
            exercises: [
                {
                    name: 'Кардио',
                    replays: 0,
                    weight: 0,
                    approaches: 0,
                    isImplementation: false,
                },
            ],
        };
        createTraining(test);
    };

    return (
        <div className={isRightPosition ? styles.modal_right : styles.modal}>
            <div className={styles.wrapper_header}>
                <div>
                    <h3 className={styles.modal__h3}>{`Тренировки на ${date}`}</h3>
                    <Typography className={styles.modal__descrip}>
                        Нет активных тренировок
                    </Typography>
                </div>
                <div onClick={handleClose}>
                    <CloseIcon />
                </div>
            </div>

            <Image src='/empty-image.svg' width={32} preview={false} className={styles.empty_img} />
            <Divider />
            <Button className={styles.modal__btn} onClick={handleTraining}>
                Создать тренировку
            </Button>
        </div>
    );
};
