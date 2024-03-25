import { CheckCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';

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
                </ul>
            </div>
        </Drawer>
    );
};
