import { Tabs } from 'antd';

import { MyTrainings } from '../my-trainings/my-trainings';

import styles from './container-trainings.module.scss';

export const ContainerTrainings = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <div className={styles.container}>
            <Tabs
                defaultActiveKey='1'
                onChange={onChange}
                onTabScroll={(e) => console.log(e)}
                className={styles.tabs}
                items={[
                    {
                        label: 'Мои тренировки',
                        key: '1',
                        children: <MyTrainings />,
                    },
                    {
                        label: 'Совместные тренировки',
                        key: '2',
                        children: 'Content of Tab Pane 2',
                    },
                    {
                        label: 'Марафоны',
                        key: '3',
                        children: 'Content of Tab Pane 3',
                    },
                ]}
            />
        </div>
    );
};
