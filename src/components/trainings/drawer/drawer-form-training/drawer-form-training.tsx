import React, { useEffect, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { getCurrentColor } from '@components/choose-color-badge/choose-color-badge';
import {
    commonTrainingFlowSelector,
    dataForInputsSelector,
    editFlowTrainingSelector,
    userDataForDrawerSelector,
} from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useCreateInviteMutation } from '@redux/api-rtk/invite-requests';
import {
    useEditTrainingDrawerMutation,
    useSaveTrainingMutation,
} from '@redux/api-rtk/training-requests';
import { actions } from '@redux/reducers/common-modal.slice';
import { actions as actionsTraining } from '@redux/reducers/training.slice';
import { getConvertStringFromNumb, getNumberFromPeriod } from '@utils/utils';
import { Badge, Button, Divider, Form, Image, InputNumber } from 'antd';
import moment from 'moment';

import { FinishValues } from '../../../../types/trainings-types';

import { CheckboxPeriod } from './form-inputs/form-checkbox-period/form-checkbox-period';
import { DatePickerTraining } from './form-inputs/form-date-picker/form-date-picker';
import { FromExerciseName } from './form-inputs/form-exercise-name/from-exercise-name';
import { FormNameTraining } from './form-inputs/form-name-training/form-name-training';
import { SelectPeriod } from './form-inputs/form-select-period/form-select-period';

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
    const editFlow = useAppSelector(editFlowTrainingSelector);
    const [period, setPeriod] = useState(false);
    const [typeTraining, setTypeTraining] = useState('');
    const [datePick, setDatePick] = useState<string | undefined>();
    const [trainingName, setTrainingName] = useState('');
    const [saveTraining, { isSuccess, isError, error }] = useSaveTrainingMutation();
    const [editTrainingDrawer, { isSuccess: successEdit, isError: errorEdit }] =
        useEditTrainingDrawerMutation();
    const commonTrainingFlow = useAppSelector(commonTrainingFlowSelector);
    const [itemsToRemove, setItemsToRemove] = useState<{ [key: number]: boolean }>({});
    const [buttonDelete, setButtonDelete] = useState(false);
    const userDataForDrawer = useAppSelector(userDataForDrawerSelector);
    const [createInvite] = useCreateInviteMutation();

    const deleteExercise = (remove: (index: number | number[]) => void) => {
        const checkboxKeys = Object.keys(itemsToRemove).map((key) => Number(key));
        const checkboxTrueList = checkboxKeys.filter((key) => itemsToRemove[key] === true);

        setItemsToRemove((prev) => {
            const newItems = { ...prev };

            checkboxTrueList.forEach((key) => {
                delete newItems[key];
            });

            return newItems;
        });
        remove(checkboxTrueList);
        setItemsToRemove([]);
    };

    useEffect(() => {
        const hasCheckedItem = !Object.values(itemsToRemove).some((el) => el === true);

        setButtonDelete(hasCheckedItem);
    }, [itemsToRemove]);

    console.log(error);

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
        }
    }, [dispatch, setOpen, setShowSuccessAlert, isError, errorEdit, successEdit, isSuccess]);

    useEffect(() => {
        let isDataComplete = !!typeTraining && !!datePick && !!trainingName;

        if (commonTrainingFlow) {
            isDataComplete = !!datePick && !!trainingName;
        }

        setSaveActive(isDataComplete);
    }, [typeTraining, datePick, trainingName, commonTrainingFlow]);

    useEffect(() => {
        if (dataForInputs.length > 0) {
            const periodBoolean = typeof dataForInputs[0].period === 'number';

            setTypeTraining(dataForInputs[0].name);
            setDatePick(dataForInputs[0].date);
            setTrainingName(dataForInputs[0].exercisesName);
            setPeriod(periodBoolean);
        }
    }, [setSaveActive, dataForInputs]);

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
            ...(values.period && {
                parameters: {
                    period: getNumberFromPeriod(values.period) as number,
                },
            }),
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
        } else if (commonTrainingFlow) {
            createInvite({ to: userDataForDrawer?.id, trainingId: 0 });
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
                  replays: training.replays || 0,
                  weight: training.weight || 1,
                  count: training.count || 0,
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
                {!commonTrainingFlow && (
                    <FormNameTraining
                        nameTraining={initialFormValues[0].nameTraining}
                        setTypeTraining={setTypeTraining}
                    />
                )}
                {commonTrainingFlow && (
                    <div className={styles.user_info}>
                        <div className={styles.user__image_name}>
                            <Image
                                src={
                                    userDataForDrawer?.imgSrc
                                        ? userDataForDrawer.imgSrc
                                        : '/Avatar-mock.svg'
                                }
                                alt='avatar'
                                preview={false}
                                className={styles.avatar}
                            />
                            <p>
                                {userDataForDrawer?.name && userDataForDrawer?.name.split(' ')[0]}{' '}
                                <br />
                                {userDataForDrawer?.name &&
                                    userDataForDrawer?.name.split(' ').slice(1).join(' ')}
                            </p>
                        </div>
                        <div className={styles.user__type_name_training}>
                            <Badge
                                color={getCurrentColor(
                                    userDataForDrawer?.trainingType
                                        ? userDataForDrawer?.trainingType
                                        : '',
                                )}
                                style={{ marginRight: '8px' }}
                            />
                            <span className={styles.type_training}>
                                {userDataForDrawer?.trainingType}
                            </span>
                        </div>
                    </div>
                )}
                <div className={styles.container__date}>
                    <div className={styles.wrapper__date_picker}>
                        <DatePickerTraining setDatePick={setDatePick} />
                        <CheckboxPeriod period={period} setPeriod={setPeriod} />
                    </div>
                    {period && <SelectPeriod InPeriod={initialFormValues[0].period} />}
                </div>
                <Form.List name='inputsBlock'>
                    {(fields, { add, remove }) => (
                        <React.Fragment>
                            {fields.map(({ name }) => (
                                <div key={name} className={styles.container}>
                                    <FromExerciseName
                                        name={name}
                                        itemsToRemove={itemsToRemove}
                                        setItemsToRemove={setItemsToRemove}
                                        setTrainingName={setTrainingName}
                                    />

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
                                    {commonTrainingFlow
                                        ? 'Добавить ещё'
                                        : 'Добавить ещё упражнение'}
                                </Button>
                                {commonTrainingFlow && (
                                    <Button
                                        type='link'
                                        className={styles.delete_btn}
                                        disabled={buttonDelete}
                                        onClick={() => deleteExercise(remove)}
                                    >
                                        <MinusOutlined
                                            style={{ marginRight: '8px', marginTop: '2px' }}
                                        />
                                        Удалить
                                    </Button>
                                )}
                            </div>
                        </React.Fragment>
                    )}
                </Form.List>
            </div>

            <div className={styles.wrapper__submit_btn}>
                <Divider className={styles.divider__submit} />
                <Button className={styles.btn__pay} disabled={!saveActive} htmlType='submit'>
                    {commonTrainingFlow ? 'Отправить приглашение' : 'Сохранить'}
                </Button>
            </div>
        </Form>
    );
};
