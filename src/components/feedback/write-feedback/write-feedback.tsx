import { useEffect, useState } from 'react';
import { CustomRate } from '@components/custom-rate/custom-rate';
import { maskStyle } from '@constants/constants';
import { dataReviewSelector, isModalCreateFeedbackSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useCreateFeedbacksMutation } from '@redux/api-rtk/feedback-requests';
import { actions } from '@redux/reducers/feedback.slice';
import { Button, Divider, Form, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { СreateFeedback } from '../../../types/value-request';

import styles from './write-feedback.module.scss';

export const WriteFeedbackModal = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const isModalCreateFeedback = useAppSelector(isModalCreateFeedbackSelector);
    const dataReview = useAppSelector(dataReviewSelector);
    const [createFeedback, { isSuccess, isError }] = useCreateFeedbacksMutation();
    const [valueRating, setValueRating] = useState(0);

    useEffect(() => {
        if (isSuccess) {
            dispatch(actions.setStateCreateFeedback(isSuccess));
            dispatch(actions.createFeedback(!isSuccess));
        } else if (isError) {
            dispatch(actions.setStateModalError(isError));
            dispatch(actions.createFeedback(isSuccess));
        }
    }, [isError, isSuccess, dispatch]);

    const onFinish = (value: СreateFeedback) => {
        const rating = valueRating;
        const { message } = value;

        dispatch(actions.setDataReview({ rating, message }));
        createFeedback({ message, rating });
    };

    const handleChange = (value: number) => setValueRating(value);

    const closeModal = () => dispatch(actions.createFeedback(false));

    return (
        <Modal
            maskStyle={maskStyle}
            centered={true}
            open={isModalCreateFeedback}
            className={styles.modal}
            title='Ваш отзыв'
            onCancel={() => closeModal()}
            footer={false}
        >
            <Form
                form={form}
                initialValues={{
                    rating: dataReview.rating,
                    message: dataReview.message,
                }}
                className={styles.form}
                onFinish={onFinish}
            >
                <Form.Item name='rating'>
                    <CustomRate handleChange={handleChange} isPage={false} />
                </Form.Item>
                <Form.Item name='message' className={styles.textarea}>
                    <TextArea
                        className={styles.textArea}
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        placeholder='Оставьте свой отзыв'
                    />
                </Form.Item>
                <Divider style={{ marginBottom: 0 }} />
                <div className={styles.wrapper__btn}>
                    <Button
                        data-test-id='new-review-submit-button'
                        disabled={!(dataReview.rating !== 0 || valueRating !== 0)}
                        key='publish-btn'
                        type='primary'
                        htmlType='submit'
                        className={styles.modal_btn}
                    >
                        Опубликовать
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};
