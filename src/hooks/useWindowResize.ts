import { useState, useEffect } from 'react';

function getWindowResize() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

export default function useWindowResize() {
    const [windowResizes, setWindowResizes] = useState(getWindowResize());

    useEffect(() => {
        function handleResize() {
            setWindowResizes(getWindowResize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowResizes;
}
