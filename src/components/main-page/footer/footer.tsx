import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Button, Card, Divider, Space } from 'antd';
import s from './footer.module.scss';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import Loader from '@components/loader/loader';
import { useState } from 'react';

export const Footer: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const feedback = () => {
        history.push(Paths.FEEDBACKS);
    };

    return (
        <>
            {loading && <Loader />}

            <footer className={s.footer}>
                <Button
                    data-test-id='see-reviews'
                    type='link'
                    className={s.feedback_btn}
                    onClick={() => feedback()}
                >
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
