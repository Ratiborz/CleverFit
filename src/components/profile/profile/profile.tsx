import React, { useEffect, useState } from 'react';
import { CalendarTwoTone } from '@ant-design/icons';
import { emailRegex } from '@constants/constants';
import { useEditUserInfoMutation } from '@redux/api-rtk/profile-request';
import { Alert, Button, DatePicker, Form, Input, Typography } from 'antd';

import { FieldValues } from '../../../types/profile-types';
import { ModalErrorSave } from '../modal-error/modal-error';
import { UploadImage } from '../upload/upload-image';

import styles from './profile.module.scss';

export const Profile = () => {
    const [form] = Form.useForm();
    const [isInvalidPassword, setIsInvalidPassword] = useState(true);
    const [validEmail, setValidEmail] = useState(false);
    const [activeSaveBtn, setActiveSaveBtn] = useState(false);
    const [openModalError, setOpenModalError] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const [editUserInfo, { isError, isSuccess, data }] = useEditUserInfoMutation();

    console.log(data);

    useEffect(() => {
        if (isSuccess) setShowSuccessAlert(true);
        if (isError) setOpenModalError(true);
    }, [isError, isSuccess]);

    const onChangeFields = () => {
        const avatarValue = form.getFieldValue('avatar');
        const nameValue = form.getFieldValue('name');
        const secondNameValue = form.getFieldValue('second-name');
        const birthdayValue = form.getFieldValue('birthday');
        const emailValue = form.getFieldValue('email');
        const passwordValue = form.getFieldValue('password');
        const confirmPassValue = form.getFieldValue('confirm');

        if (emailValue) setValidEmail(true);

        if (!emailValue || !passwordValue || !confirmPassValue) setValidEmail(false);

        if (
            avatarValue ||
            nameValue ||
            secondNameValue ||
            birthdayValue ||
            emailValue ||
            passwordValue ||
            confirmPassValue
        ) {
            setActiveSaveBtn(true);
        } else {
            setActiveSaveBtn(false);
        }
    };

    const onFinish = (value: FieldValues) => {
        console.log(value);
        const userInfo = {
            email: value?.email,
            password: value?.password,
            firstName: value?.name,
            lastName: value?.secondName,
            birthday: value?.birthday?.toISOString(),
            imgSrc: value?.avatar?.file?.thumbUrl,
            readyForJointTraining: false,
            sendNotification: false,
        };

        editUserInfo(userInfo);
    };

    return (
        <div className={styles.container__profile}>
            <ModalErrorSave openModalError={openModalError} setOpenModalError={setOpenModalError} />

            <Form
                name='private-data'
                form={form}
                className={styles.form__private_data}
                scrollToFirstError={true}
                onFinish={onFinish}
            >
                <h2 className={styles.title__personal_info}>Личная информация</h2>
                <div className={styles.container__personal_info}>
                    <div>
                        <UploadImage />
                    </div>
                    <div className={styles.group__personal_info}>
                        <Form.Item name='name'>
                            <Input
                                placeholder='Имя'
                                className={styles.input_name}
                                onChange={() => onChangeFields()}
                            />
                        </Form.Item>

                        <Form.Item name='secondName'>
                            <Input
                                placeholder='Фамилия'
                                className={styles.input_second_name}
                                onChange={() => onChangeFields()}
                            />
                        </Form.Item>

                        <Form.Item name='birthday'>
                            <DatePicker
                                className={styles.date_picker}
                                format='DD.MM.YYYY'
                                onChange={() => onChangeFields()}
                                suffixIcon={
                                    <CalendarTwoTone twoToneColor={['#00000040', '#00000040']} />
                                }
                                placeholder='Дата рождения'
                            />
                        </Form.Item>
                    </div>
                </div>
                <h2 className={styles.title__private_data}>Приватность и авторизация</h2>

                <React.Fragment>
                    <div className={styles.email_placeholder}>
                        <span className={styles.placeholder}>e-mail:</span>
                        <Form.Item
                            name='email'
                            className={styles.email_item}
                            hasFeedback={true}
                            rules={[
                                () =>
                                    validEmail
                                        ? {
                                              validator(_, value) {
                                                  if (emailRegex.test(value)) {
                                                      return Promise.resolve();
                                                  }

                                                  return Promise.reject();
                                              },
                                          }
                                        : {},
                            ]}
                        >
                            <Input
                                className={styles.email_input}
                                onChange={() => onChangeFields()}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item className={styles.password_item}>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            name='password'
                            hasFeedback={true}
                            rules={[
                                () =>
                                    validEmail
                                        ? {
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
                                          }
                                        : {},
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
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                            validEmail
                                ? {
                                      required: true,
                                      message: '',
                                  }
                                : {},
                        ]}
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            className={styles.confirm_input}
                        />
                    </Form.Item>
                </React.Fragment>
                <Button
                    className={styles.save__btn}
                    type='primary'
                    htmlType='submit'
                    disabled={!activeSaveBtn}
                >
                    Сохранить изменения
                </Button>
            </Form>
            {showSuccessAlert ? (
                <Alert
                    message='Данные профиля успешно обновлены'
                    type='success'
                    className={styles.alert__success}
                    showIcon={true}
                    closable={true}
                    onClose={() => setShowSuccessAlert(false)}
                />
            ) : (
                ''
            )}
        </div>
    );
};
