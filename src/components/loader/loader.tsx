import Lottie from 'lottie-react';

import animationData from './loader.json';

import styles from './loader.module.scss';

export const Loader = () => (
        <div className={styles.backdrop}>
            <div className={styles.loader}>
                <Lottie animationData={animationData} loop={true} data-test-id='loader' />
            </div>
        </div>
    );

export default Loader;
