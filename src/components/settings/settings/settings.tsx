import React, { useState } from 'react';
import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { WriteFeedbackModal } from '@components/feedback/write-feedback/write-feedback';
import { Paths } from '@constants/paths';
import { userInfoDataSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import useWindowResize from '@hooks/use-window-resize';
import { useEditUserInfoMutation } from '@redux/api-rtk/profile-request';
import { history } from '@redux/configure-store';
import { actions } from '@redux/reducers/feedback.slice';
import { Button, Card, Image, Switch, Tooltip } from 'antd';

import { DrawerSettings } from '../drawer-settings/drawer-settings';

import styles from './settings.module.scss';

export const Settings = () => {
    const dispatch = useAppDispatch();
    const [openDrawer, setOpenDrawer] = useState(false);
    const userData = useAppSelector(userInfoDataSelector);
    const [editUserInfo] = useEditUserInfoMutation();

    const { width } = useWindowResize();
    const isMobile = width <= 360;
    const tooltipPlace = isMobile ? 'top' : 'bottom';

    const proTariff = Boolean(userData?.tariff);

    const expiredDate = userData?.tariff?.expired && new Date(userData?.tariff?.expired);
    const day = expiredDate ? expiredDate.getDate().toString().padStart(2, '0') : '';
    const month = expiredDate ? (expiredDate.getMonth() + 1).toString().padStart(2, '0') : '';

    const editUserOptions = (e: boolean, option: string) => {
        const userInfo = {
            email: userData?.email,
            password: userData?.password,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            birthday: userData?.birthday,
            imgSrc: userData?.imgSrc,
            readyForJointTraining:
                option === 'common training' ? e : userData?.readyForJointTraining,
            sendNotification: option === 'notifications' ? e : userData?.sendNotification,
        };

        if (option === 'common training' || option === 'notifications') editUserInfo(userInfo);
    };

    const openSideDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    const switchToFeedbackPage = () => {
        history.push(Paths.FEEDBACKS);
    };

    return (
        <React.Fragment>
            <WriteFeedbackModal />
            <DrawerSettings
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                proTariff={proTariff}
                day={day}
                month={month}
            />
            <div className={styles.container__profile}>
                <h2 className={styles.title__my_tariff}>Мой тариф</h2>
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

                    <Card className={styles.card__plan} data-test-id='pro-tariff-card'>
                        <div className={styles.card__header}>
                            <p className={styles.card__name_tariff}>PRO tarif</p>
                            <Button type='link' onClick={() => openSideDrawer()}>
                                Подробнее
                            </Button>
                        </div>
                        <Image
                            src={proTariff ? '/pro-plan-active.png' : '/pro_plan.png'}
                            preview={false}
                            className={styles.card__img}
                        />
                        {proTariff ? (
                            <div className={styles.position__text}>
                                <p className={styles.card__btn_text}>
                                    активен до {day}.{month}
                                </p>
                            </div>
                        ) : (
                            <Button
                                data-test-id='activate-tariff-btn'
                                className={styles.card__btn_activate}
                            >
                                Активировать
                            </Button>
                        )}
                    </Card>
                </div>
                <div className={styles.switchers__container}>
                    <div className={styles.switch}>
                        <div className={styles.mobile__position}>
                            <span className={styles.mobile__text_pos}>
                                Открыт для совместных тренировок
                            </span>
                            <Tooltip
                                placement={tooltipPlace}
                                title='включеная функция позволит участвовать в совместных тренировках'
                                overlayStyle={{ maxWidth: '215px' }}
                            >
                                <ExclamationCircleOutlined
                                    data-test-id='tariff-trainings-icon'
                                    style={{ marginLeft: 4, color: '#8c8c8c' }}
                                />
                            </Tooltip>
                        </div>
                        <Switch
                            data-test-id='tariff-trainings'
                            defaultChecked={userData?.readyForJointTraining}
                            onChange={(e) => {
                                editUserOptions(e, 'common training');
                            }}
                        />
                    </div>
                    <div className={styles.switch}>
                        <div>
                            Уведомления
                            <Tooltip
                                placement={tooltipPlace}
                                title='включеная функция позволит получать уведомления об активностях'
                                overlayStyle={{ maxWidth: '215px' }}
                            >
                                <ExclamationCircleOutlined
                                    data-test-id='tariff-notifications-icon'
                                    style={{ marginLeft: 4, color: '#8c8c8c' }}
                                />
                            </Tooltip>
                        </div>
                        <Switch
                            data-test-id='tariff-notifications'
                            defaultChecked={userData?.sendNotification}
                            onChange={(e) => {
                                editUserOptions(e, 'notifications');
                            }}
                        />
                    </div>
                    <div className={styles.switch}>
                        <div className={proTariff ? '' : styles.disabled_color}>
                            Тёмная тема
                            <Tooltip
                                placement={tooltipPlace}
                                title='темная тема доступна для PRO tarif'
                                overlayStyle={{ maxWidth: '215px' }}
                            >
                                <ExclamationCircleOutlined
                                    data-test-id='tariff-theme-icon'
                                    style={{ marginLeft: 4, color: '#8c8c8c' }}
                                />
                            </Tooltip>
                        </div>
                        <Switch data-test-id='tariff-theme' disabled={!proTariff} />
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
