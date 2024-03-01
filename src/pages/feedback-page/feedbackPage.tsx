import { Aside } from '@components/main-page/sider/sider';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isUserAuthSession, isUserAuthLocal } from '@utils/storage';
import { Button, Card, Image, Layout, Rate } from 'antd';
import { Navigate } from 'react-router-dom';
import s from './feedbackPage.module.scss';
import {
    beFeedbackSelector,
    feedbackDataSelector,
    isModalCreateFeedbackSelector,
    lastFeedbackSelector,
    loadingSelector,
} from '@constants/selectors/selectors';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import { FirstFeedback } from '@components/feedback/first-feedback/firstFeedback';
import Typography from 'antd/lib/typography/Typography';
import { currentTime } from '@utils/utils';
import { WriteFeedbackModal } from '@components/feedback/write-feedback/writeFeedback';
import { actions } from '@redux/reducers/feedback.slice';
import { StarFilled, StarOutlined } from '@ant-design/icons';
const Loader = React.lazy(() => import('@components/loader/loader'));

const backgroundImage = '/Main_page_light.png';

export const FeedbackPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const isModalCreateFeedback = useAppSelector(isModalCreateFeedbackSelector);
    const loading = useAppSelector(loadingSelector);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const beFeedback = useAppSelector(beFeedbackSelector);
    const feedbackData = useAppSelector(feedbackDataSelector);
    const lastFeedback = useAppSelector(lastFeedbackSelector);

    if (!isUserAuthLocal() && !isUserAuthSession()) {
        return <Navigate to='/auth' />;
    }

    return (
        <>
            {loading && <Loader />}
            <Layout
                className={s.general_wrapper}
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top',
                }}
            >
                <Aside />
                <Layout className={s.main_container}>
                    <Breadcrumbs />
                    {beFeedback && <FirstFeedback />}
                    {isModalCreateFeedback && <WriteFeedbackModal />}
                    <div className={s.overflow__wrapper}>
                        {(showFeedback ? feedbackData : lastFeedback).map((data) => (
                            <Card className={s.comment} key={data.id}>
                                <div className={s.wrapper__img_name}>
                                    <Image
                                        src={data.imageSrc ? data.imageSrc : '/Avatar-mock.svg'}
                                        className={s.comment_img}
                                        alt='avatar'
                                        preview={false}
                                    />
                                    <Typography className={s.comment_name}>
                                        {data.fullName ? data.fullName : 'Пользователь'}
                                    </Typography>
                                </div>
                                <div className={s.wrapper__description}>
                                    <div className={s.wrapper__rating_date}>
                                        <Rate
                                            disabled
                                            character={<StarOutlined />}
                                            defaultValue={data.rating}
                                            className={s.comment_rate}
                                        />
                                        <span className={s.comment_date}>
                                            {currentTime(data.createdAt)}
                                        </span>
                                    </div>
                                    <Typography className={s.comment_text}>
                                        {data.message}
                                    </Typography>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className={s.wrapper__buttons}>
                        <Button
                            className={s.btn__create_feedback}
                            onClick={() => dispatch(actions.createFeedback(true))}
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            className={s.btn__all_feedback}
                            type='link'
                            onClick={() => {
                                setShowFeedback(!showFeedback);
                            }}
                        >
                            {showFeedback ? 'Свернуть все отзывы ' : 'Развернуть все отзывы'}
                        </Button>
                    </div>
                </Layout>
            </Layout>
        </>
    );
};
