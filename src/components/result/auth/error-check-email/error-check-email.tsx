import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Loader } from '@components/loader/loader';
import { emaildataSelector } from '@constants/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { Button, Card, Image, Typography } from 'antd';

import { checkEmail } from '../../../../api/requests';

import styles from './error-check-email.module.scss';

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
        <React.Fragment>
            {loading && <Loader />}
            <Card
                className={styles.card}
                bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Image
                    src='/result/Result.svg'
                    className={styles.card__img}
                    alt='not-valid'
                    preview={false}
                />
                <h3 className={styles.card__h3}>Что-то пошло не так</h3>
                <Typography className={styles.card__descrip}>
                    Произошла ошибка, попробуйте отправить форму ещё раз.
                </Typography>
                <Button
                    className={styles.card__btn}
                    onClick={() => checkData()}
                    data-test-id='check-back-button'
                >
                    <NavLink to='/auth'>Назад</NavLink>
                </Button>
            </Card>
        </React.Fragment>
    );
};
