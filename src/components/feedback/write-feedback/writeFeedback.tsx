import { Button, Form, Modal, Rate } from 'antd';
import s from './writeFeedback.module.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isModalCreateFeedbackSelector } from '@constants/selectors/selectors';
import TextArea from 'antd/lib/input/TextArea';
import { actions } from '@redux/reducers/feedback.slice';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useState } from 'react';

export const WriteFeedbackModal = () => {
    const dispatch = useAppDispatch();
    const isModalCreateFeedback = useAppSelector(isModalCreateFeedbackSelector);
    const [value, setValue] = useState(0);

    const handleChange = (value: number) => {
        setValue(value);
    };

    return (
        <Modal
            centered
            open={isModalCreateFeedback}
            className={s.modal}
            title='Ваш отзыв'
            onCancel={() => dispatch(actions.createFeedback(false))}
            footer={[
                <Button
                    key='publish-btn'
                    className={s.modal_btn}
                    onClick={() => dispatch(actions.createFeedback(false))}
                >
                    Опубликовать
                </Button>,
            ]}
        >
            <Form className={s.form}>
                <Rate
                    className={s.modal__rating}
                    value={value}
                    onChange={handleChange}
                    character={({ index, value }) =>
                        value! >= index! + 1 ? (
                            <StarFilled style={{ color: '#FFD700' }} />
                        ) : (
                            <StarOutlined style={{ color: '#FFD700' }} />
                        )
                    }
                />
                <Form.Item>
                    <TextArea
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        placeholder='Оставьте свой отзыв'
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
