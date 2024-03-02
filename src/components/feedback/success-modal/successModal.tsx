import { Button, Image, Modal } from 'antd';

export const SuccessModal = () => {
    return (
        <Modal>
            <Image src='/public/result/Suggested_icon.svg' width={80} />
            <h2>Отзыв успешно опубликован</h2>
            <Button>Отлично</Button>
        </Modal>
    );
};
