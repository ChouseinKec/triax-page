"use client";

import React, { memo, ReactElement, useRef, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Options from "@/src/shared/components/select/options/component";
import TooltipReveal from "@/src/shared/components/reveal/tooltip/component";

// Types
import type { RadioSelectProps } from "./types";

// Hooks
import useSize from "@/src/shared/hooks/interface/useSize";

/**
 * RadioSelect Component
 *
 * A responsive radio selection component that displays options in a compact layout with overflow handling.
 * Automatically shows a tooltip with full options when content overflows the container.
 * Provides single-selection behavior with icon/text display options.
 *
 * @param  props - Component properties
 * @param  props.value - The currently selected option value
 * @param  props.options - Array of selectable option objects
 * @param  props.onChange - Callback function triggered when selection changes
 * @param  props.className="" - Additional CSS classes for custom styling
 * @param  props.prioritizeIcons=true - Prioritizes icon display over text in options
 * @param  props.clearable=true - Allows clearing the selection
 * @param  props.direction="horizontal" - Layout direction of options
 * @param  props.multiselectable=false - Enables multiple selection
 * @returns Rendered radio select with overflow tooltip when needed
 *
 * @note Automatically collapses and shows tooltip when container overflows
 * @note Optimized to prevent unnecessary re-renders of child components
 */
const RadioSelect: React.FC<RadioSelectProps> = ({
    value,
    options,
    onChange,
    className = "",
    prioritizeIcons = true,
    clearable = true,
    direction = "horizontal",
    multiselectable = false,
}): ReactElement => {

    const containerRef = useRef<HTMLDivElement>(null);
    const { isOverflowing } = useSize(containerRef);

    // Memoize the options component to prevent unnecessary re-renders
    const optionInstances = useMemo(() => (
        <Options
            prioritizeIcons={prioritizeIcons}
            value={value}
            options={options}
            onChange={onChange}
            clearable={clearable}
            multiselectable={multiselectable}
        />
    ),
        [prioritizeIcons, value, options, onChange, clearable, multiselectable]
    );

    // Memoize the tooltip content to prevent unnecessary re-renders
    const tooltipInstance = useMemo((): ReactElement | null => {
        if (!isOverflowing) return null;

        return (
            <TooltipReveal
                targetRef={containerRef}
                anchor="top"
                hoverDelay={600}
            >
                {optionInstances}
            </TooltipReveal>
        );
    },
        [isOverflowing, optionInstances]
    );

    return (
        <div
            className={`${CSS.RadioSelect} RadioSelect ${className}`}
            ref={containerRef}
            data-is-collapsed={isOverflowing}
            data-direction={direction}
        >
            {/* Render options */}
            {optionInstances}

            {/* Render tooltip for overflowing content */}
            {tooltipInstance}
        </div>
    );
};

RadioSelect.displayName = "RadioSelect";
export default memo(RadioSelect);