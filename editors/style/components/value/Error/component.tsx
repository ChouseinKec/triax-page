import React, { useRef, useState } from 'react';

// Types
import type { ErrorProps } from './types';

// Styles
import CSS from './styles.module.css';

// Component
import FloatReveal from '@/components/reveal/float/component';

const Error: React.FC<ErrorProps> = ({ message }) => {
    const targetRef = useRef(null);

    return (
        <>
            <button className={CSS.Error} ref={targetRef}>Error</button>
            <FloatReveal targetRef={targetRef}>
                <p className={CSS.ErrorMessage}>{message}</p>
            </FloatReveal>
        </>
    );
};

export default Error;
