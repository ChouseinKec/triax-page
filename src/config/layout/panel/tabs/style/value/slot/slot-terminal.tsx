"use client";

// Types
import type { SlotTerminalProps } from "./types";
import type { ValueTokenTerminal } from "@/core/block/style/types";

// Managers
import { getTerminalDefinition } from "@/core/block/style/managers";

// Utilities
import { createTokenFunction } from "@/core/block/style/utilities";

// Components
import GenericInput from "@/shared/components/input/generic/component";

const SlotTerminal: React.FC<SlotTerminalProps> = ({ options, terminalDefinitions, valueToken, onChange }) => {
    const terminalDefinition = getTerminalDefinition(valueToken.terminal);

    const onChangeValue = (newValue: string | null) => {
        if (!newValue) return onChange(null);

        if (valueToken.type === 'function') {
            return onChange(createTokenFunction(newValue, terminalDefinitions));
        }

        const token: ValueTokenTerminal = { type: 'terminal', terminal: valueToken.terminal, value: newValue };
        onChange(token);
    };

    const onChangeOption = (selectedValue: string | null) => {
        if (!selectedValue) return onChange(null);
        const option = options.find(o => o.value === selectedValue);
        if (!option) return;
        onChange(option.token);
    };

    if (!terminalDefinition) return <GenericInput type="text" value={valueToken.value} onChange={onChangeValue} />;

    return terminalDefinition.getComponent({
        value: valueToken.value,
        options,
        terminalDefinitions,
        onChangeValue,
        onChangeOption,
    });
};

SlotTerminal.displayName = "SlotTerminal";
export default SlotTerminal;
