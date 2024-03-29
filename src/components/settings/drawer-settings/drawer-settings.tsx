import React, { useState } from 'react';
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { tariffDataSelector } from '@constants/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useBuyNewTariffMutation } from '@redux/api-rtk/profile-request';
import { Button, Drawer, Radio, RadioChangeEvent } from 'antd';
import classNames from 'classnames';

import { ModalBuyTariff } from '../modal-buy-tariff/modal-buy-tariff';

import styles from './drawer-settings.module.scss';

type Props = {
    openDrawer: boolean;
    setOpenDrawer: (arg: boolean) => void;
    proTariff: boolean;
    day: string;
    month: string;
};

export const DrawerSettings = ({ openDrawer, setOpenDrawer, proTariff, day, month }: Props) => {
    const tariffData = useAppSelector(tariffDataSelector);
    const [radioValue, setRadioValue] = useState(null);
    const [openModalEmail, setModalEmail] = useState(false);
    const [buyNewTariff] = useBuyNewTariffMutation();

    const buyTariff = () => {
        const days =
            tariffData && tariffData[0].periods.filter((period) => period.cost === radioValue);

        const tariff = {
            tariffId: (tariffData && tariffData[0]._id) || '',
            days: (days && days[0].days) || 0,
        };

        buyNewTariff(tariff);
        setModalEmail(true);
    };

    const choiceValueRadio = (e: RadioChangeEvent) => {
        setRadioValue(e.target.value);
    };

    return (
        <React.Fragment>
            <ModalBuyTariff openModal={openModalEmail} />

            <Drawer
                title='Сравнить тарифы'
                className={classNames(styles.drawer, proTariff ? styles.marginNull : '')}
                open={openDrawer}
                width={408}
                closeIcon={false}
                maskClosable={false}
                mask={false}
                destroyOnClose={true}
                footer={
                    proTariff ? (
                        false
                    ) : (
                        <Button
                            className={styles.btn__pay}
                            disabled={!radioValue}
                            onClick={() => buyTariff()}
                        >
                            Выбрать и оплатить
                        </Button>
                    )
                }
            >
                <Button
                    htmlType='submit'
                    type='text'
                    className={styles.close__icon}
                    onClick={() => {
                        setOpenDrawer(false);
                        setRadioValue(null);
                    }}
                >
                    <CloseOutlined />
                </Button>
                {proTariff ? (
                    <div className={styles.pro_tariff__date}>
                        Ваш PRO tarif активен до {day}.{month}
                    </div>
                ) : (
                    ''
                )}
                <div className={styles.wrapper__options}>
                    <div className={styles.status__plan}>
                        <div className={styles.status_free}>FREE</div>
                        <div className={styles.status_pro}>
                            PRO{' '}
                            {proTariff ? (
                                <CheckCircleOutlined style={{ color: '#52C41A', marginLeft: 4 }} />
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <ul className={styles.option}>
                        <li className={styles.option__li}>
                            <p className={styles.option_text}>Статистика за месяц</p>
                            <div className={styles.icons_option}>
                                <CheckCircleFilled />
                                <CheckCircleFilled />
                            </div>
                        </li>
                        <li className={styles.option__li}>
                            <p className={styles.option_text}>Статистика за всё время</p>
                            <div className={styles.icons_option}>
                                <CloseCircleOutlined />
                                <CheckCircleFilled />
                            </div>
                        </li>
                        <li className={styles.option__li}>
                            <p className={styles.option_text}>Совместные тренировки</p>
                            <div className={styles.icons_option}>
                                <CheckCircleFilled />
                                <CheckCircleFilled />
                            </div>
                        </li>
                        <li className={styles.option__li}>
                            <p className={styles.option_text}>Участие в марафонах</p>
                            <div className={styles.icons_option}>
                                <CloseCircleOutlined />
                                <CheckCircleFilled />
                            </div>
                        </li>
                        <li className={styles.option__li}>
                            <p className={styles.option_text}>Приложение iOS</p>
                            <div className={styles.icons_option}>
                                <CloseCircleOutlined />
                                <CheckCircleFilled />
                            </div>
                        </li>
                        <li className={styles.option__li}>
                            <p className={styles.option_text}>Приложение Android</p>
                            <div className={styles.icons_option}>
                                <CloseCircleOutlined />
                                <CheckCircleFilled />
                            </div>
                        </li>
                        <li className={styles.option__li}>
                            <p className={styles.option_text}>Индивидуальный Chat GPT</p>
                            <div className={styles.icons_option}>
                                <CloseCircleOutlined />
                                <CheckCircleFilled />
                            </div>
                        </li>
                    </ul>
                </div>
                <h2 className={styles.tariff__cost}>Стоимость тарифа</h2>
                <div className={styles.container__radio}>
                    <ul className={styles.radio__option}>
                        {tariffData &&
                            tariffData[0].periods.map((period) => (
                                <li className={styles.radio__option__li} key={period.text}>
                                    <p className={styles.option_text}>{period.text}</p>
                                    {period.cost}$
                                </li>
                            ))}
                    </ul>
                    <Radio.Group name='radiogroup' className={styles.radio_group}>
                        <Radio value={5.5} onChange={(e) => choiceValueRadio(e)} />
                        <Radio value={8.5} onChange={(e) => choiceValueRadio(e)} />
                        <Radio value={10} onChange={(e) => choiceValueRadio(e)} />
                    </Radio.Group>
                </div>
            </Drawer>
        </React.Fragment>
    );
};
