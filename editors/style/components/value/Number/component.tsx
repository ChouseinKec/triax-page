import React from 'react';

// Types
import { NumberValueProps } from './types';

const NumberValue: React.FC<NumberValueProps> = ({ value, onChange }) => {
    return <input type="number" value={value} onChange={(e) => onChange?.(e.target.value)} />;
};

export default NumberValue;
