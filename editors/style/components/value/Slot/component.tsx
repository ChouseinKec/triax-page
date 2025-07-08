import React, { useMemo } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import DimensionValue from '../dimension/component';
import FunctionValue from '../function/component';
import KeywordValue from '../keyword/component';
import NumberValue from '../number/component';
import LinkValue from '../link/component';
import ColorSelect from '@/components/select/color/component';
import Error from '../error/component';

// Types
import type { SlotProps } from './types';

// Utilities
import { getValueType } from '@/utilities/style/value';

/**
 * Slot Component
 * Renders the appropriate input component for a single value slot based on its type.
 * Handles function, keyword, dimension, number, integer, color, and link value types.
 *
 * @param props - SlotProps containing value, options, and onChange callback
 * @returns ReactElement - The rendered input for the slot
 */
const Slot: React.FC<SlotProps> = (props: SlotProps) => {
    const { value, options, onChange } = props;

    /**
     * Compute all unique types available in the options.
     */
    const allTypes = useMemo(() => {
        return new Set(options.flat().map(option => option.type))
    }, [options]
    );

    /**
     * Determine the default type to use when value is empty.
     * Priority: dimension > keyword > function > color > first available type.
     */
    const defaultType = useMemo(() => {
        if (allTypes.has('dimension')) return 'dimension';
        if (allTypes.has('keyword')) return 'keyword';
        if (allTypes.has('function')) return 'function';
        if (allTypes.has('color')) return 'color';
        return options[0]?.type;
    }, [allTypes, options]
    );

    /**
     * Determine the value type for this slot.
     * If value is empty, use the default type.
     */
    const valueType = value.length === 0 ? defaultType : getValueType(value);

    return useMemo(() => {
        switch (valueType) {
            case 'function':
                return (
                    <FunctionValue value={value} options={options} onChange={onChange} />
                );
            case 'keyword':
                return (
                    <KeywordValue value={value} options={options} onChange={onChange} />
                );
            case 'dimension':
                return (
                    <DimensionValue value={value} options={options} onChange={onChange} />
                );
            case 'integer':
                return (
                    <NumberValue value={value} options={options} onChange={onChange} isInteger={true} />
                );
            case 'number':
                return (
                    <NumberValue value={value} options={options} onChange={onChange} />
                );
            case 'color':
                return (
                    <ColorSelect value={value} onChange={onChange} />
                );
            case 'link':
                return (
                    <LinkValue value={value} onChange={onChange} />
                );
            default:
                return (
                    <Error message={`[Slot] Unknown value type: ${String(valueType)}`} />
                );
        }
    }, [valueType, value, onChange, options]);

};

export default Slot;
