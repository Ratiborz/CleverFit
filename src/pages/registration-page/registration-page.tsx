import { Loader } from '@components/loader/loader';
import { Button, Form, Image, Layout } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { registrationRequest } from '../../API/registration-request';
import s from './registration-page.module.scss';

export interface Values {
    email: string;
    password: string;
    confirm: string;
}

export const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = (values: Values) => {
        setLoading(true);
        registrationRequest(values)
            .then(() => {
                navigate('/result/success');
            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    navigate('/result/error-user-exist');
                } else {
                    navigate('/result/error');
                }
            })
            .finally(() => setLoading(false));
        console.log(values);
    };

    return (
        <Layout className={s.container__registration}>
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
                    <Button className={s.auth_btn} onClick={() => navigate('/auth')}>
                        Вход
                    </Button>
                    <Button className={s.registration_btn} onClick={() => navigate('registration')}>
                        Регистрация
                    </Button>
                </div>

                <Outlet />
            </Form>
        </Layout>
    );
};
