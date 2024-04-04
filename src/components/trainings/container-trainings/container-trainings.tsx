import { Tabs } from 'antd';
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
                className={styles.tabs}
                items={[
                    {
                        label: `Мои тренировки`,
                        key: '1',
                        children: `Content of Tab Pane 1`,
                    },
                    {
                        label: `Совместные тренировки`,
                        key: '2',
                        children: `Content of Tab Pane 2`,
                    },
                    {
                        label: `Марафоны`,
                        key: '3',
                        children: `Content of Tab Pane 3`,
                    },
                ]}
            />
        </div>
    );
};
