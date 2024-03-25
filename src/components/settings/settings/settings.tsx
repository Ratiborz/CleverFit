import React, { useState } from 'react';
import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { WriteFeedbackModal } from '@components/feedback/write-feedback/write-feedback';
import { Paths } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { actions } from '@redux/reducers/feedback.slice';
import { Button, Card, Image, Switch, Tooltip } from 'antd';

import { DrawerSettings } from '../drawer-settings/drawer-settings';

import styles from './settings.module.scss';

export const Settings = () => {
    const dispatch = useAppDispatch();
    const [openDrawer, setOpenDrawer] = useState(false);

    const openSideDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    const switchToFeedbackPage = () => {
        history.push(Paths.FEEDBACKS);
    };

    return (
        <React.Fragment>
            <WriteFeedbackModal />
            <DrawerSettings openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
            <div className={styles.container__profile}>
                <h2 className={styles.title__my_tariff}>Мой тарифф</h2>
                <div className={styles.container__cards}>
                    <Card className={styles.card__plan}>
                        <div className={styles.card__header}>
                            <p className={styles.card__name_tariff}>FREE tarif</p>
                            <Button type='link' onClick={() => openSideDrawer()}>
                                Подробнее
                            </Button>
                        </div>
                        <Image src='/free_plan.png' preview={false} className={styles.card__img} />
                        <div className={styles.bottom__btn}>
                            <p className={styles.card__btn_text}>активен</p> <CheckOutlined />
                        </div>
                    </Card>

                    <Card className={styles.card__plan}>
                        <div className={styles.card__header}>
                            <p className={styles.card__name_tariff}>PRO tarif</p>
                            <Button type='link' onClick={() => openSideDrawer()}>
                                Подробнее
                            </Button>
                        </div>
                        <Image src='/pro_plan.png' preview={false} className={styles.card__img} />
                        <Button className={styles.card__btn_activate}>Активировать</Button>
                    </Card>
                </div>
                <div className={styles.switchers__container}>
                    <div className={styles.switch}>
                        <div>
                            Открыт для совместных тренировок
                            <Tooltip
                                placement='bottomLeft'
                                title='включеная функция позволит участвовать в совместных тренировках'
                                overlayStyle={{ maxWidth: '215px' }}
                            >
                                <ExclamationCircleOutlined style={{ marginLeft: 4 }} />
                            </Tooltip>
                        </div>
                        <Switch />
                    </div>
                    <div className={styles.switch}>
                        <div>
                            Уведомления
                            <Tooltip
                                placement='bottomLeft'
                                title='включеная функция позволит получать уведомления об активностях'
                                overlayStyle={{ maxWidth: '215px' }}
                            >
                                <ExclamationCircleOutlined style={{ marginLeft: 4 }} />
                            </Tooltip>
                        </div>
                        <Switch />
                    </div>
                    <div className={styles.switch}>
                        <div>
                            Тёмная тема
                            <Tooltip
                                placement='bottomLeft'
                                title='тёмная тема доступна для PRO tariff'
                                overlayStyle={{ maxWidth: '215px' }}
                            >
                                <ExclamationCircleOutlined style={{ marginLeft: 4 }} />
                            </Tooltip>
                        </div>
                        <Switch disabled={true} />
                    </div>
                </div>
                <div className={styles.wrapper__buttons}>
                    <Button
                        className={styles.btn__create_feedback}
                        onClick={() => dispatch(actions.createFeedback(true))}
                    >
                        Написать отзыв
                    </Button>
                    <Button
                        className={styles.btn__all_feedback}
                        type='link'
                        onClick={() => switchToFeedbackPage()}
                    >
                        Смотреть все отзывы
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};
