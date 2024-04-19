import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import styles from './form-checkbox-period.module.scss';

type Props = {
    period: boolean;
    setPeriod: (arg: boolean) => void;
};

export const CheckboxPeriod = ({ period, setPeriod }: Props) => {
    const setPeriodCheckbox = (e: CheckboxChangeEvent) => {
        const { checked } = e.target;

        setPeriod(checked);
    };

    return (
        <div>
            <Checkbox
                data-test-id='modal-drawer-right-checkbox-period'
                className={styles.checkbox__period}
                onChange={(e) => setPeriodCheckbox(e)}
                checked={period}
            />
            С периодичностью
        </div>
    );
};
