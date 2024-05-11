import React, { useCallback, useState } from 'react';
import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { DrawerTraining } from '@components/trainings/drawer/drawer';
import { itemsPerPage } from '@constants/constants';
import { trainingDataPalsSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/training.slice';
import { sortedUsers } from '@utils/sorted-users';
import { Button, Image, Input, PageHeader, Pagination } from 'antd';
import classNames from 'classnames';
import moment from 'moment';

import { CreateCommonTraining } from '../../../../types/trainings-types';

import styles from './random-choice.module.scss';

const { Search } = Input;

export const RandomChoice = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const trainingDataPals = useAppSelector(trainingDataPalsSelector);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [searchValue, setSearchValue] = useState('');

    const createTraining = ({ name, trainingType, imgSrc, id }: CreateCommonTraining) => {
        setOpen(true);
        const trainingId = trainingDataPals.idTypeTraining;
        const dataForInputsCommon = trainingDataPals.dataInputs?.exercises.map((exercise) => ({
            name: exercise.name,
            exercisesName: exercise.name,
            replays: exercise.replays,
            weight: exercise.weight,
            count: exercise.approaches,
            id: exercise.id,
            date: moment(trainingDataPals?.dataInputs?.date).format('DD.MM.YYYY'),
            period: trainingDataPals?.dataInputs?.parameters?.period,
        }));

        if (trainingId) {
            dispatch(actions.setDataForInputs(dataForInputsCommon));
        }
        console.log(dataForInputsCommon);

        dispatch(actions.setCommonTrainingState(true));
        dispatch(actions.setUserDataForDrawer({ name, trainingType, imgSrc, id, trainingId }));
    };

    const onSearch = (value: string) => setSearchValue(value);

    const filteredTrainingList = searchValue
        ? sortedUsers(
              trainingDataPals.data.filter((el) =>
                  el.name.toLowerCase().includes(searchValue.toLowerCase()),
              ),
          )
        : sortedUsers(trainingDataPals.data);

    const highlight = useCallback(
        (text: string, id: string) => {
            if (!searchValue) return text;

            const regex = new RegExp(searchValue, 'gi');
            const parts = text.split(regex);

            return (
                <React.Fragment>
                    {parts.map((part, i) => (
                        <React.Fragment key={`${id + i}`}>
                            {i > 0 && <span style={{ color: 'red' }}>{searchValue}</span>}
                            {part}
                        </React.Fragment>
                    ))}
                </React.Fragment>
            );
        },
        [searchValue],
    );

    const onBack = () => dispatch(actions.setRandomChoiceState(false));

    const currentPage = (pageNumber: number) => {
        setCurrentPageNumber(pageNumber);
    };

    const currentStatus = (status: string | null) => {
        if (status === 'pending') return true;
        if (status === 'accepted') return false;
        if (status === 'rejected') return true;

        return undefined;
    };

    const startIndex = (currentPageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTrainingData = filteredTrainingList.slice(startIndex, endIndex);

    return (
        <React.Fragment>
            <DrawerTraining setOpen={setOpen} open={open} />
            <div className={styles.container__page_header__search}>
                <PageHeader className={styles.page_header} onBack={() => onBack()} title='Назад' />

                <Search
                    data-test-id='search-input'
                    placeholder='Поиск по имени'
                    onSearch={(e) => onSearch(e)}
                    className={styles.search}
                />
            </div>

            <div className={styles.container__users_card}>
                {currentTrainingData?.map((training) => (
                    <div
                        className={classNames(
                            styles.wrapper__card,
                            training.status === 'rejected' && styles.color__rejected,
                        )}
                        key={training.id}
                    >
                        <div className={styles.avatar_name}>
                            <Image
                                src={training.imageSrc ? training.imageSrc : '/Avatar-mock.svg'}
                                alt='avatar'
                                preview={false}
                                className={styles.avatar}
                            />
                            <p>{highlight(training.name, training.id)}</p>
                        </div>

                        <div className={styles.type_training}>
                            <p className={styles.type_training__p}>Тип тренировки:</p>
                            <span className={styles.training}>{training.trainingType}</span>
                        </div>
                        <div className={styles.average_load}>
                            <p className={styles.average_load__p}>Средняя нагрузка:</p>
                            <span className={styles.weight}>
                                {training.avgWeightInWeek}

                                {training.avgWeightInWeek > 999 ? (
                                    <React.Fragment>
                                        <br /> кг/нед
                                    </React.Fragment>
                                ) : (
                                    ` ${'кг/нед'}`
                                )}
                            </span>
                        </div>

                        <Button
                            className={styles.create_training__btn}
                            disabled={currentStatus(training.status)}
                            onClick={() =>
                                createTraining({
                                    name: training.name,
                                    trainingType: training.trainingType,
                                    imgSrc: training.imageSrc,
                                    id: training.id,
                                })
                            }
                        >
                            {training.status === 'accepted'
                                ? 'Отменить тренировку'
                                : 'Создать тренировку'}
                        </Button>
                        {training.status === 'pending' && (
                            <p className={styles.waiting_confirn}>ожидает подтверждения</p>
                        )}
                        {training.status === 'accepted' && (
                            <p className={styles.waiting_confirn}>
                                тренировка одобрена
                                <CheckCircleFilled style={{ marginLeft: 8, color: '#52C41A' }} />
                            </p>
                        )}
                        {training.status === 'rejected' && (
                            <p className={styles.waiting_confirn}>
                                тренировка отклонена
                                <ExclamationCircleOutlined style={{ marginLeft: 8 }} />
                            </p>
                        )}
                    </div>
                ))}
            </div>
            <Pagination
                defaultCurrent={currentPageNumber}
                pageSize={currentTrainingData.length}
                total={trainingDataPals.data.length}
                hideOnSinglePage={true}
                showSizeChanger={false}
                size='small'
                onChange={(e) => currentPage(e)}
            />
        </React.Fragment>
    );
};
