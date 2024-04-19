import { Checkbox, Form, Input } from 'antd';
import { commonTrainingFlowSelector } from '@constants/selectors';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

import styles from './from-exercise-name.module.scss';

type Props = {
    name: number;
    itemsToRemove: { [key: number]: boolean };
    setItemsToRemove: (prev: { [key: number]: boolean }) => void;
    setTrainingName: (arg: string) => void;
};

export const FromExerciseName = ({
    name,
    itemsToRemove,
    setItemsToRemove,
    setTrainingName,
}: Props) => {
    const commonTrainingFlow = useAppSelector(commonTrainingFlowSelector);

    const setDeleteExercises = (e: CheckboxChangeEvent, index: number) => {
        const { checked } = e.target;

        setItemsToRemove((prev) => ({
            ...prev,
            [index]: checked,
        }));
    };

    return (
        <Form.Item name={[name, 'exercise']}>
            <Input
                data-test-id={`modal-drawer-right-input-exercise${name}`}
                placeholder='Упражнение'
                autoFocus={true}
                className={styles.exercises}
                onChange={(e) => setTrainingName(e.target.value)}
                addonAfter={
                    commonTrainingFlow ? (
                        <Checkbox
                            data-test-id={`modal-drawer-right-checkbox-exercise${name}`}
                            checked={itemsToRemove[name]}
                            name='checkbox'
                            onChange={(e) => setDeleteExercises(e, name)}
                        />
                    ) : null
                }
            />
        </Form.Item>
    );
};
