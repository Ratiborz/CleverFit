import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import s from './auth.module.scss';

export const Auth = () => {
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(true);

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid = isInvalidEmail && isInvalidPassword;
        setIsFormValid(isValid);
    }, [isInvalidEmail, isInvalidPassword]);

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
                    <Input className={s.email_input} />
                </Form.Item>
            </div>

            <Form.Item className={s.password_item}>
                <Form.Item
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
                    <Input.Password placeholder='Пароль' className={s.password_input} />
                </Form.Item>
            </Form.Item>

            <div className={s.support_btn}>
                <Checkbox className={s.checkbox}>Запомнить меня</Checkbox>
                <Button type='link' className={s.password__recover} style={{ padding: 0 }}>
                    Забыли пароль?
                </Button>
            </div>

            <div className={s.size__wrapper}>
                <Button className={s.sign_in__btn} type='primary' htmlType='submit'>
                    Войти
                </Button>
                <Button className={s.google__btn} icon={<GooglePlusOutlined />}>
                    Войти через Google
                </Button>
            </div>
        </>
    );
};
