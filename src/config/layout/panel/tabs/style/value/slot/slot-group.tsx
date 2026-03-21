"use client";
import { useMemo, useState } from "react";

// CSS
import CSS from "./styles.module.scss";

// Types
import type { SlotGroupProps } from "./types";
import type { ValueTokenSegments } from "@/core/block/style/types";

// Components
import DropdownReveal from "@/shared/components/reveal/dropdown/component";
import DropdownSelect from "@/shared/components/select/dropdown/component";
import StyleValue from "@/config/layout/panel/tabs/style/value/component";

// Utilities
import { serializeValueTokens, deriveValueTokens, deriveVariations, simplifyVariations, splitValueTokens, mergeValueTokens } from "@/core/block/style/utilities";

const SlotGroup: React.FC<SlotGroupProps> = ({ styleKey, slots, options, terminalDefinitions, valueToken, onChange, derivedVariations: derivedVariationsProp, simplifiedVariations: simplifiedVariationsProp }) => {
    const slotGroup = slots.find((slot) => slot.type === 'group');
    if (!slotGroup) return <p>Oopsies</p>;

    const innerDerivedVariations = useMemo(() => derivedVariationsProp ?? deriveVariations(slotGroup.constraint), [derivedVariationsProp, slotGroup.constraint]);
    const innerSimplifiedVariations = useMemo(() => simplifiedVariationsProp ?? simplifyVariations(innerDerivedVariations), [simplifiedVariationsProp, innerDerivedVariations]);

    const splitter = slotGroup.multiplier?.combinator ?? ((slotGroup.multiplier?.max ?? 1) === 1 ? undefined : ' ');
    const segments: ValueTokenSegments = useMemo(() => splitValueTokens(valueToken.tokens, splitter), [valueToken.tokens, splitter]);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const toggle = (i: number) => setActiveIndex(prev => prev === i ? null : i);

    const handleSegmentChange = (index: number, newValue: string) => {
        const newSegmentTokens = deriveValueTokens(newValue, terminalDefinitions);
        const newSegments: ValueTokenSegments = segments.map((seg, i) => i === index ? newSegmentTokens : seg);
        onChange({ ...valueToken, tokens: mergeValueTokens(newSegments, splitter) });
    };

    const handleDelete = (index: number) => {
        const newSegments: ValueTokenSegments = segments.filter((_, i) => i !== index);
        if (newSegments.length === 0) {
            onChange(null);
            setActiveIndex(null);
            return;
        }
        // Keep active index valid after deletion
        setActiveIndex(prev => prev === index ? null : prev !== null && prev > index ? prev - 1 : prev);
        onChange({ ...valueToken, tokens: mergeValueTokens(newSegments, splitter) });
    };

    const handleAdd = (newUnitValue: string) => {
        if (!newUnitValue) return;
        const newSegmentTokens = deriveValueTokens(newUnitValue, terminalDefinitions);
        const newSegments: ValueTokenSegments = [...segments, newSegmentTokens];
        setActiveIndex(newSegments.length - 1);
        onChange({ ...valueToken, tokens: mergeValueTokens(newSegments, splitter) });
    };

    return (
        <DropdownReveal placeholder={serializeValueTokens(valueToken.tokens) || 'N/A'} closeOnChange={false}>
            {segments.map((segment, i) => (
                <div className={CSS.GroupSegment} key={i} data-is-active={activeIndex === i}>

                    <div className={CSS.SlotIndex} data-is-open={activeIndex === i}>
                        <span>{i}.</span>
                    </div>

                    {activeIndex === i
                        ?
                        <StyleValue
                            styleKey={styleKey}
                            constraint={slotGroup.constraint}
                            derivedVariations={innerDerivedVariations}
                            simplifiedVariations={innerSimplifiedVariations}
                            terminalDefinitions={terminalDefinitions}
                            value={serializeValueTokens(segment)}
                            onChange={(newValue) => handleSegmentChange(i, newValue)}
                            inline={true}
                        />

                        : <button
                            className={CSS.SegmentToggle}
                            onClick={() => toggle(i)}
                        >
                            {serializeValueTokens(segment) || 'N/A'}
                        </button>

                    }

                    {activeIndex != i &&
                        <div className={CSS.SlotActions}>
                            <button
                                className={CSS.SlotAction}
                                onClick={() => handleDelete(i)}
                                title="Delete Slot"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" /></svg>                            </button>
                        </div>
                    }
                </div>
            ))}

            <DropdownSelect
                className="SlotNext"
                options={options}
                onChange={handleAdd}
                placeholder="+"
                forcePlaceholder={true}
                groupable={true}
                searchable={true}
                multiselectable={false}
                value=""
            />
        </DropdownReveal>
    );
};

SlotGroup.displayName = "SlotGroup";
export default SlotGroup;
