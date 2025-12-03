"use client";
import React, { Fragment, memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import BlockStylesSlot from "@/src/features/block/style/value/slot/component";
import DropdownSelect from "@/src/shared/components/select/dropdown/component";

// Types
import type { BlockStylesSlotsProps } from "./types";

/**
 * BlockStylesSlots Component
 *
 * A multi-slot value editor that manages arrays of CSS property values with incremental slot addition.
 * Renders individual slot editors for each value and provides intelligent UI for adding subsequent slots.
 * Uses radio buttons for single keyword options and dropdowns for complex multi-option slots.
 *
 * @param  props - Component properties
 * @param  props.values - Array of current CSS values for each slot
 * @param  props.options - Two-dimensional array of options for each slot position
 * @param  props.onChange - Callback triggered when any slot value changes
 * @returns Rendered collection of slot editors with optional next-slot adder
 *
 * @note Automatically chooses between radio and dropdown UI based on next slot's option complexity
 */
const BlockStylesSlots: React.FC<BlockStylesSlotsProps> = ({ values, options, onChange }) => {
    const valuesLength = values.length;
    const nextOptions = options[valuesLength];
    const slotsLength = options.length;
    const hasNext = valuesLength < slotsLength && nextOptions?.length > 0;

    // Handle changes to individual slot values
    const handleSlotChange = (newValue: string, slotIndex: number) => {
        // Create a copy of the values array and update the specific slot
        const updatedValues = [...values];
        updatedValues[slotIndex] = newValue;
        onChange(updatedValues);
    };

    // Render all current slot components
    const renderCurrentSlots = () => {
        // Handle empty values case - render first slot with empty value
        if (!values || valuesLength === 0) {
            return (
                <BlockStylesSlot
                    key={0}
                    value={""}
                    options={options[0]}
                    onChange={val => handleSlotChange(val, 0)}
                />
            );
        }

        // Render all existing slots with separators between them
        return values.map((slotValue, slotIndex) => {
            return (
                <Fragment key={slotIndex}>
                    <BlockStylesSlot
                        value={slotValue}
                        options={options[slotIndex]}
                        onChange={val => handleSlotChange(val, slotIndex)}
                    />
                </Fragment>
            );
        });

    };

    // Render dropdown for adding the next slot if available
    const renderNextSlot = () => {
        // Check if there are valid options for the next slot
        if (!values || valuesLength === 0 || !hasNext) return null;

        // Determine if the next options are a single keyword type
        const optionsLength = nextOptions.length;
        const isSingleKeyword = optionsLength === 1 && nextOptions[0].type === "keyword";

        // Render radio select for single keyword options (simpler UI)
        if (isSingleKeyword) {
            return (
                <BlockStylesSlot
                    value={""}
                    options={nextOptions}
                    onChange={(val: string) => handleSlotChange(val, valuesLength)}
                />
            );
        }

        // Render dropdown select for multiple options or complex types
        return (
            <DropdownSelect
                value=""
                forcePlaceholder={true}
                options={nextOptions}
                placeholder="+"
                searchable={false}
                groupable={true}
                title="Select Next Slot"
                className='BlockStylesNextSlot'
                onChange={(val: string) => handleSlotChange(val, valuesLength)}
            />
        );

    };

    return (
        <div className={CSS.BlockStylesSlots}>
            {renderCurrentSlots()}
            {renderNextSlot()}
        </div>
    );
};

BlockStylesSlots.displayName = "BlockStylesSlots";
export default memo(BlockStylesSlots);
