"use client";
import React, { Fragment, memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import BlockStylesSlot from "@/src/page-builder/ui/inspectors/block/style/value/slot/component";
import DropdownSelect from "@/src/shared/components/select/dropdown/component";

// Types
import type { BlockStylesSlotsProps } from "@/src/page-builder/ui/inspectors/block/types";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

/**
 * BlockStylesSlots Component
 * Renders a row of Slot components for each value slot, plus an extra dropdown for the next possible slot.
 * Handles incremental slot-based value editing for a CSS property.
 *
 * @param props - BlockStylesSlots containing values, options, and onChange callback
 * @returns The rendered slot editor UI
 */
const BlockStylesSlots: React.FC<BlockStylesSlotsProps> = ({ values, options, onChange }) => {
    if (!options || !Array.isArray(options) || options.length === 0) return devRender.error("[Slots] No options provided", { options });
    if (!values || !Array.isArray(values)) return devRender.error("[Slots] No values provided", { values });
    if (!onChange || typeof onChange !== "function") return devRender.error("[Slots] Invalid onChange callback", { onChange });

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
                onChange={(val: string) => handleSlotChange(val, valuesLength)}
                className="NextSlotDropdown"
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

export default memo(BlockStylesSlots);
