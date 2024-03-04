import { Button, Card, Typography } from 'antd';
import s from './firstFeedback.module.scss';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/feedback.slice';

export const FirstFeedback = () => {
    const dispatch = useAppDispatch();
    return (
        <div className={s.wrapper_feedback}>
            <Card className={s.card}>
                <h2 className={s.card_title}>Оставьте свой отзыв первым</h2>
                <Typography className={s.card_descrip}>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                    своим мнением и опытом с другими пользователями,<br></br> и помогите им сделать
                    правильный выбор.
                </Typography>
            </Card>

            <Button
                data-test-id='write-review'
                onClick={() => dispatch(actions.setStateModalError(true))}
                className={s.card_btn}
            >
                Написать отзыв
            </Button>
        </div>
    );
};
