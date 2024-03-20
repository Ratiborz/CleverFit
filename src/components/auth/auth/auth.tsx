import React, { useEffect, useState } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Loader } from '@components/loader/loader';
import { baseURL } from '@constants/constants';
import { authGoogle } from '@constants/constants/constants';
import { Paths } from '@constants/paths';
import { emailValueSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { actions } from '@redux/reducers/registration.slice';
import { actions as repeatRequestsActions } from '@redux/reducers/repeat-requests.slice';
import { isUserAuthLocal, isUserAuthSession } from '@utils/storage';
import { Button, Checkbox, Form, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { checkEmail } from '../../../api/requests';

import styles from './auth.module.scss';

export const Auth = () => {
    const dispatch = useAppDispatch();
    const emailValue = useAppSelector(emailValueSelector);
    const [loading, setLoading] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);

    useEffect(() => {
        if (isUserAuthLocal() || isUserAuthSession()) {
            history.push(Paths.MAIN);
        }
    }, []);

    const handleGoogleAuth = () => {
        window.location.href = `${baseURL}${authGoogle}`;
    };

    const forgotPassword = () => {
        if (validEmail) {
            setLoading(true);
            checkEmail(emailValue)
                .then(() => {
                    dispatch(actions.setLoading(true));
                    history.push('/auth/confirm-email', { forgotPass: true });
                })
                .catch((error) => {
                    if (
                        error.response.data.message === 'Email не найден' &&
                        error.response.status === 404
                    ) {
                        history.push('/result/error-check-email-no-exist', { fromRequest: true });
                    } else {
                        dispatch(repeatRequestsActions.setDataRequest(emailValue));
                        history.push('/result/error-check-email', { fromRequest: true });
                    }
                })
                .finally(() => {
                    setLoading(false);
                    dispatch(actions.setLoading(false));
                });
        } else {
            setIsInvalidEmail(true);
        }
    };

    const onChange = (e: CheckboxChangeEvent) => {
        const state = e.target.checked;

        dispatch(actions.setRemember(state));
    };

    return (
        <React.Fragment>
            {loading && <Loader />}
            <div className={styles.email_placeholder}>
                <span className={styles.placeholder}>e-mail:</span>
                <Form.Item
                    key='email'
                    className={styles.email_item}
                    hasFeedback={true}
                    name='email'
                    rules={[
                        () => ({
                            validator(_, value) {
                                const emailRegex =
                                    /^(?=.{1,64}@)(?=.{1,255}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                                if (emailRegex.test(value)) {
                                    setIsInvalidEmail(false);
                                    setValidEmail(true);
                                    dispatch(actions.setEmail(value));

                                    return Promise.resolve();
                                }
                                setIsInvalidEmail(true);
                                setValidEmail(false);

                                return Promise.reject();
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
                    <Input className={styles.email_input} data-test-id='login-email' />
                </Form.Item>
            </div>

            <Form.Item className={styles.password_item}>
                <Form.Item
                    name='password'
                    hasFeedback={true}
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (value?.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value)) {
                                    return Promise.resolve();
                                }

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
                        className={styles.password_input}
                        data-test-id='login-password'
                    />
                </Form.Item>
            </Form.Item>

            <div className={styles.support_btn}>
                <Checkbox
                    onChange={onChange}
                    className={styles.checkbox}
                    data-test-id='login-remember'
                >
                    Запомнить меня
                </Checkbox>
                <Button
                    type='link'
                    data-test-id='login-forgot-button'
                    className={styles.password__recover}
                    disabled={isInvalidEmail}
                    onClick={() => forgotPassword()}
                    style={{ padding: 0 }}
                >
                    Забыли пароль?
                </Button>
            </div>

            <div className={styles.size__wrapper}>
                <Button
                    className={styles.sign_in__btn}
                    type='primary'
                    htmlType='submit'
                    data-test-id='login-submit-button'
                >
                    Войти
                </Button>
                <Button
                    onClick={handleGoogleAuth}
                    className={styles.google__btn}
                    icon={<GooglePlusOutlined />}
                >
                    Войти через Google
                </Button>
            </div>
        </React.Fragment>
    );
};
