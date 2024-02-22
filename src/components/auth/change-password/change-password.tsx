import { Loader } from '@components/loader/loader';
import { history } from '@redux/configure-store';
import { Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { changePassword } from '../../../API/registration-request';
import { confirmPassword } from '../../../types/value-request';
import s from './change-password.module.scss';

export const ChangePassword = () => {
    const [isInvalidPassword, setIsInvalidPassword] = useState(true);
    const [isInvalidConfirm, setIsInvalidConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = (values: confirmPassword) => {
        setLoading(true);
        console.log(values);
        changePassword(values)
            .then((response) => {
                console.log(response);
                history.push('/result/success-change-password', { fromRequest: true });
            })
            .catch((error) => {
                console.log(error.response);
                history.push('/result/error-change-password', { fromRequest: true });
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            {loading && <Loader />}
            <Form
                className={s.form}
                name='register'
                onFinish={onFinish}
                onFinishFailed={(error) => {
                    console.log(error);
                }}
                scrollToFirstError
            >
                <h2 className={s.form__title}>Восстановление аккауанта</h2>
                <Form.Item className={s.password_item}>
                    <Form.Item
                        style={{ marginBottom: 0 }}
                        name='password'
                        hasFeedback
                        rules={[
                            () => ({
                                validator(_, value) {
                                    if (
                                        value?.length >= 8 &&
                                        /[A-Z]/.test(value) &&
                                        /\d/.test(value)
                                    ) {
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
                            placeholder='Новый пароль'
                            className={s.password_input}
                            data-test-id='change-password'
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
                    style={{ marginBottom: '62px' }}
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
                        data-test-id='change-confirm-password'
                    />
                </Form.Item>
                <Button
                    className={s.sign_in__btn}
                    type='primary'
                    htmlType='submit'
                    data-test-id='change-submit-button'
                >
                    Сохранить
                </Button>
            </Form>
        </>
    );
};
