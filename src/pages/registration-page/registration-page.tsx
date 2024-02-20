import { Loader } from '@components/loader/loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { storageToken } from '@utils/storage';
import { Button, Form, Image, Layout } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { authLogin, registrationRequest } from '../../API/registration-request';
import s from './registration-page.module.scss';

export interface Values {
    email: string;
    password: string;
    confirm: string;
}

export const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const rememberMe = useAppSelector((state) => state.registration.rememberMe);
    const [loading, setLoading] = useState(false);

    const onFinish = (values: Values) => {
        const numberOfValues = Object.keys(values).length;

        if (numberOfValues === 3) {
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
        } else {
            setLoading(true);
            authLogin(values)
                .then((response) => {
                    console.log(response);
                    storageToken.setItem('isAuthenticated', 'true');
                    navigate('/main');
                    if (rememberMe) {
                        storageToken.setItem('accessToken', response.data.accessToken);
                        storageToken.setItem('isAuthenticated', 'true');
                    }
                })
                .catch(() => {
                    navigate('/result/error-login');
                })
                .finally(() => setLoading(false));
        }
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
