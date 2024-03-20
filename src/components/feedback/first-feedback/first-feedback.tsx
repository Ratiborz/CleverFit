import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/feedback.slice';
import { Button, Card, Typography } from 'antd';

import styles from './first-feedback.module.scss';

export const FirstFeedback = () => {
    const dispatch = useAppDispatch();

    const handleState = () => dispatch(actions.setStateModalError(true));

    return (
        <div className={styles.wrapper_feedback}>
            <Card className={styles.card}>
                <h2 className={styles.card_title}>Оставьте свой отзыв первым</h2>
                <Typography className={styles.card_descrip}>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                    своим мнением и опытом с другими пользователями,
                    <br /> и помогите им сделать правильный выбор.
                </Typography>
            </Card>

            <Button
                data-test-id='write-review'
                onClick={() => handleState()}
                className={styles.card_btn}
            >
                Написать отзыв
            </Button>
        </div>
    );
};
