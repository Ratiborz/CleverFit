import { CloseCircleOutlined } from '@ant-design/icons';
import { maskStyle } from '@constants/constants';
import { Button, Modal } from 'antd';

import styles from './modal-big-file.module.scss';

type Props = {
    isBigFile: boolean;
    setIsBigFile: (arg: boolean) => void;
};

export const ModalBigFile = ({ isBigFile, setIsBigFile }: Props) => (
    <Modal
        maskStyle={maskStyle}
        centered={true}
        closable={false}
        footer={false}
        open={isBigFile}
        className={styles.modal_error}
    >
        <CloseCircleOutlined style={{ color: 'red', fontSize: 22, marginRight: 16 }} />
        <div className={styles.modal_description}>
            <h2 className={styles.modal_title}>Файл слишком большой</h2>
            <p className={styles.modal_message}>Выберить файл размером [....] МБ</p>
            <div className={styles.wrapper__btn}>
                <Button className={styles.btn__close} onClick={() => setIsBigFile(false)}>
                    Закрыть
                </Button>
            </div>
        </div>
    </Modal>
);
