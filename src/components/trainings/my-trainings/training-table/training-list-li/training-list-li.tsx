import React from 'react';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { getCurrentColor } from '@components/choose-color-badge/choose-color-badge';
import { periodValueMap } from '@constants/constants/constants';
import { trainingsDataSelector } from '@constants/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Badge, Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { InfoCard } from '../../info-card/info-card';

import styles from './training-list-li.module.scss';

type Props = {
    infoCard: {
        date: string;
        name: string;
    };
    handleEditTraining: (name: string, date: string, infoCard?: string) => void;
    setOpen: (arg: boolean) => void;
    setInfoCard: ({ date, name }: { date: string; name: string }) => void;
};

interface DataType {
    key: number;
    name: JSX.Element;
    periodLabel: JSX.Element;
    periodValue: number | undefined;
    edit: JSX.Element;
}

const columns: ColumnsType<DataType> = [
    {
        title: <div className='ant-table-column-sorters'>Тип тренировки</div>,
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Периодичность',
        dataIndex: 'periodLabel',
        key: 'periodLabel',
        sorter: (a, b) => a.periodValue! - b.periodValue!,
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: '',
        dataIndex: 'edit',
        key: 'edit,',
    },
];

export const TrainingListLi = ({ infoCard, handleEditTraining, setOpen, setInfoCard }: Props) => {
    const trainingData = useAppSelector(trainingsDataSelector);

    const data = trainingData.map((training, index) => ({
        key: index,
        name: (
            <div className={styles.type_training__badge}>
                <Badge color={getCurrentColor(training.name)} className={styles.badge} />
                <div className={styles.wrapper__type}>
                    <p>{training.name}</p>
                    <Button
                        className={styles.dropDown_btn}
                        onClick={() => handleEditTraining(training.name, training.date, 'infoCard')}
                    >
                        <DownOutlined />
                    </Button>
                    {infoCard.date === training.date && infoCard.name === training.name && (
                        <InfoCard
                            setOpen={setOpen}
                            setInfoCard={setInfoCard}
                            color={getCurrentColor(training.name)}
                        />
                    )}
                </div>
            </div>
        ),
        periodLabel: (
            <React.Fragment>
                {training.parameters && (
                    <div>
                        {training.parameters.period !== 0
                            ? periodValueMap[training.parameters.period]
                            : ''}
                    </div>
                )}
            </React.Fragment>
        ),
        periodValue: training.parameters?.period,
        edit: (
            <Button
                data-test-id={`update-my-training-table-icon${index}`}
                disabled={training.isImplementation}
                className={styles.btn__edit_training}
            >
                <EditOutlined
                    style={{
                        fontSize: 26,
                        color: training.isImplementation ? '#BFBFBF' : '#2F54EB',
                    }}
                    onClick={() => handleEditTraining(training.name, training.date)}
                />
            </Button>
        ),
    }));

    return (
        <Table
            dataSource={data}
            columns={columns}
            pagination={
                trainingData.length >= 10 ? { position: ['bottomLeft'], size: 'small' } : false
            }
            className={styles.table}
            rowClassName={styles.trainings__table_rows}
            data-test-id='my-trainings-table'
        />
    );
};
