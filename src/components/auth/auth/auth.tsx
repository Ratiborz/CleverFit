import { GooglePlusOutlined } from '@ant-design/icons';
import { Loader } from '@components/loader/loader';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { actions } from '@redux/reducers/registration.slice';
import { isUserAuthenticated } from '@utils/storage';
import { Button, Checkbox, Form, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useEffect, useState } from 'react';
import { checkEmail } from '../../../API/registration-request';
import s from './auth.module.scss';

export const Auth = () => {
    const dispatch = useAppDispatch();
    const emailValue = useAppSelector((state) => state.registration.email);
    const [isInvalidEmail, setIsInvalidEmail] = useState(true);
    const [isInvalidPassword, setIsInvalidPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isUserAuthenticated()) {
            history.push('/main');
        }
    }, []);

    const forgotPassword = () => {
        setLoading(true);
        checkEmail(emailValue)
            .then((response) => {
                console.log(response);
                history.push('/auth/confirm-email', { forgotPass: true });
            })
            .catch((error) => {
                console.log(error.response);
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
    };

    const onChange = (e: CheckboxChangeEvent) => {
        const state = e.target.checked;
        dispatch(actions.setRemember(state));
    };

    return (
        <>
            {loading && <Loader />}
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
                                    dispatch(actions.setEmail(value));
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
                    <Input className={s.email_input} data-test-id='login-email' />
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
                    <Input.Password
                        placeholder='Пароль'
                        className={s.password_input}
                        data-test-id='login-password'
                    />
                </Form.Item>
            </Form.Item>

            <div className={s.support_btn}>
                <Checkbox onChange={onChange} className={s.checkbox} data-test-id='login-remember'>
                    Запомнить меня
                </Checkbox>
                <Button
                    type='link'
                    data-test-id='login-forgot-button'
                    className={s.password__recover}
                    disabled={isInvalidEmail ? false : true}
                    onClick={() => forgotPassword()}
                    style={{ padding: 0 }}
                >
                    Забыли пароль?
                </Button>
            </div>

            <div className={s.size__wrapper}>
                <Button
                    className={s.sign_in__btn}
                    type='primary'
                    htmlType='submit'
                    data-test-id='login-submit-button'
                >
                    Войти
                </Button>
                <Button className={s.google__btn} icon={<GooglePlusOutlined />}>
                    Войти через Google
                </Button>
            </div>
        </>
    );
};
