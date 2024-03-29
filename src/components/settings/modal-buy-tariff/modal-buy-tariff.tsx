import { CheckCircleFilled } from '@ant-design/icons';
import { Paths } from '@constants/paths';
import { userInfoDataSelector } from '@constants/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { Modal, Typography } from 'antd';

import styles from './modal-buy-tariff.module.scss';

type Props = {
    openModal: boolean;
};

export const ModalBuyTariff = ({ openModal }: Props) => {
    const userData = useAppSelector(userInfoDataSelector);

    const cancelProcess = () => {
        localStorage.clear();
        sessionStorage.clear();
        history.push(Paths.AUTH);
    };

    return (
        <Modal
            data-test-id='tariff-modal-success'
            centered={true}
            className={styles.card}
            open={openModal}
            maskStyle={{ backgroundColor: 'rgba(121, 156, 212, 0.2)', backdropFilter: 'blur(5px)' }}
            onCancel={() => cancelProcess()}
            footer={false}
        >
            <CheckCircleFilled style={{ color: '#2F54EB', fontSize: '70px' }} />
            <h3 className={styles.card__h3}>Чек для оплаты у вас на почте</h3>
            <Typography className={styles.card__descrip}>
                Мы отправили инструкцию для оплаты вам на e-mail <strong>{userData?.email}</strong>.
                После подтверждения оплаты войдите в приложение заново.
            </Typography>
            <Typography className={styles.card__small_descrip}>
                Не пришло письмо? Проверьте папку Спам.
            </Typography>
        </Modal>
    );
};
