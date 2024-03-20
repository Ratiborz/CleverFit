import { Button, Divider, Form, Modal, Rate } from 'antd';
import styles from './writeFeedback.module.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import TextArea from 'antd/lib/input/TextArea';
import { actions } from '@redux/reducers/feedback.slice';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { СreateFeedback } from '../../../types/valueRequest';
import { useCreateFeedbacksMutation } from '@redux/api-rtk/feedbackRequests';
import { dataReviewSelector, isModalCreateFeedbackSelector } from '@constants/selectors';

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
    }, [isError, isSuccess]);

    const onFinish = (value: СreateFeedback) => {
        const rating = value.rating;
        const message = value.message;
        dispatch(actions.setDataReview({ rating, message }));
        createFeedback({ message, rating });
    };

    const handleChange = (value: number) => {
        setValueRating(value);
    };

    const closeModal = () => dispatch(actions.createFeedback(false));

    return (
        <Modal
            maskStyle={{ backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: 'blur(5px)' }}
            centered
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
                    <Rate
                        className={styles.modal__rating}
                        onChange={handleChange}
                        character={({ index, value }) =>
                            value! >= index! + 1 ? (
                                <StarFilled style={{ color: '#FAAD14' }} />
                            ) : (
                                <StarOutlined style={{ color: '#FAAD14' }} />
                            )
                        }
                    />
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
                        disabled={dataReview.rating != 0 || valueRating != 0 ? false : true}
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
