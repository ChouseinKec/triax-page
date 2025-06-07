// editors/style/components/value/Error.tsx
import React from 'react';

/**
 * Renders an error message in red.
 */
export interface ErrorProps {
    message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return <p style={{ color: 'red' }}>{message}</p>;
};

export default Error;
