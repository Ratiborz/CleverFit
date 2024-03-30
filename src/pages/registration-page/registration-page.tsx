import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '@components/loader/loader';
import { Paths } from '@constants/paths';
import { rememberMeSelector, repeatRequestsSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { actions } from '@redux/reducers/repeat-requests.slice';
import { sessionToken, storageToken } from '@utils/storage';
import { Form, Image, Layout, Tabs } from 'antd';

import { authLogin, registrationRequest } from '../../api/requests';
import { Values } from '../../types/value-request';

import styles from './registration-page.module.scss';

export const RegistrationPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const repeatRequestData = useAppSelector(repeatRequestsSelector);
    const rememberMe = useAppSelector(rememberMeSelector);
    const [loading, setLoading] = useState(false);

    const activeTabKey = location.pathname === Paths.AUTH ? '1' : '2';

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
                    if (rememberMe) {
                        storageToken.setItem('accessToken', response.data.accessToken);
                        storageToken.setItem('isAuthenticated', 'true');
                        history.push(`${Paths.MAIN}`);
                    } else {
                        sessionToken.setItem('isAuthenticated', 'true');
                        sessionToken.setItem('accessToken', response.data.accessToken);
                        history.push(`${Paths.MAIN}`);
                    }
                })
                .catch(() => {
                    history.push('/result/error-login', { fromRequest: true });
                })
                .finally(() => setLoading(false));
        }
    };

    return (
        <Layout className={styles.container__registration}>
            {loading && <Loader />}
            <Form
                className={styles.form}
                name='register'
                onFinish={onFinish}
                onFinishFailed={(error) => {
                    console.log(error);
                }}
                scrollToFirstError={true}
            >
                <Image
                    src='/logo_auth.svg'
                    className={styles.form__logo}
                    alt='logo'
                    preview={false}
                />

                <div className={styles.choice_buttons}>
                    <Tabs
                        defaultActiveKey={activeTabKey}
                        centered={true}
                        className={styles.tabs}
                        onTabClick={(key) => {
                            if (key === '1') navigate('/auth');

                            if (key === '2') navigate('registration');
                        }}
                        items={[
                            {
                                label: 'Вход',
                                key: '1',
                            },
                            {
                                label: 'Регистрация',
                                key: '2',
                            },
                        ]}
                    />
                </div>

                <Outlet />
            </Form>
        </Layout>
    );
};
