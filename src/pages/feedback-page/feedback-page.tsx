import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import { CustomRate } from '@components/custom-rate/custom-rate';
import { FirstFeedback } from '@components/feedback/first-feedback/first-feedback';
import { ModalFaildCreate } from '@components/feedback/modal-error/modal-error';
import { SuccessModal } from '@components/feedback/success-modal/success-modal';
import { WriteFeedbackModal } from '@components/feedback/write-feedback/write-feedback';
import { Loader } from '@components/loader/loader';
import { Aside } from '@components/main-page/sider/sider';
import { ModalError } from '@components/result/feedback-result/modal-error/modal-error';
import { forbiddenStatus, positionImage } from '@constants/constants/constants';
import { Paths } from '@constants/paths';
import {
    beFeedbackSelector,
    isCreateFeedbackSuccessSelector,
    isModalCreateFeedbackSelector,
    StateModalErrorSelector,
    warningSelector,
} from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useGetFeedBacksQuery } from '@redux/api-rtk/feedback-requests';
import { history } from '@redux/configure-store';
import { actions } from '@redux/reducers/feedback.slice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { isUserAuthLocal, isUserAuthSession, sessionToken, storageToken } from '@utils/storage';
import { currentTime } from '@utils/utils';
import { Button, Card, Image, Layout } from 'antd';
import Typography from 'antd/lib/typography/Typography';

import styles from './feedback-page.module.scss';

export const FeedbackPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const isModalCreateFeedback = useAppSelector(isModalCreateFeedbackSelector);
    const beFeedback = useAppSelector(beFeedbackSelector);
    const isModalOpen = useAppSelector(warningSelector);
    const isModalError = useAppSelector(StateModalErrorSelector);
    const isSuccessModal = useAppSelector(isCreateFeedbackSuccessSelector);
    const [showFeedback, setShowFeedback] = useState(false);
    const { data: feedbacks = [], isLoading, isError, isFetching, error } = useGetFeedBacksQuery();

    useEffect(() => {
        if (!feedbacks) {
            dispatch(actions.setStateFeedback(true));
        }
        if (error) {
            console.log(error);
            const localAccessToken = storageToken.getItem('accessToken');
            const sessionAccessToken = sessionToken.getItem('accessToken');
            const token = localAccessToken ?? sessionAccessToken;

            if ((error as FetchBaseQueryError).status === forbiddenStatus) {
                localStorage.clear();
                sessionStorage.clear();
                history.push(Paths.AUTH);
            } else if (token) {
                dispatch(actions.setWarning(true));
            }
        }
    }, [error, feedbacks, dispatch]);

    if (!isUserAuthLocal() && !isUserAuthSession()) {
        return <Navigate to='/auth' />;
    }

    const isSuccessFetching = !isFetching && !isError;

    return (
        <React.Fragment>
            {isLoading && <Loader />}
            {isModalOpen && <ModalError />}
            {isModalError && <ModalFaildCreate />}
            {isSuccessModal && <SuccessModal />}
            <Layout className={styles.general_wrapper} style={positionImage}>
                <Aside />
                <Layout className={styles.main_container}>
                    <Breadcrumbs />
                    {isModalCreateFeedback && <WriteFeedbackModal />}
                    {isSuccessFetching &&
                        (beFeedback ? (
                            <FirstFeedback />
                        ) : (
                            <React.Fragment>
                                <div className={styles.overflow__wrapper}>
                                    {(showFeedback
                                        ? feedbacks.slice().reverse()
                                        : feedbacks.slice(-4).reverse()
                                    ).map((data) => (
                                        <Card className={styles.comment} key={data.id}>
                                            <div className={styles.wrapper__img_name}>
                                                <Image
                                                    src={
                                                        data.imageSrc
                                                            ? data.imageSrc
                                                            : '/Avatar-mock.svg'
                                                    }
                                                    className={styles.comment_img}
                                                    alt='avatar'
                                                    preview={false}
                                                />
                                                <Typography className={styles.comment_name}>
                                                    {data.fullName ? data.fullName : 'Пользователь'}
                                                </Typography>
                                            </div>
                                            <div className={styles.wrapper__description}>
                                                <div className={styles.wrapper__rating_date}>
                                                    <CustomRate data={data} isPage={true} />
                                                    <span className={styles.comment_date}>
                                                        {currentTime(data.createdAt)}
                                                    </span>
                                                </div>
                                                <Typography className={styles.comment_text}>
                                                    {data.message}
                                                </Typography>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                <div className={styles.wrapper__buttons}>
                                    <Button
                                        data-test-id='write-review'
                                        className={styles.btn__create_feedback}
                                        onClick={() => dispatch(actions.createFeedback(true))}
                                    >
                                        Написать отзыв
                                    </Button>
                                    <Button
                                        data-test-id='all-reviews-button'
                                        className={styles.btn__all_feedback}
                                        type='link'
                                        onClick={() => {
                                            setShowFeedback(!showFeedback);
                                        }}
                                    >
                                        {showFeedback
                                            ? 'Свернуть все отзывы '
                                            : 'Развернуть все отзывы'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        ))}
                </Layout>
            </Layout>
        </React.Fragment>
    );
};
