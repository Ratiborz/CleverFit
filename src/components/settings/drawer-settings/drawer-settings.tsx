import { CheckCircleFilled, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Radio } from 'antd';

import styles from './drawer-settings.module.scss';

type Props = {
    openDrawer: boolean;
    setOpenDrawer: (arg: boolean) => void;
};

export const DrawerSettings = ({ openDrawer, setOpenDrawer }: Props) => {
    console.log();

    return (
        <Drawer
            title='Сравнить тарифы'
            className={styles.drawer}
            open={openDrawer}
            width={408}
            closeIcon={false}
            maskClosable={false}
            mask={false}
            destroyOnClose={true}
            footer={<Button className={styles.btn__pay}>Выбрать и оплатить</Button>}
        >
            <Button
                htmlType='submit'
                type='text'
                className={styles.close__icon}
                onClick={() => setOpenDrawer(false)}
            >
                <CloseOutlined />
            </Button>
            <div className={styles.wrapper__options}>
                <div className={styles.status__plan}>
                    <div className={styles.status_free}>FREE</div>
                    <div className={styles.status_pro}>PRO</div>
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
                    <li className={styles.radio__option__li}>
                        <p className={styles.option_text}>6 месяцев</p>
                        5,5$
                    </li>
                    <li className={styles.radio__option__li}>
                        <p className={styles.option_text}>9 месяцев</p>
                        8,5$
                    </li>
                    <li className={styles.radio__option__li}>
                        <p className={styles.option_text}>12 месяцев</p>
                        10$
                    </li>
                </ul>
                <Radio.Group name='radiogroup' className={styles.radio_group}>
                    <Radio value={5.5} />
                    <Radio value={8.5} />
                    <Radio value={10} />
                </Radio.Group>
            </div>
        </Drawer>
    );
};
