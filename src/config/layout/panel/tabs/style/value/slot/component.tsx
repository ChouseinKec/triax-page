"use client";
import { memo, useMemo } from "react";

// CSS
import CSS from "./styles.module.scss";

// Types
import type { StyleValueSlotProps } from "./types";
import type { ValueTokenFunction } from "@/core/block/style/types";

// Components
import SlotTerminal from "./slot-terminal";
import SlotFunction from "./slot-function";
import SlotGroup from "./slot-group";

// Utilities
import { createSlotOptions } from "@/core/block/style/utilities";

/**
 * StyleValueSlot Component
 *
 * Receives the full set of possible VariationSlots at this schema column and
 * picks the active one by matching the current valueToken's token type.
 * Falls back to the first slot when no valueToken is present.
 * Dispatches to: Terminal, Function, Combinator, Group, or Literal.
 */
const StyleValueSlot: React.FC<StyleValueSlotProps> = ({ styleKey, slots, valueToken, terminalDefinitions, onChange, inline }) => {
    const options = useMemo(() => createSlotOptions(slots, terminalDefinitions, styleKey), [slots, terminalDefinitions, styleKey]);

    switch (valueToken.type) {
        case 'terminal': {
            return (
                <div className={CSS.Slot} data-type="terminal">
                    <SlotTerminal options={options} terminalDefinitions={terminalDefinitions} valueToken={valueToken} onChange={onChange} />
                </div>
            );
        }
        case 'function': {
            return <SlotFunction options={options} terminalDefinitions={terminalDefinitions} valueToken={valueToken as ValueTokenFunction} onChange={onChange} inline={inline} />;
        }
        case 'group': {
            return (
                <div className={CSS.Slot} data-type="group">
                    <SlotGroup styleKey={styleKey} slots={slots} options={options} terminalDefinitions={terminalDefinitions} valueToken={valueToken} onChange={onChange} />
                </div>
            );
        }
        default:
            return <p>Oops</p>;
    }
};

StyleValueSlot.displayName = "StyleValueSlot";
export default memo(StyleValueSlot);