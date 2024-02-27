import { Loader } from '@components/loader/loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { Button, Card, Image, Typography } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { checkEmail } from '../../../api/requests';
import s from './error-check-email.module.scss';
import { emaildataSelector } from '@constants/selectors/selectors';

export const ErrorCheckEmail = () => {
    const emaildata = useAppSelector(emaildataSelector);
    const [loading, setLoading] = useState(false);

    const checkData = () => {
        if (emaildata) {
            setLoading(true);
            checkEmail(emaildata)
                .then(() => {
                    history.push('/auth/confirm-email', { forgotPass: true });
                })
                .catch((error) => {
                    if (
                        error.response.data.message === 'Email не найден' &&
                        error.response.status === 404
                    ) {
                        history.push('/result/error-check-email-no-exist', { fromRequest: true });
                    } else {
                        history.push('/result/error-check-email', { fromRequest: true });
                    }
                })
                .finally(() => setLoading(false));
        }
    };

    return (
        <>
            {loading && <Loader />}
            <Card
                className={s.card}
                bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Image
                    src='/result/Result.svg'
                    className={s.card__img}
                    alt='not-valid'
                    preview={false}
                />
                <h3 className={s.card__h3}>Что-то пошло не так</h3>
                <Typography className={s.card__descrip}>
                    Произошла ошибка, попробуйте отправить форму ещё раз.
                </Typography>
                <Button
                    className={s.card__btn}
                    onClick={() => checkData()}
                    data-test-id='check-back-button'
                >
                    <NavLink to={'/auth'}>Назад</NavLink>
                </Button>
            </Card>
        </>
    );
};
