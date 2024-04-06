import React, { useEffect, useState } from 'react';
import { CalendarTwoTone, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingTariffNamesSelector, trainingsDataSelector } from '@constants/selectors';
import { periodValue } from '@constants/constants';
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import type { Moment } from 'moment';
import moment from 'moment';

import styles from './drawer-form-training.module.scss';

type Props = {
    setOpen: (arg: boolean) => void;
};

export const DrawerFormTraining = ({ setOpen }: Props) => {
    const [form] = Form.useForm();
    const [saveActive, setSaveActive] = useState(false);
    const trainingNames = useAppSelector(trainingTariffNamesSelector);
    const [period, setPeriod] = useState(false);
    const trainingData = useAppSelector(trainingsDataSelector);
    const [typeTraining, setTypeTraining] = useState('');
    const [datePick, setDatePick] = useState('');
    const [trainingName, setTrainingName] = useState('');

    const saveDataTraining = () => {
        console.log('');
    };

    useEffect(() => {
        const isDataComplete = !!typeTraining && !!datePick && !!trainingName;

        setSaveActive(isDataComplete);
    }, [typeTraining, datePick, trainingName, setSaveActive]);

    const setPeriodCheckbox = (e: CheckboxChangeEvent) => {
        const { checked } = e.target;

        setPeriod(checked);
    };

    const dateCellRender = (value: Moment) => {
        const date = value.format('YYYY-MM-DD');
        const day = value.format('DD');
        const dataTraining = trainingData.map((training) => training.date.slice(0, 10));

        const isTrainingDay = dataTraining.includes(date);

        return <div className={isTrainingDay ? styles.today__training : ''}>{day}</div>;
    };

    const disabledPastDate = (value: Moment) => value.isBefore(moment(), 'day');

    const onFinish = (values) => {
        console.log(values);
    };

    const initialFormValues = [
        {
            exercise: '',
            replays: null,
            weight: null,
            count: null,
            id: '',
        },
    ];

    return (
        <Form
            onFinish={onFinish}
            name='form'
            form={form}
            className={styles.form}
            initialValues={{ inputsBlock: initialFormValues }}
        >
            <Select
                placeholder='Выбор типа тренировки'
                className={styles.select}
                onChange={(e) => setTypeTraining(e)}
                options={trainingNames.map(({ name }) => ({
                    value: name,
                    label: name,
                }))}
            />
            <div className={styles.container__date}>
                <div className={styles.wrapper__date_picker}>
                    <DatePicker
                        className={styles.date_picker}
                        dateRender={dateCellRender}
                        disabledDate={(e) => disabledPastDate(e)}
                        onChange={(e) => setDatePick(e?.format('YYYY-MM-DD'))}
                        locale={locale}
                        format='DD.MM.YYYY'
                        suffixIcon={<CalendarTwoTone twoToneColor={['#00000040', '#00000040']} />}
                        placeholder='Выбрать дату'
                    />
                    <div>
                        <Checkbox
                            className={styles.checkbox__period}
                            onChange={(e) => setPeriodCheckbox(e)}
                        />
                        С периодичностью
                    </div>
                </div>
                {period && (
                    <Select
                        placeholder='Периодичность'
                        className={styles.select__period}
                        options={periodValue.map((name) => ({
                            value: name,
                            label: name,
                        }))}
                    />
                )}
            </div>
            <Form.List name='inputsBlock'>
                {(fields, { add }) => (
                    <React.Fragment>
                        {fields.map(({ name }) => (
                            <div key={name} className={styles.container}>
                                <Form.Item name={[name, 'exercise']}>
                                    <Input
                                        data-test-id={`modal-drawer-right-input-exercise${name}`}
                                        placeholder='Упражнение'
                                        autoFocus={true}
                                        className={styles.exercises}
                                        onChange={(e) => setTrainingName(e.target.value)}
                                    />
                                </Form.Item>
                                <div className={styles.descrip__text}>
                                    <div className={styles.repeat}>Подходы</div>
                                    <div className={styles.weight}>Вес, кг</div>
                                    <div className={styles.count}>Количество</div>
                                </div>
                                <div className={styles.inputs__wrapper}>
                                    <div className={styles.input__container}>
                                        <Form.Item name={[name, 'replays']}>
                                            <InputNumber
                                                data-test-id={`modal-drawer-right-input-approach${name}`}
                                                className={styles.repeat_input}
                                                placeholder='1'
                                                addonBefore='+'
                                                min={1}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={styles.wrapper__weight_count}>
                                        <div className={styles.input__container}>
                                            <Form.Item name={[name, 'weight']}>
                                                <InputNumber
                                                    data-test-id={`modal-drawer-right-input-weight${name}`}
                                                    className={styles.weight_input}
                                                    placeholder='0'
                                                    min={0}
                                                />
                                            </Form.Item>
                                        </div>
                                        <span className={styles.separator}>x</span>
                                        <div className={styles.input__container}>
                                            <Form.Item name={[name, 'count']}>
                                                <InputNumber
                                                    data-test-id={`modal-drawer-right-input-quantity${name}`}
                                                    className={styles.count_input}
                                                    placeholder='3'
                                                    min={1}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className={styles.wrapper__btns}>
                            <Button
                                type='link'
                                className={styles.addMore_btn}
                                onClick={() => add()}
                            >
                                <PlusOutlined style={{ marginRight: '8px' }} />
                                Добавить ещё упражнение
                            </Button>
                        </div>
                    </React.Fragment>
                )}
            </Form.List>

            <div>
                <Divider />
                <Button
                    className={styles.btn__pay}
                    disabled={!saveActive}
                    onClick={() => saveDataTraining()}
                    htmlType='submit'
                >
                    Сохранить
                </Button>
            </div>

            <div className={styles.wrapper__position_btn}>
                <Button
                    type='text'
                    onClick={() => setOpen(false)}
                    className={styles.close__icon}
                    data-test-id='modal-drawer-right-button-close'
                >
                    <CloseOutlined />
                </Button>
            </div>
        </Form>
    );
};
