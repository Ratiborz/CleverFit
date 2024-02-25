import { Loader } from '@components/loader/loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { Card, Image, Typography } from 'antd';
import { useState } from 'react';
import VerificationInput from 'react-verification-input';
import { confirmEmail } from '../../../api/requests';
import s from './confirm-email.module.scss';

export const ConfirmEmail = () => {
    const [loading, setLoading] = useState(false);
    const [isValidConfirm, setIsValidConfirm] = useState(true);
    const emailValue = useAppSelector((state) => state.registration.email);
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
        <>
            {loading && <Loader />}
            <Card
                className={s.card__confirm_email}
                bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Image
                    src={`/result/${isValidConfirm ? 'Suggested_icon.svg' : 'cancel-cross.svg'}`}
                    alt='suggested'
                    className={s.card__img}
                    preview={false}
                />
                <h2 className={s.card__h2}>
                    {isValidConfirm ? (
                        <span>
                            Введите код <br /> для восстановления аккауанта
                        </span>
                    ) : (
                        `Неверный код. Введите код для восстановления аккауанта`
                    )}
                </h2>
                <Typography className={s.card__descrip}>
                    Мы отправили вам на e-mail {emailValue} шестизначный код. Введите его в поле
                    ниже.
                </Typography>
                <div className={`${s.container} ${!isValidConfirm ? s.containerInactive : ''}`}>
                    <VerificationInput
                        autoFocus={false}
                        placeholder={''}
                        validChars={'0-9'}
                        length={6}
                        value={value}
                        onChange={setValue}
                        onComplete={(code) => confirmCode(code)}
                        inputProps={{ 'data-test-id': 'verification-input' }}
                        classNames={{
                            container: s.container,
                            character: s.character,
                            characterInactive: s.character + '--inactive',
                            characterSelected: s.character + '--selected',
                            characterFilled: s.character + '--filled',
                        }}
                    />
                </div>
                <Typography className={s.card__support_descr}>
                    Не пришло письмо? Проверьте папку Спам.
                </Typography>
            </Card>
        </>
    );
};
