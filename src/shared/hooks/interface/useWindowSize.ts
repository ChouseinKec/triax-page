import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const [size, setSize] = useState({ width: 0, height: 0 }); // Safe default

    useEffect(() => {
        const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        handleResize(); // Set initial size on client
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
};

export default useWindowSize;