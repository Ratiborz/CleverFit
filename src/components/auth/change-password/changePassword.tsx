import { Loader } from '@components/loader/loader';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { actions } from '@redux/reducers/repeatRequests.slice';
import { Button, Form, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { changePassword } from '../../../api/requests';
import { confirmPassword } from '../../../types/valueRequest';
import styles from './changePassword.module.scss';
import { newDataPassSelector } from '@constants/selectors/selectors';

export const ChangePassword = () => {
    const dispatch = useAppDispatch();
    const newDataPass = useAppSelector(newDataPassSelector);
    const [isInvalidPassword, setIsInvalidPassword] = useState(true);
    const [isInvalidConfirm, setIsInvalidConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const values = {
            password: newDataPass.newPassword,
            confirm: newDataPass.newPasswordConfirm,
        };

        if (newDataPass.newPassword && newDataPass.newPasswordConfirm) {
            setLoading(true);
            changePassword(values)
                .then(() => {
                    history.push('/result/success-change-password', { fromRequest: true });
                })
                .catch(() => {
                    history.push('/result/error-change-password', { fromRequest: true });
                })
                .finally(() => setLoading(false));
        }
    }, []);

    const onFinish = (values: confirmPassword) => {
        setLoading(true);
        changePassword(values)
            .then(() => {
                history.push('/result/success-change-password', { fromRequest: true });
            })
            .catch(() => {
                dispatch(actions.setNewPassword(values));
                history.push('/result/error-change-password', { fromRequest: true });
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            {loading && <Loader />}
            <Form
                className={styles.form}
                name='register'
                onFinish={onFinish}
                onFinishFailed={(error) => {
                    console.log(error);
                }}
                scrollToFirstError
            >
                <h2 className={styles.form__title}>Восстановление аккауанта</h2>
                <Form.Item className={styles.password_item}>
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
                            className={styles.password_input}
                            data-test-id='change-password'
                        />
                    </Form.Item>
                    <Typography
                        className={styles.password_requirements}
                        style={{ color: isInvalidPassword ? '#8C8C8C' : 'red' }}
                    >
                        Пароль не менее 8 символов, с заглавной буквой и цифрой
                    </Typography>
                </Form.Item>

                <Form.Item
                    className={styles.confirm_item}
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
                                    setIsInvalidConfirm(false);
                                    return Promise.resolve();
                                }
                                setIsInvalidConfirm(true);
                                return Promise.reject(new Error('Пароли не совпадают'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder='Повторите пароль'
                        className={styles.confirm_input}
                        data-test-id='change-confirm-password'
                    />
                </Form.Item>
                <Button
                    className={styles.sign_in__btn}
                    type='primary'
                    htmlType='submit'
                    disabled={isInvalidConfirm}
                    data-test-id='change-submit-button'
                >
                    Сохранить
                </Button>
            </Form>
        </>
    );
};
