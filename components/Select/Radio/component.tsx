import React, { memo, ReactElement, useRef, useEffect, useState } from 'react';

// Styles
import CSS from './styles.module.css';

// Components
import Options from '@/components/select/options/component';
import DropdownSelect from '@/components/select/dropdown/component';

// Types
import { RadioSelectProps } from '@/components/select/radio/types';


/**
 * RadioSelect Component
 * 
 * A reusable radio select component that allows users to select a single option from a list.
 * It uses the `Options` component to render the available options and triggers an `onChange` callback when a selection is made.
 * 
 * @param {RadioSelectProps} props - The component props.
 * @param {string} props.value - The currently selected value.
 * @param {Array<{ name: string, value: string }>} props.options - The list of options to display in the radio select.
 * @param {(value: string) => void} props.onChange - Callback function triggered when an option is selected.
 * @returns {ReactElement} - The rendered radio select component.
 */
const RadioSelect: React.FC<RadioSelectProps> = (props: RadioSelectProps): ReactElement => {
    const {
        value,
        options,
        onChange,
        maxOptions = 20
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const [dynamicMaxOptions, setDynamicMaxOptions] = useState<number>(maxOptions);
    const optionsLength = options.length;


    // ResizeObserver to watch parent container width and adjust options
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver((entries) => {

            // Get current container and option measurements
            const radioSelectWidth = container.clientWidth;
            // Find the first child whose className contains '_Option'
            const firstOption = Array.from(container.children).find(
                (child) => (child as HTMLElement).className.includes('_Option')
            ) as HTMLElement;
            if (!firstOption) return;


            // Calculate option dimensions
            const singleOptionWidth = firstOption.clientWidth;
            const allOptionsWidth = singleOptionWidth * optionsLength;
            const totalGapWidth = Math.abs(radioSelectWidth - allOptionsWidth);
            const singleGapWidth = totalGapWidth / (optionsLength);

            // Calculate how many options can fit in available space
            const optionWithGapWidth = singleOptionWidth + singleGapWidth;

            const fittingOptions = Math.floor(radioSelectWidth / optionWithGapWidth);

            // Ensure we stay within bounds
            const finalMaxOptions = Math.max(1, Math.min(fittingOptions, maxOptions));
            setDynamicMaxOptions(finalMaxOptions);

        });

        resizeObserver.observe(container);

        // // Initial calculation
        // setTimeout(() => {
        //     resizeObserver.disconnect();
        //     resizeObserver.observe(container);
        // }, 0);

        return () => resizeObserver.disconnect();
    }, [maxOptions, optionsLength]);

    return (
        <div ref={containerRef} className={CSS.RadioSelect} data-is-collapsed={dynamicMaxOptions < optionsLength}>

            {dynamicMaxOptions < optionsLength && (
                <>
                    <DropdownSelect
                        value={value}
                        options={options}
                        onChange={onChange}
                        forcePlaceholder={true}
                        placeholder={options.find(opt => opt.value === value)?.icon || ' '}
                    />
                    <span className={CSS.Divider}>|</span>
                </>
            )}

            <Options prioritizeIcons={true} value={value} options={options} onChange={onChange} />

        </div>
    );
};

export default memo(RadioSelect);