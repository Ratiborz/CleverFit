import React from 'react';
import { Navigate } from 'react-router-dom';
import { Aside } from '@components/main-page/sider/sider';
import { positionImage } from '@constants/constants';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { isUserAuthLocal, isUserAuthSession } from '@utils/storage';
import { Button, Card, Image, Layout } from 'antd';

import styles from './not-found-page.module.scss';

export const NotFoundPage: React.FC = () => {
    if (!isUserAuthLocal() && !isUserAuthSession()) {
        return <Navigate to={Paths.AUTH} />;
    }

    const goToMain = () => history.push(Paths.MAIN);

    return (
        <Layout className={styles.general_wrapper} style={positionImage}>
            <Aside />
            <Layout className={styles.main_container}>
                <div className={styles.container__notFound}>
                    <Card className={styles.card}>
                        <Image
                            src='/not-found.png'
                            alt='not-found'
                            preview={false}
                            className={styles.card__image}
                        />
                        <h2>Такой страницы нет</h2>
                        <p className={styles.card__descrip}>
                            Извините, страница не найдена, возможно, она была удалена или
                            перемещена.
                        </p>
                        <Button className={styles.card__btn} onClick={() => goToMain()}>
                            На главную
                        </Button>
                    </Card>
                </div>
            </Layout>
        </Layout>
    );
};
