import Lottie from 'lottie-react';
import animationData from './loader.json';
import s from './loader.module.scss';

export const Loader = () => {
    return (
        <div className={s.backdrop}>
            <div className={s.loader}>
                <Lottie animationData={animationData} loop={true} data-test-id='loader' />
            </div>
        </div>
    );
};
