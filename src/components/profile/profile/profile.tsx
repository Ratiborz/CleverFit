import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { emailRegex } from '@constants/constants';
import { Button, DatePicker, Form, Input, message, Typography, Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';

import styles from './profile.module.scss';

export const Profile = () => {
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(true);
    const [isInvalidConfirm, setIsInvalidConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8, maxWidth: 90 }}>Загрузить фото профиля</div>
        </div>
    );

    return (
        <div className={styles.container__profile}>
            <h2 className={styles.title__personal_info}>Личная информация</h2>
            <div className={styles.container__personal_info}>
                <Upload
                    name='avatar'
                    listType='picture-card'
                    className={styles.avatar_uploader}
                    showUploadList={false}
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? (
                        <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
                    ) : (
                        uploadButton
                    )}
                </Upload>
                <Form
                    name='personal-data'
                    className={styles.form__personal_data}
                    scrollToFirstError={true}
                >
                    <Form.Item name='name'>
                        <Input placeholder='Имя' className={styles.input_name} />
                    </Form.Item>
                    <Form.Item name='second-name'>
                        <Input placeholder='Фамилия' className={styles.input_second_name} />
                    </Form.Item>
                    <Form.Item name='birthday'>
                        <DatePicker className={styles.date_picker} placeholder='Дата рождения' />
                    </Form.Item>
                </Form>
            </div>
            <h2 className={styles.title__private_data}>Приватность и авторизация</h2>
            <Form name='private-data' className={styles.form__private_data}>
                <React.Fragment>
                    <div className={styles.email_placeholder}>
                        <span className={styles.placeholder}>e-mail:</span>
                        <Form.Item
                            key='email'
                            className={styles.email_item}
                            hasFeedback={true}
                            name='email'
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (emailRegex.test(value)) {
                                            setIsInvalidEmail(true);

                                            return Promise.resolve();
                                        }
                                        setIsInvalidEmail(false);

                                        return Promise.reject();
                                    },
                                }),
                                {
                                    type: 'email',
                                    message: '',
                                },
                                {
                                    required: true,
                                    message: '',
                                },
                            ]}
                        >
                            <Input
                                className={styles.email_input}
                                data-test-id='registration-email'
                            />
                        </Form.Item>
                    </div>

                    <Form.Item className={styles.password_item}>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            name='password'
                            hasFeedback={true}
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (
                                            value?.length >= 8 &&
                                            /[A-Z]/.test(value) &&
                                            /\d/.test(value)
                                        ) {
                                            setIsInvalidPassword(true);

                                            return Promise.resolve();
                                        }
                                        setIsInvalidPassword(false);

                                        return Promise.reject();
                                    },
                                }),

                                {
                                    required: true,
                                    message: '',
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder='Пароль'
                                className={styles.password_input}
                            />
                        </Form.Item>
                        <Typography
                            className={styles.password_requirements}
                            style={{ color: isInvalidPassword ? '#8C8C8C' : 'red' }}
                        >
                            Пароль не менее 8 символов, с заглавной буквой и цифрой
                        </Typography>
                    </Form.Item>

                    <Form.Item
                        className={styles.confirm_item}
                        name='confirm'
                        dependencies={['password']}
                        hasFeedback={true}
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        setIsInvalidConfirm(true);

                                        return Promise.resolve();
                                    }
                                    setIsInvalidConfirm(false);

                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            className={styles.confirm_input}
                        />
                    </Form.Item>
                </React.Fragment>
                <Button className={styles.save__btn} type='primary' htmlType='submit'>
                    Сохранить изменения
                </Button>
            </Form>
        </div>
    );
};
