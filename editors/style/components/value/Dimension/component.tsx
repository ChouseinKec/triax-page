import React from 'react';
import { OptionData } from '@/types/option';

/**
 * Renders an input for dimension values (e.g., <length>, <percentage>).
 */
export interface DimensionValueProps {
    options: OptionData[];
    value: string;
    onChange: (value: string) => void;
}

const DimensionValue: React.FC<DimensionValueProps> = ({ value, onChange }) => {
    return (
        <input type='number' value={value} onChange={e => onChange(e.target.value)} />
    );
};

export default DimensionValue;
