import { Button, Divider, Form, Modal, Rate } from 'antd';
import s from './writeFeedback.module.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { dataReviewSelector, isModalCreateFeedbackSelector } from '@constants/selectors/selectors';
import TextArea from 'antd/lib/input/TextArea';
import { actions } from '@redux/reducers/feedback.slice';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { СreateFeedback } from '../../../types/valueRequest';
import { useCreateFeedbacksMutation } from '@redux/api-rtk/feedback.api';

export const WriteFeedbackModal = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const isModalCreateFeedback = useAppSelector(isModalCreateFeedbackSelector);
    const dataReview = useAppSelector(dataReviewSelector);
    const [createFeedback, { isSuccess, isError }] = useCreateFeedbacksMutation();
    const [valueRating, setValueRating] = useState(0);
    const [valueText, setValueText] = useState('');

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

    const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setValueText(value);
    };

    return (
        <Modal
            maskStyle={{ backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: 'blur(5px)' }}
            centered
            open={isModalCreateFeedback}
            className={s.modal}
            title='Ваш отзыв'
            onCancel={() => {
                dispatch(actions.createFeedback(false));
            }}
            footer={false}
        >
            <Form
                form={form}
                initialValues={{
                    rating: dataReview.rating,
                    message: dataReview.message,
                }}
                className={s.form}
                onFinish={onFinish}
            >
                <Form.Item name='rating'>
                    <Rate
                        className={s.modal__rating}
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
                <Form.Item name='message' className={s.textarea}>
                    <TextArea
                        className={s.textArea}
                        onChange={(e) => handleChangeText(e)}
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        placeholder='Расскажите, почему Вам понравилось наше приложение'
                    />
                </Form.Item>
                <Divider style={{ marginBottom: 0 }} />
                <div className={s.wrapper__btn}>
                    <Button
                        data-test-id='new-review-submit-button'
                        disabled={dataReview.rating != 0 || valueRating != 0 ? false : true}
                        key='publish-btn'
                        type='primary'
                        htmlType='submit'
                        className={s.modal_btn}
                    >
                        Опубликовать
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};
