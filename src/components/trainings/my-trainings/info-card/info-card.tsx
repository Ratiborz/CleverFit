import { dataForInputsSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import useWindowResize from '@hooks/use-window-resize';
import { actions } from '@redux/reducers/training.slice';
import { Button, Divider } from 'antd';
import classNames from 'classnames';

import { ArrowBack } from '../../../../assets/arrow-back/arrow-back';

import styles from './info-card.module.scss';

type Props = {
    setOpen: (arg: boolean) => void;
    color: string;
    setInfoCard: ({ date, name }: { date: string; name: string }) => void;
};

export const InfoCard = ({ setOpen, color, setInfoCard }: Props) => {
    const dispatch = useAppDispatch();
    const dataForInputs = useAppSelector(dataForInputsSelector);
    const { width } = useWindowResize();
    const isMobile = width <= 360;

    const closeCard = () => {
        setInfoCard({ date: '', name: '' });
        dispatch(actions.setDataForInputs([]));
        dispatch(actions.setEditFlowTraining(false));
    };

    return (
        <div
            data-test-id='modal-create-exercise'
            className={classNames(
                styles.wrapper__add_exercises,
                isMobile ? styles.new_position : styles.default_position,
            )}
        >
            <div className={styles.container}>
                <div className={styles.header}>
                    <Button
                        style={{ height: 16 }}
                        className={styles.button__back}
                        data-test-id='modal-exercise-training-button-close'
                        onClick={() => closeCard()}
                    >
                        <ArrowBack />
                    </Button>
                    {dataForInputs[0].name && dataForInputs[0].name}
                </div>
                <Divider className={styles.divider_top} style={{ borderColor: `${color}` }} />
            </div>

            <div className={styles.container__exercises}>
                {dataForInputs.map((item) => (
                    <div key={item.exercisesName} className={styles.exercise}>
                        <p>{item.exercisesName}</p>
                    </div>
                ))}
            </div>

            <div className={styles.buttons}>
                <Divider className={styles.divider_bottom} />
                <Button className={styles.addExecsise_btn} onClick={() => setOpen(true)}>
                    Добавить упражнения
                </Button>
            </div>
        </div>
    );
};
