"use client";

import React, { Fragment, useCallback, useRef } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Slot from "../slot/component";
import DropdownSelect from "@/components/select/dropdown/component";

// Types
import type { SlotsProps } from "./types";

// Utilities
import { devLog } from "@/utilities/dev";

/**
 * Slots Component
 * Renders a row of Slot components for each value slot, plus an extra dropdown for the next possible slot.
 * Handles incremental slot-based value editing for a CSS property.
 *
 * @param props - SlotsProps containing values, options, and onChange callback
 * @returns ReactElement - The rendered slot editor UI
 */
const Slots: React.FC<SlotsProps> = (props: SlotsProps) => {
    const {
        values,
        options,
        onChange,
    } = props;


    // Guard Clause
    if (!options || options.length === 0) {
        devLog.error("[Slots] No options provided");
        return null;
    }

    if (values == null) {
        devLog.error("[Slots] Invalid value provided, expected a string");
        return null;
    }

    const valuesLength = values.length;
    const nextOptions = options[valuesLength];
    const slotsLength = options.length;
    const hasNext = valuesLength < slotsLength && nextOptions?.length > 0;


    /**
     * Handles a change in a single slot, updating the overall slot values array.
     */
    const handleSlotChange = useCallback((newValue: string, slotIndex: number) => {
        const updatedValues = [...values];
        updatedValues[slotIndex] = newValue;
        onChange(updatedValues);
    }, [values, onChange]
    );

    /**
     * Renders Slot components for each current value slot.
     */
    const renderCurrentSlots = useCallback(() => {
        // Handle empty values case - render first slot with empty value
        if (!values || valuesLength === 0) {
            return (
                <Slot
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
                    <Slot
                        value={slotValue}
                        options={options[slotIndex]}
                        onChange={val => handleSlotChange(val, slotIndex)}
                    />
                </Fragment>
            );
        });

    }, [values, options, handleSlotChange]
    );

    /**
     * Renders an extra dropdown for the next possible slot (if any).
     */
    const renderNextSlot = useCallback(() => {
        // Check if there are valid options for the next slot
        if (!values || valuesLength === 0 || !hasNext) return null;

        // Determine if the next options are a single keyword type
        const optionsLength = nextOptions.length;
        const isSingleKeyword = optionsLength === 1 && nextOptions[0].type === "keyword";

        // Render radio select for single keyword options (simpler UI)
        if (isSingleKeyword) {
            return (
                <Slot
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
                grouped={true}
                title="Select Next Slot"
                ariaLabel="Select Next Slot"
                onChange={(val: string) => handleSlotChange(val, valuesLength)}
            />
        );

    }, [values, options, handleSlotChange]
    );

    /**
     * Renders all current slots and the next slot dropdown, optionally inside a dropdown reveal.
     */
    const render = useCallback(() => {
        // // Calculate the number of available slots (slots with valid options)
        // const maxSlots = options.filter(opt => opt?.length > 0).length;

        // // Use dropdown reveal for complex scenarios (multiple slots and many values)
        // const shouldUseDropdown = maxSlots > 1 && valuesLength > 4;

        // if (shouldUseDropdown) {
        //     return (
        //         <DropdownReveal placeholder={values.join(" ")} closeOnChange={false} title="Edit Values">
        //             <div className={CSS.SlotsInner}>
        //                 {renderCurrentSlots()}
        //                 {renderNextSlot()}
        //             </div>
        //         </DropdownReveal>
        //     );
        // }

        // Default inline rendering for simple scenarios
        return (
            <>
                {/* <span aria-hidden="true" className={CSS.Separator}>————————————————————————————————————————————————</span> */}

                {renderCurrentSlots()}
                {renderNextSlot()}
            </>
        );
    }, [values, renderCurrentSlots, renderNextSlot]
    );


    return (
        <div className={CSS.Slots} role="presentation">
            {render()}
        </div>
    );
};

export default React.memo(Slots);
