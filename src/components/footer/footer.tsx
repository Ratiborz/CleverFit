import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Button, Card, Divider, Space } from 'antd';
import s from './footer.module.scss';

export const Footer = () => {
    return (
        <footer className={s.footer}>
            <Button type='link' className={s.feedback_btn}>
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
    );
};
