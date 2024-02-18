import { GooglePlusOutlined } from '@ant-design/icons';
import { Loader } from '@components/loader/loader';
import { history } from '@redux/configure-store';
import { Button, Form, Image, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { registrationRequest } from '../../API/registration-request';
import s from './registration.module.scss';

export interface Values {
    email: string;
    password: string;
    confirm: string;
}

export const Registration: React.FC = () => {
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(true);
    const [isInvalidConfirm, setIsInvalidConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid = isInvalidEmail && isInvalidPassword && isInvalidConfirm;
        setIsFormValid(isValid);
    }, [isInvalidEmail, isInvalidPassword, isInvalidConfirm]);

    const onFinish = (values: Values) => {
        setLoading(true);
        registrationRequest(values)
            .then(() => {
                history.push('/result/success');
            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    history.push('/result/error-user-exist');
                } else {
                    history.push('/result/error');
                }
            })
            .finally(() => setLoading(false));
        console.log(values);
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
                <Image
                    src='/logo_auth.svg'
                    className={s.form__logo}
                    alt='logo'
                    width={309}
                    preview={false}
                />

                <div className={s.choice_buttons}>
                    <Button className={s.auth_btn}>Вход</Button>
                    <Button className={s.registration_btn}>Регистрация</Button>
                </div>

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
                        <Input.Password placeholder='Пароль' className={s.password_input} />
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
                    <Input.Password placeholder='Повторите пароль' className={s.confirm_input} />
                </Form.Item>
                <Button
                    className={s.sign_in__btn}
                    type='primary'
                    htmlType='submit'
                    disabled={!isFormValid}
                >
                    Войти
                </Button>
                <Button className={s.google__btn} icon={<GooglePlusOutlined />}>
                    Регистрация через Google
                </Button>
            </Form>
        </>
    );
};
