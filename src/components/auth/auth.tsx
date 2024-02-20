import { GooglePlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { actions } from '@redux/reducers/registration.slice';
import { isUserAuthenticated } from '@utils/storage';
import { Button, Checkbox, Form, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './auth.module.scss';

export const Auth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(true);

    const [isFormValid, setIsFormValid] = useState(false);

    console.log(history.location);
    useEffect(() => {
        if (isUserAuthenticated()) {
            navigate('/main');
        }
    }, []);

    useEffect(() => {
        const isValid = isInvalidEmail && isInvalidPassword;
        setIsFormValid(isValid);
    }, [isInvalidEmail, isInvalidPassword]);

    const onChange = (e: CheckboxChangeEvent) => {
        const state = e.target.checked;
        dispatch(actions.setRemember(state));
    };

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
                <Checkbox onChange={onChange} className={s.checkbox}>
                    Запомнить меня
                </Checkbox>
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
