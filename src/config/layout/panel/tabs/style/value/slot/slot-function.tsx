"use client";

// CSS
import CSS from "./styles.module.scss";

// Types
import type { SlotFunctionProps } from "./types";

// Components
import SlotTerminal from "./slot-terminal";
import DropdownReveal from "@/shared/components/reveal/dropdown/component";

const SlotFunction: React.FC<SlotFunctionProps> = ({ options, terminalDefinitions, valueToken, onChange, inline }) => {
    const content = (
        <div className={CSS.Slot} data-type="function">
            <SlotTerminal options={options} terminalDefinitions={terminalDefinitions} valueToken={valueToken} onChange={onChange} />
        </div>
    );

    if (inline) return content;

    return (
        <DropdownReveal placeholder={valueToken.function} closeOnChange={false} title="Edit Function">
            {content}
        </DropdownReveal>
    );
};

SlotFunction.displayName = "SlotFunction";
export default SlotFunction;
