import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Button, Card, Divider, Image, Modal, Space, Typography } from 'antd';
import s from './footer.module.scss';
import { Paths } from '@constants/paths';
import { getFeedBacks } from '../../../api';
import { history } from '@redux/configure-store';
import Loader from '@components/loader/loader';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/feedback.slice';
import { ModalError } from '@components/result/feedback-result/modal-error/modalError';
import { warningSelector } from '@constants/selectors';

export const Footer: React.FC = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const isModalOpen = useAppSelector(warningSelector);

    const feedback = () => {
        setLoading(true);
        getFeedBacks()
            .then((response) => {
                console.log(response);
                dispatch(
                    actions.setFeedbackData({ data: response.data, countFeedback: 'firstLoad' }),
                );
                history.push(Paths.FEEDBACKS);

                if (!response.data) dispatch(actions.setStateFeedback(true));
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 403) {
                    localStorage.clear();
                    sessionStorage.clear();
                    history.push(Paths.AUTH);
                }
                if (error.config.headers.Authorization) {
                    dispatch(actions.setWarning(true));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            {loading && <Loader />}
            {isModalOpen && <ModalError />}
            <footer className={s.footer}>
                <Button type='link' className={s.feedback_btn} onClick={() => feedback()}>
                    Смотреть отзывы
                </Button>

                <Card bodyStyle={{ padding: 0 }} className={s.card}>
                    <div className={s.dowloand_btn}>
                        <Button type='link' style={{ padding: 0 }} className={s.dowloand}>
                            Скачать на телефон
                        </Button>
                        <p className={s.dowloand_btn__descrip}>Доступно в PRO-тарифе</p>
                    </div>

                    <Divider style={{ margin: 0 }} />

                    <Space
                        size={29}
                        style={{ width: '100%', justifyContent: 'center', padding: '12px 24px' }}
                    >
                        <Button
                            style={{ color: '#000000D9', padding: 0 }}
                            type='link'
                            icon={<AndroidFilled style={{ color: '#000000D9' }} />}
                        >
                            Android OS
                        </Button>

                        <Button
                            style={{ color: '#000000D9', padding: 0 }}
                            type='link'
                            icon={<AppleFilled style={{ color: '#000000D9' }} />}
                        >
                            Apple iOS
                        </Button>
                    </Space>
                </Card>
            </footer>
        </>
    );
};
