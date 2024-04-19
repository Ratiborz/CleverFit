import { periodValue } from '@constants/constants';
import { Form, Select } from 'antd';

import styles from './form-select-period.module.scss';

type Props = {
    InPeriod: string | 0 | null | undefined;
};

export const SelectPeriod = ({ InPeriod }: Props) => (
    <Form.Item name='period' initialValue={InPeriod}>
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
);
