import React, { useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { userInfoDataSelector } from '@constants/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import useWindowResize from '@hooks/use-window-resize';
import { sessionToken, storageToken } from '@utils/storage';
import { Button, Form, Modal, Upload } from 'antd';
import { RcFile, UploadFile, UploadProps } from 'antd/lib/upload';
import { UploadFileStatus } from 'antd/lib/upload/interface';

import { ModalBigFile } from '../modal-big-file/modal-big-file';

import styles from './upload-image.module.scss';

type Props = {
    saveImage: (url: string) => void;
};

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const UploadImage = ({ saveImage }: Props) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const userInfoData = useAppSelector(userInfoDataSelector);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isBigFile, setIsBigFile] = useState(false);

    const { width } = useWindowResize();
    const isMobile = width <= 360;

    const handleCancel = () => setPreviewOpen(false);

    const token = storageToken.getItem('accessToken') || sessionToken.getItem('accessToken');
    const googleAuth = localStorage.getItem('isGoogleAuth') === 'true';

    const handlePreview = async (file: UploadFile) => {
        const updatedFile = { ...file };

        if (!updatedFile.url && !updatedFile.preview) {
            updatedFile.preview = await getBase64(updatedFile.originFileObj as RcFile);
        }

        setPreviewImage(updatedFile.url || (updatedFile.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            updatedFile.name || updatedFile.url!.substring(updatedFile.url!.lastIndexOf('/') + 1),
        );
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
        setFileList(newFileList);

        if (file.status === 'done') {
            const url = `https://training-api.clevertec.ru${file.response.url}`;

            saveImage(url);
        }

        const errorImg = {
            uid: '-5',
            name: 'image.png',
            status: 'error' as UploadFileStatus,
        };

        const newList = newFileList[0];

        if (newList) {
            if (newList?.error?.status === 409) {
                setIsBigFile(true);
                setFileList([errorImg]);
            }

            if (newList.status === 'error') {
                setFileList([errorImg]);
            }
        }
    };

    console.log(userInfoData?.imgSrc);

    const uploadButton = googleAuth ? (
        <img src={userInfoData?.imgSrc} style={{ width: '100%' }} alt='googleImg' />
    ) : (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8, maxWidth: 72 }}>Загрузить фото профиля</div>
        </div>
    );

    const uploadButtonMobile = (
        <>
            <span className={styles.upload_text}>Загрузить фото профиля:</span>
            <Button
                className={styles.mobile__btn}
                icon={<UploadOutlined style={{ color: '#8c8c8c' }} />}
            >
                Загрузить
            </Button>
        </>
    );

    return (
        <React.Fragment>
            <Form.Item name='avatar'>
                {isMobile ? (
                    <Upload
                        action='https://marathon-api.clevertec.ru/upload-image'
                        headers={{ authorization: `Bearer ${token}` }}
                        listType='picture'
                        className={styles.mobile__upload}
                        fileList={fileList}
                        accept='image/*'
                        onPreview={handlePreview}
                        onChange={handleChange}
                        maxCount={1}
                        progress={{ strokeWidth: 4, showInfo: false, size: 'default' }}
                    >
                        {fileList.length >= 1 ? null : uploadButtonMobile}
                    </Upload>
                ) : (
                    <Upload
                        data-test-id='profile-avatar'
                        className={styles.avatar_uploader}
                        action='https://marathon-api.clevertec.ru/upload-image'
                        headers={{ authorization: `Bearer ${token}` }}
                        listType='picture-card'
                        fileList={fileList}
                        accept='image/*'
                        onPreview={handlePreview}
                        onChange={handleChange}
                        maxCount={1}
                        progress={{ strokeWidth: 4, showInfo: false, size: 'default' }}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                )}
            </Form.Item>
            <ModalBigFile isBigFile={isBigFile} setIsBigFile={setIsBigFile} />
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </React.Fragment>
    );
};
