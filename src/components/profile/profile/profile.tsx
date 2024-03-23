import React, { useState } from 'react';
import { CalendarTwoTone } from '@ant-design/icons';
import { emailRegex } from '@constants/constants';
import { Button, DatePicker, Form, Input, Typography } from 'antd';

import { UploadImage } from '../upload/upload-image';

import styles from './profile.module.scss';

export const Profile = () => {
    const [form] = Form.useForm();
    const [isInvalidPassword, setIsInvalidPassword] = useState(true);
    const [validEmail, setValidEmail] = useState(false);
    const [activeSaveBtn, setActiveSaveBtn] = useState(false);

    const onChangeEmail = () => {
        setValidEmail(true);
    };

    const onChangeFields = () => {
        const nameValue = form.getFieldValue('name');
        const secondNameValue = form.getFieldValue('second-name');
        const birthdayValue = form.getFieldValue('birthday');

        if (nameValue || secondNameValue || birthdayValue) {
            setActiveSaveBtn(true);
        } else {
            setActiveSaveBtn(false);
        }
    };

    const onFinish = (value) => {
        console.log(value);
    };

    return (
        <div className={styles.container__profile}>
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

                        <Form.Item name='second-name'>
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
                                onChange={() => onChangeEmail()}
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
                    disabled={activeSaveBtn ? false : true}
                >
                    Сохранить изменения
                </Button>
            </Form>
        </div>
    );
};
