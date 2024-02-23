import { Loader } from '@components/loader/loader';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { actions } from '@redux/reducers/repeatRequests.slice';
import { storageToken } from '@utils/storage';
import { Button, Form, Image, Layout } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { authLogin, registrationRequest } from '../../API/registration-request';
import s from './registration-page.module.scss';

export interface Values {
    email: string;
    password: string;
    confirm: string;
    code: string;
}

export const RegistrationPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const repeatRequestData = useAppSelector((state) => state.repeatRequests);
    const navigate = useNavigate();
    const rememberMe = useAppSelector((state) => state.registration.rememberMe);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (repeatRequestData.email && repeatRequestData.password) {
            setLoading(true);
            registrationRequest(repeatRequestData)
                .then(() => {
                    history.push('/result/success', { fromRequest: true });
                })
                .catch((error) => {
                    if (error.response && error.response.status === 409) {
                        history.push('/result/error-user-exist', { fromRequest: true });
                    } else {
                        history.push('/result/error', { fromRequest: true });
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [repeatRequestData]);

    const onFinish = (values: Values) => {
        const numberOfValues = Object.keys(values).length;

        if (numberOfValues === 3) {
            setLoading(true);
            registrationRequest(values)
                .then(() => {
                    history.push('/result/success', { fromRequest: true });
                })
                .catch((error) => {
                    if (error.response && error.response.status === 409) {
                        history.push('/result/error-user-exist', { fromRequest: true });
                    } else {
                        dispatch(actions.setDataRequest(values));
                        history.push('/result/error', { fromRequest: true });
                    }
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(true);
            authLogin(values)
                .then((response) => {
                    storageToken.setItem('isAuthenticated', 'true');
                    history.push('/main');
                    if (rememberMe) {
                        storageToken.setItem('accessToken', response.data.accessToken);
                        storageToken.setItem('isAuthenticated', 'true');
                    }
                })
                .catch(() => {
                    history.push('/result/error-login', { fromRequest: true });
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
