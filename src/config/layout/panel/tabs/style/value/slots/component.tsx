"use client";
import React, { memo, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { StyleValueSlotsProps } from "./types";

// Utilities
import { createSlotOptions, setValueTokens } from "@/core/block/style/utilities";

// Components
import StyleValueSlot from "@/config/layout/panel/tabs/style/value/slot/component";
import SlotEmpty from "./slot-empty";
import SlotNext from "./slot-next";

/**
 * StyleValueSlots Component
 *
 * Renders one StyleValueSlot per active value token, using the derivedSchema to resolve
 * which Slot type should be rendered at each position.
 * Also handles the "next slot" UI — a toggle for single-option slots or a
 * "+" dropdown for multi-option next slots.
 */
const StyleValueSlots: React.FC<StyleValueSlotsProps> = ({ styleKey, valueTokens, derivedSchema, terminalDefinitions, onChange, inline }) => {

    const valuesLength = valueTokens.length;
    const nextSlot = derivedSchema[valuesLength];
    const slotsLength = derivedSchema.length;
    const hasNext = valuesLength < slotsLength && nextSlot?.length > 0;

    const emptyOptions = useMemo(() => createSlotOptions(derivedSchema[0], terminalDefinitions, styleKey), [derivedSchema, terminalDefinitions, styleKey]);
    const nextOptions = useMemo(() => hasNext ? createSlotOptions(nextSlot, terminalDefinitions, styleKey) : [], [hasNext, nextSlot, terminalDefinitions, styleKey]);

    const currentSlots = valuesLength === 0
        ? <SlotEmpty
            options={emptyOptions}
            onChange={(token) => onChange([token])}
        />
        : valueTokens.map((token, slotIndex) => (
            <StyleValueSlot
                key={slotIndex}
                styleKey={styleKey}
                slots={derivedSchema[slotIndex]}
                valueToken={token}
                terminalDefinitions={terminalDefinitions}
                onChange={(newToken) => onChange(setValueTokens(valueTokens, slotIndex, newToken))}
                inline={inline}
            />
        ));

    const nextSlotEl = valuesLength > 0 && hasNext
        ? <SlotNext
            options={nextOptions}
            onChange={(token) => onChange([...valueTokens, token])}
        />
        : null;

    return (
        <div className={`${CSS.StyleValueSlots} StyleValueSlots`}>
            {currentSlots}
            {nextSlotEl}
        </div>
    );
};

StyleValueSlots.displayName = "StyleValueSlots";
export default memo(StyleValueSlots);