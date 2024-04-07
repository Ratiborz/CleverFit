import React, { useEffect, useState } from 'react';
import { CalendarTwoTone, PlusOutlined } from '@ant-design/icons';
import { ModalSaveError } from '@components/result/common-modal-result/modal-save-error/modal-save-error';
import { periodValue } from '@constants/constants';
import { trainingsDataSelector,trainingTariffNamesSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useSaveTrainingMutation } from '@redux/api-rtk/training-requests';
import { actions } from '@redux/reducers/common-modal.slice';
import { getNumberFromPeriod } from '@utils/utils';
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import type { Moment } from 'moment';
import moment from 'moment';

import { FinishValues } from '../../../../types/trainings-types';

import styles from './drawer-form-training.module.scss';

import 'moment/locale/ru';

type Props = {
    setOpen: (arg: boolean) => void;
    setShowSuccessAlert: (arg: boolean) => void;
};

export const DrawerFormTraining = ({ setOpen, setShowSuccessAlert }: Props) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [saveActive, setSaveActive] = useState(false);
    const trainingNames = useAppSelector(trainingTariffNamesSelector);
    const [period, setPeriod] = useState(false);
    const trainingData = useAppSelector(trainingsDataSelector);
    const [typeTraining, setTypeTraining] = useState('');
    const [datePick, setDatePick] = useState<string | undefined>();
    const [trainingName, setTrainingName] = useState('');
    const [saveTraining, { isSuccess, isError }] = useSaveTrainingMutation();

    useEffect(() => {
        if (isError) {
            dispatch(actions.setModalError(true));
            setOpen(false);
        }
        if (isSuccess) {
            setShowSuccessAlert(true);
            setOpen(false);
        }
    }, [dispatch, setOpen, setShowSuccessAlert, isError, isSuccess]);

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

    const onFinish = (values: FinishValues) => {
        const training = {
            name: values.type_training,
            date: values.date.toISOString(),
            isImplementation: false,
            parametrs: {
                period: values.period && getNumberFromPeriod(values.period),
            },
            exercises: values.inputsBlock.map((input) => ({
                name: input.exercise,
                replays: input.replays,
                weight: input.weight,
                approaches: input.count,
                id: input.id,
            })),
        };

        saveTraining(training);
        console.log(training);
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
        <React.Fragment>
            <ModalSaveError />
            <Form
                onFinish={onFinish}
                name='form'
                form={form}
                className={styles.form}
                initialValues={{ inputsBlock: initialFormValues }}
            >
                <div>
                    <Form.Item name='type_training'>
                        <Select
                            placeholder='Выбор типа тренировки'
                            className={styles.select}
                            onChange={(e) => setTypeTraining(e)}
                            options={trainingNames.map(({ name }) => ({
                                value: name,
                                label: name,
                            }))}
                        />
                    </Form.Item>
                    <div className={styles.container__date}>
                        <div className={styles.wrapper__date_picker}>
                            <Form.Item name='date'>
                                <DatePicker
                                    className={styles.date_picker}
                                    dateRender={dateCellRender}
                                    disabledDate={(e) => disabledPastDate(e)}
                                    onChange={(e) => setDatePick(e?.format('YYYY-MM-DD'))}
                                    locale={locale}
                                    format='DD.MM.YYYY'
                                    suffixIcon={
                                        <CalendarTwoTone
                                            twoToneColor={['#00000040', '#00000040']}
                                        />
                                    }
                                    placeholder='Выбрать дату'
                                />
                            </Form.Item>
                            <div>
                                <Checkbox
                                    className={styles.checkbox__period}
                                    onChange={(e) => setPeriodCheckbox(e)}
                                />
                                С периодичностью
                            </div>
                        </div>
                        {period && (
                            <Form.Item name='period'>
                                <Select
                                    placeholder='Периодичность'
                                    className={styles.select__period}
                                    options={periodValue.map((name) => ({
                                        value: name,
                                        label: name,
                                    }))}
                                />
                            </Form.Item>
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
                </div>

                <div className={styles.wrapper__submit_btn}>
                    <Divider className={styles.divider__submit} />
                    <Button className={styles.btn__pay} disabled={!saveActive} htmlType='submit'>
                        Сохранить
                    </Button>
                </div>
            </Form>
        </React.Fragment>
    );
};
