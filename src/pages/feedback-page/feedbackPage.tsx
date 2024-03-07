import { Aside } from '@components/main-page/sider/sider';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isUserAuthSession, isUserAuthLocal, storageToken, sessionToken } from '@utils/storage';
import { Button, Card, Image, Layout, Rate } from 'antd';
import { Navigate } from 'react-router-dom';
import styles from './feedbackPage.module.scss';
import {
    StateModalErrorSelector,
    beFeedbackSelector,
    isCreateFeedbackSuccessSelector,
    isModalCreateFeedbackSelector,
    warningSelector,
} from '@constants/selectors/selectors';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import { FirstFeedback } from '@components/feedback/first-feedback/firstFeedback';
import Typography from 'antd/lib/typography/Typography';
import { currentTime } from '@utils/utils';
import { WriteFeedbackModal } from '@components/feedback/write-feedback/writeFeedback';
import { actions } from '@redux/reducers/feedback.slice';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Loader } from '@components/loader/loader';
import { history } from '@redux/configure-store';
import { Paths } from '@constants/paths';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ModalError } from '@components/result/feedback-result/modal-error/modalError';
import { ModalFaildCreate } from '@components/feedback/modal-error/modalError';
import { SuccessModal } from '@components/feedback/success-modal/successModal';
import { forbiddenStatus } from '@constants/constants/constants';
import { useGetFeedBacksQuery } from '@redux/api-rtk/feedbackRequests';

const backgroundImage = '/Main_page_light.png';

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
    }, [error, feedbacks]);

    if (!isUserAuthLocal() && !isUserAuthSession()) {
        return <Navigate to='/auth' />;
    }

    const isSuccessFetching = !isFetching && !isError;

    return (
        <>
            {isLoading && <Loader />}
            {isModalOpen && <ModalError />}
            {isModalError && <ModalFaildCreate />}
            {isSuccessModal && <SuccessModal />}
            <Layout
                className={styles.general_wrapper}
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top',
                }}
            >
                <Aside />
                <Layout className={styles.main_container}>
                    <Breadcrumbs />
                    {isModalCreateFeedback && <WriteFeedbackModal />}
                    {isSuccessFetching &&
                        (beFeedback ? (
                            <FirstFeedback />
                        ) : (
                            <>
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
                                                    <Rate
                                                        disabled
                                                        defaultValue={data.rating}
                                                        className={styles.comment_rate}
                                                        character={({ index, value }) =>
                                                            value! >= index! + 1 ? (
                                                                <StarFilled
                                                                    style={{ color: '#FAAD14' }}
                                                                />
                                                            ) : (
                                                                <StarOutlined
                                                                    style={{ color: '#FAAD14' }}
                                                                />
                                                            )
                                                        }
                                                    />
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
                            </>
                        ))}
                </Layout>
            </Layout>
        </>
    );
};
