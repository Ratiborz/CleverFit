import React, { useState } from 'react';
import VerificationInput from 'react-verification-input';
import { Loader } from '@components/loader/loader';
import { emailValueRegistration } from '@constants/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { Card, Image, Typography } from 'antd';

import { confirmEmail } from '../../../api/requests';

import styles from './confirm-email.module.scss';

export const ConfirmEmail = () => {
    const [loading, setLoading] = useState(false);
    const [isValidConfirm, setIsValidConfirm] = useState(true);
    const emailValue = useAppSelector(emailValueRegistration);
    const [value, setValue] = useState<string>('');

    const confirmCode = (code: string) => {
        setLoading(true);
        confirmEmail(emailValue, code)
            .then(() => {
                history.push('/auth/change-password', { forgotPass: true });
            })
            .catch(() => {
                history.push('/auth/confirm-email', { forgotPass: true });
                setIsValidConfirm(false);
                setValue('');
            })
            .finally(() => setLoading(false));
    };

    return (
        <React.Fragment>
            {loading && <Loader />}
            <Card
                className={styles.card__confirm_email}
                bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Image
                    src={`/result/${isValidConfirm ? 'Suggested_icon.svg' : 'cancel-cross.svg'}`}
                    alt='suggested'
                    className={styles.card__img}
                    preview={false}
                />
                <h2 className={styles.card__h2}>
                    {isValidConfirm ? (
                        <span>
                            Введите код <br /> для восстановления аккауанта
                        </span>
                    ) : (
                        'Неверный код. Введите код для восстановления аккауанта'
                    )}
                </h2>
                <Typography className={styles.card__descrip}>
                    Мы отправили вам на e-mail {emailValue} шестизначный код. Введите его в поле
                    ниже.
                </Typography>
                <div
                    className={`${styles.container} ${
                        !isValidConfirm ? styles.containerInactive : ''
                    }`}
                >
                    <VerificationInput
                        autoFocus={false}
                        placeholder=''
                        validChars='0-9'
                        length={6}
                        value={value}
                        onChange={setValue}
                        onComplete={(code) => confirmCode(code)}
                        inputProps={{ 'data-test-id': 'verification-input' }}
                        classNames={{
                            container: styles.container,
                            character: styles.character,
                            characterInactive: `${styles.character}--inactive`,
                            characterSelected: `${styles.character}--selected`,
                            characterFilled: `${styles.character}--filled`,
                        }}
                    />
                </div>
                <Typography className={styles.card__support_descr}>
                    Не пришло письмо? Проверьте папку Спам.
                </Typography>
            </Card>
        </React.Fragment>
    );
};
