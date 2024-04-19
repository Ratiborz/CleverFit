import { CalendarTwoTone } from '@ant-design/icons';
import { trainingsDataSelector } from '@constants/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { DatePicker, Form } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import type { Moment } from 'moment';
import moment from 'moment';

import styles from './form-date-picker.module.scss';

type Props = {
    setDatePick: (arg: string | undefined) => void;
};

export const DatePickerTraining = ({ setDatePick }: Props) => {
    const trainingData = useAppSelector(trainingsDataSelector);

    const disabledPastDate = (value: Moment) => value.isSameOrBefore(moment(), 'day');

    const dateCellRender = (value: Moment) => {
        const date = value.format('YYYY-MM-DD');
        const day = value.format('DD');
        const dataTraining = trainingData.map((training) =>
            typeof training.date === 'string' ? training.date.slice(0, 10) : training.date,
        );

        const isTrainingDay = dataTraining.includes(date);

        return <div className={isTrainingDay ? styles.today__training : ''}>{day}</div>;
    };

    return (
        <Form.Item name='date'>
            <DatePicker
                data-test-id='modal-drawer-right-date-picker'
                className={styles.date_picker}
                dateRender={dateCellRender}
                disabledDate={(e) => disabledPastDate(e)}
                onChange={(e) => setDatePick(e?.format('DD.MM.YYYY'))}
                locale={locale}
                format='DD.MM.YYYY'
                suffixIcon={<CalendarTwoTone twoToneColor={['#00000040', '#00000040']} />}
                placeholder='Выбрать дату'
            />
        </Form.Item>
    );
};
