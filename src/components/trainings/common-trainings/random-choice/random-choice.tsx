import React, { useState } from 'react';
import { DrawerTraining } from '@components/trainings/drawer/drawer';
import { itemsPerPage } from '@constants/constants';
import { trainingDataPalsSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/training.slice';
import { Button, Image, Input, PageHeader, Pagination } from 'antd';
import { CreateCommonTraining } from '../../../../types/trainings-types';

import styles from './random-choice.module.scss';

const { Search } = Input;

export const RandomChoice = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const trainingDataPals = useAppSelector(trainingDataPalsSelector);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    const createTraining = ({ name, trainingType, imgSrc, id }: CreateCommonTraining) => {
        setOpen(true);
        dispatch(actions.setCommonTrainingState(true));
        dispatch(actions.setUserDataForDrawer({ name, trainingType, imgSrc, id }));
    };

    const onSearch = (value: string) => console.log(value);

    const onBack = () => dispatch(actions.setRandomChoiceState(false));

    const currentPage = (pageNumber: number) => {
        setCurrentPageNumber(pageNumber);
    };

    const startIndex = (currentPageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTrainingData = trainingDataPals.data.slice(startIndex, endIndex);

    console.log(currentTrainingData);

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
                    <div className={styles.wrapper__card} key={training.id}>
                        <div className={styles.avatar_name}>
                            <Image
                                src={training.imageSrc ? training.imageSrc : '/Avatar-mock.svg'}
                                alt='avatar'
                                preview={false}
                                className={styles.avatar}
                            />
                            <p>{training.name}</p>
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
                            onClick={() =>
                                createTraining({
                                    name: training.name,
                                    trainingType: training.trainingType,
                                    imgSrc: training.imageSrc,
                                    id: training.id,
                                })
                            }
                        >
                            Создать тренировку
                        </Button>
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
