import React, { useEffect, useState } from 'react';
import { CalendarTwoTone, PlusOutlined } from '@ant-design/icons';
import { periodValue } from '@constants/constants';
import {
    dataForInputsSelector,
    editFlowTrainingSelector,
    trainingsDataSelector,
    trainingTariffNamesSelector,
} from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    useEditTrainingDrawerMutation,
    useSaveTrainingMutation,
} from '@redux/api-rtk/training-requests';
import { actions } from '@redux/reducers/common-modal.slice';
import { actions as actionsTraining } from '@redux/reducers/training.slice';
import { getConvertStringFromNumb, getNumberFromPeriod } from '@utils/utils';
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
    const editFlow = useAppSelector(editFlowTrainingSelector);
    const [period, setPeriod] = useState(false);
    const trainingData = useAppSelector(trainingsDataSelector);
    const [typeTraining, setTypeTraining] = useState('');
    const [datePick, setDatePick] = useState<string | undefined>();
    const [trainingName, setTrainingName] = useState('');
    const [saveTraining, { isSuccess, isError }] = useSaveTrainingMutation();
    const [editTrainingDrawer, { isSuccess: successEdit, isError: errorEdit }] =
        useEditTrainingDrawerMutation();

    const dataForInputs = useAppSelector(dataForInputsSelector);

    useEffect(() => {
        if (isError || errorEdit) {
            setOpen(false);
            dispatch(actions.setModalError(true));
            dispatch(actionsTraining.setDataForInputs([]));
            dispatch(actionsTraining.setEditFlowTraining(false));
        }
        if (isSuccess || successEdit) {
            setShowSuccessAlert(true);
            setOpen(false);
            // dispatch(actionsTraining.setDataForInputs([]));
        }
    }, [dispatch, setOpen, setShowSuccessAlert, isError, errorEdit, successEdit, isSuccess]);

    useEffect(() => {
        const isDataComplete = !!typeTraining && !!datePick && !!trainingName;

        setSaveActive(isDataComplete);
    }, [typeTraining, datePick, trainingName]);

    useEffect(() => {
        if (dataForInputs.length > 0) {
            const periodBoolean = typeof dataForInputs[0].period === 'number';

            console.log(periodBoolean);

            setTypeTraining(dataForInputs[0].name);
            setDatePick(dataForInputs[0].date);
            setTrainingName(dataForInputs[0].exercisesName);
            setPeriod(periodBoolean);
        }
    }, [setSaveActive, dataForInputs]);

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

    const disabledPastDate = (value: Moment) => value.isSameOrBefore(moment(), 'day');

    const onFinish = (values: FinishValues) => {
        const today = moment().format('DD.MM.YYYY');

        const isDateBeforeOrEqualToday = moment(values.date, 'DD.MM.YYYY').isSameOrBefore(
            moment(today, 'DD.MM.YYYY'),
            'day',
        );

        const training = {
            name: values.name_training,
            date: values.date.toISOString(),
            isImplementation: isDateBeforeOrEqualToday,
            parameters: {
                period: values.period ? (getNumberFromPeriod(values.period) as number) : 0,
            },
            exercises: values.inputsBlock.map((input) => ({
                name: input.exercise,
                replays: input.replays,
                weight: input.weight,
                approaches: input.count,
                id: input.id,
                isImplementation: isDateBeforeOrEqualToday,
            })),
        };

        console.log(training);

        if (editFlow) {
            editTrainingDrawer({ id: dataForInputs[0].id, training });
        } else {
            saveTraining(training);
        }
    };

    const initialFormValues =
        dataForInputs.length > 0
            ? dataForInputs.map((training) => ({
                  key: training.name,
                  nameTraining: training.name,
                  exercise: training.exercisesName,
                  replays: training.replays,
                  weight: training.weight,
                  count: training.count,
                  id: training.id,
                  period: training.period && getConvertStringFromNumb(training.period),
                  date: training.date,
              }))
            : [
                  {
                      nameTraining: null,
                      exercise: '',
                      replays: null,
                      weight: null,
                      count: null,
                      id: '',
                      period: null,
                      date: null,
                  },
              ];

    return (
        <Form
            onFinish={onFinish}
            name='form'
            form={form}
            className={styles.form}
            initialValues={{
                inputsBlock: initialFormValues,
                date: initialFormValues[0].date && moment(initialFormValues[0].date, 'DD.MM.YYYY'),
            }}
        >
            <div>
                <Form.Item name='name_training' initialValue={initialFormValues[0].nameTraining}>
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
                                data-test-id='modal-drawer-right-date-picker'
                                className={styles.date_picker}
                                dateRender={dateCellRender}
                                disabledDate={(e) => disabledPastDate(e)}
                                onChange={(e) => setDatePick(e?.format('DD.MM.YYYY'))}
                                locale={locale}
                                format='DD.MM.YYYY'
                                suffixIcon={
                                    <CalendarTwoTone twoToneColor={['#00000040', '#00000040']} />
                                }
                                placeholder='Выбрать дату'
                            />
                        </Form.Item>
                        <div>
                            <Checkbox
                                data-test-id='modal-drawer-right-checkbox-period'
                                className={styles.checkbox__period}
                                onChange={(e) => setPeriodCheckbox(e)}
                                checked={period}
                            />
                            С периодичностью
                        </div>
                    </div>
                    {period && (
                        <Form.Item name='period' initialValue={initialFormValues[0].period}>
                            <Select
                                data-test-id='modal-drawer-right-select-period'
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
    );
};
