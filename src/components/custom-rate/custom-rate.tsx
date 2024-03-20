import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Rate } from 'antd';

import { Feedback } from '../../types/value-request';

import styles from './custom-rate.module.scss';

type Props = {
    isPage: boolean;
    data?: Feedback;
    handleChange?: (value: number) => void;
};

export const CustomRate = ({ data, isPage, handleChange }: Props) => {
    const currentStar = (index: number | undefined, value: number | undefined) =>
        value! >= index! + 1 ? (
            <StarFilled style={{ color: '#FAAD14' }} />
        ) : (
            <StarOutlined style={{ color: '#FAAD14' }} />
        );

    return (
        <Rate
            disabled={isPage}
            onChange={handleChange}
            defaultValue={data?.rating}
            className={isPage ? styles.comment_rate : styles.modal__rating}
            character={({ index, value }) => currentStar(index, value)}
        />
    );
};
