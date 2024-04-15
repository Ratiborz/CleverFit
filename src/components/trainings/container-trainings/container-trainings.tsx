import { randomStateSelector } from '@constants/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Tabs } from 'antd';

import { CommonTrainings } from '../common-trainings/common-trainings';
import { RandomChoice } from '../common-trainings/random-choice/random-choice';
import { MyTrainings } from '../my-trainings/my-trainings';

import styles from './container-trainings.module.scss';

export const ContainerTrainings = () => {
    const randomState = useAppSelector(randomStateSelector);

    return (
        <div className={styles.container}>
            <Tabs
                defaultActiveKey='1'
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
                        children: randomState ? <RandomChoice /> : <CommonTrainings />,
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
