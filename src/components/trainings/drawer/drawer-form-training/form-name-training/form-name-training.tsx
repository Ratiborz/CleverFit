import { trainingTariffNamesSelector } from '@constants/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Form, Select } from 'antd';

import styles from './form-name-training.module.scss';

type Props = {
    nameTraining: string | null;
    setTypeTraining: (arg: string) => void;
};

export const FormNameTraining = ({ nameTraining, setTypeTraining }: Props) => {
    const trainingNames = useAppSelector(trainingTariffNamesSelector);

    return (
        <Form.Item name='name_training' initialValue={nameTraining}>
            <Select
                placeholder='Выбор типа тренировки'
                data-test-id='modal-create-exercise-select'
                className={styles.select}
                onChange={(e) => setTypeTraining(e)}
                options={trainingNames.map(({ name }) => ({
                    value: name,
                    label: name,
                }))}
            />
        </Form.Item>
    );
};
