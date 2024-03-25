import { CloseCircleOutlined } from '@ant-design/icons';
import { maskStyle } from '@constants/constants';
import { Button, Modal } from 'antd';

import styles from './modal-error.module.scss';

type Props = {
    openModalError: boolean;
    setOpenModalError: (arg: boolean) => void;
};

export const ModalErrorSave = ({ openModalError, setOpenModalError }: Props) => (
    <Modal
        maskStyle={maskStyle}
        centered={true}
        closable={false}
        footer={false}
        open={openModalError}
        className={styles.modal_error}
    >
        <CloseCircleOutlined style={{ color: 'red', fontSize: 22, marginRight: 16 }} />
        <div className={styles.modal_description}>
            <h2 className={styles.modal_title}>При сохранении данных произошла ошибка </h2>
            <p className={styles.modal_message}>Придётся попробовать ещё раз</p>
            <div className={styles.wrapper__btn}>
                <Button className={styles.btn__close} onClick={() => setOpenModalError(false)}>
                    Закрыть
                </Button>
            </div>
        </div>
    </Modal>
);
