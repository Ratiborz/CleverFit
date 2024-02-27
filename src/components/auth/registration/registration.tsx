import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';
import s from './registration.module.scss';

export const Registration: React.FC = () => {
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(true);
    const [isInvalidConfirm, setIsInvalidConfirm] = useState(false);

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid = isInvalidEmail && isInvalidPassword && isInvalidConfirm;
        setIsFormValid(isValid);
    }, [isInvalidEmail, isInvalidPassword, isInvalidConfirm]);

    return (
        <>
            <div className={s.email_placeholder}>
                <span className={s.placeholder}>e-mail:</span>
                <Form.Item
                    key='email'
                    className={s.email_item}
                    hasFeedback
                    name='email'
                    rules={[
                        () => ({
                            validator(_, value) {
                                const emailRegex =
                                    /^(?=.{1,64}@)(?=.{1,255}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                                if (emailRegex.test(value)) {
                                    setIsInvalidEmail(true);
                                    return Promise.resolve();
                                } else {
                                    setIsInvalidEmail(false);
                                    return Promise.reject();
                                }
                            },
                        }),
                        {
                            type: 'email',
                            message: '',
                        },
                        {
                            required: true,
                            message: '',
                        },
                    ]}
                >
                    <Input className={s.email_input} data-test-id='registration-email' />
                </Form.Item>
            </div>

            <Form.Item className={s.password_item}>
                <Form.Item
                    style={{ marginBottom: 0 }}
                    name='password'
                    hasFeedback
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (value?.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value)) {
                                    setIsInvalidPassword(true);
                                    return Promise.resolve();
                                }
                                setIsInvalidPassword(false);
                                return Promise.reject();
                            },
                        }),

                        {
                            required: true,
                            message: '',
                        },
                    ]}
                >
                    <Input.Password
                        placeholder='Пароль'
                        className={s.password_input}
                        data-test-id='registration-password'
                    />
                </Form.Item>
                <Typography
                    className={s.password_requirements}
                    style={{ color: isInvalidPassword ? '#8C8C8C' : 'red' }}
                >
                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                </Typography>
            </Form.Item>

            <Form.Item
                className={s.confirm_item}
                name='confirm'
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                setIsInvalidConfirm(true);
                                return Promise.resolve();
                            }
                            setIsInvalidConfirm(false);
                            return Promise.reject(new Error('Пароли не совпадают'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    placeholder='Повторите пароль'
                    className={s.confirm_input}
                    data-test-id='registration-confirm-password'
                />
            </Form.Item>
            <Button
                className={s.sign_in__btn}
                type='primary'
                htmlType='submit'
                disabled={!isFormValid}
                data-test-id='registration-submit-button'
            >
                Войти
            </Button>
            <Button className={s.google__btn} icon={<GooglePlusOutlined />}>
                Регистрация через Google
            </Button>
        </>
    );
};
