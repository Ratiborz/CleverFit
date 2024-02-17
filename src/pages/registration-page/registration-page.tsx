import { Registration } from '@components/registration/registration';
import { Layout } from 'antd';
import s from './registration-page.module.scss';

export const RegistrationPage: React.FC = () => {
    return (
        <Layout className={s.container__registration}>
            <Registration />
        </Layout>
    );
};
