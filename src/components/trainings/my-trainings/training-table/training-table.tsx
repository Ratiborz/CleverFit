import React from 'react';
import { getCurrentColor } from '@components/choose-color-badge/choose-color-badge';
import { sortByValues } from '@constants/constants';
import { Badge, Select } from 'antd';

import styles from './training-table.module.scss';
import { DownOutlined, EditOutlined } from '@ant-design/icons';

export const TrainingTable = () => {
    console.log();

    return (
        <React.Fragment>
            <div className={styles.header__table}>
                <p className={styles.header__title}>Тип тренировки</p>
                <Select
                    placeholder='Сортировка по периоду'
                    bordered={false}
                    className={styles.select}
                    options={sortByValues.map((name) => ({
                        value: name,
                        label: name,
                    }))}
                />
            </div>
            <div className={styles.container__body_table}>
                <ul className={styles.training__list_ul}>
                    <li className={styles.default_li}>
                        <div className={styles.type_training__badge}>
                            <Badge color={getCurrentColor('руки')} style={{ marginRight: '8px' }} />
                            <div className={styles.wrapper__type}>
                                <p>Руки</p>
                                <DownOutlined />
                            </div>
                        </div>
                        <div className={styles.date_training}>
                            <span>05.02.2024</span>
                            <EditOutlined />
                        </div>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};
