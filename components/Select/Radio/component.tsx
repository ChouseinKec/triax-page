"use client";

import React, { memo, ReactElement, useRef } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Options from "@/components/select/options/component";
import FloatReveal from "@/components/reveal/float/component";

// Types
import { RadioSelectProps } from "@/components/select/radio/types";

// Hooks
import useSize from "@/hooks/interface/useSize";

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
        ariaLabel = "Radio Select",
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const { isOverflowing } = useSize(containerRef);

    return (
        <div ref={containerRef} aria-label={ariaLabel} role="radiogroup" className={CSS.RadioSelect} data-is-collapsed={isOverflowing}>
            <Options prioritizeIcons={true} ariaRole={"radio"} value={value} options={options} onChange={onChange} />

            {isOverflowing &&
                <FloatReveal
                    targetRef={containerRef}
                    position="top"
                    hoverDelay={600}
                >
                    <Options prioritizeIcons={true} ariaRole={"radio"} value={value} options={options} onChange={onChange} />
                </FloatReveal>
            }
        </div>
    );
};

export default memo(RadioSelect);