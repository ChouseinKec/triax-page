"use client";
import { memo, useCallback, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { StyleValue } from "./types";
import type { ValueToken } from "@/core/block/style/types";

// Utilities
import { resolveValueTokens, matchVariations, groupValueTokens, deriveSchema, deriveValueTokens, simplifyValueTokens, deriveVariations, simplifyVariations, serializeValueTokens } from "@/core/block/style/utilities";

// Components
import StyleValueSlots from "@/config/layout/panel/tabs/style/value/slots/component";
import GenericInput from "@/shared/components/input/generic/component";

// Managers
import { getTerminalDefinitions } from "@/core/block/style/managers";

/**
 * StyleValue Component
 *
 * Top-level CSS property value editor.
 * Compiles the property's VDS syntax into a flat variation list, derives a
 * positional derivedSchema, then matches the current value to find the active
 * variation and splits it into individual slot derivedValueTokens for rendering.
 */
const StyleValue: React.FC<StyleValue> = ({ value, onChange, constraint, styleKey, terminalDefinitions: terminalDefinitionsProp, derivedVariations: derivedVariationsProp, simplifiedVariations: simplifiedVariationsProp, inline }) => {
    const terminalDefinitions = useMemo(() => terminalDefinitionsProp ?? getTerminalDefinitions(), [terminalDefinitionsProp]);
    const derivedVariations = useMemo(() => derivedVariationsProp ?? deriveVariations(constraint), [derivedVariationsProp, constraint]);
    const simplifiedVariations = useMemo(() => simplifiedVariationsProp ?? simplifyVariations(derivedVariations), [simplifiedVariationsProp, derivedVariations]);

    const handleChange = useCallback((valueTokens: ValueToken[]) => {
        // If the new value is empty, return an empty string 
        if (valueTokens.length === 0) return onChange('');

        // Resolve the new value tokens against the simplified variations to ensure they form a valid value.
        // terminalDefinitions is passed so partial matches can be completed with per-type defaults.
        const resolved = resolveValueTokens(valueTokens, derivedVariations, simplifiedVariations, terminalDefinitions);
        if (!resolved) return;

        // Serialize the resolved token stream back into a CSS value string and pass it to onChange.
        onChange(serializeValueTokens(resolved));
    },
        [derivedVariations, simplifiedVariations, onChange]
    );

    // Parse the current value into tokens — memoized so re-renders with the same value are free.
    const derivedValueTokens = useMemo(() => deriveValueTokens(value, terminalDefinitions), [value, terminalDefinitions]);

    // Match against full variations — memoized on tokens + variations.
    const matchedVariation = useMemo(() => matchVariations(derivedValueTokens, derivedVariations, false), [derivedValueTokens, derivedVariations]);
    const variationIndex = matchedVariation.full >= 0 ? matchedVariation.full : 0;

    // Group + simplify tokens for the active variation.
    // Skip the work when value is malformed (we'll fallback to a raw input below).
    const isFallback = matchedVariation.full === -1 && !!value;
    const groupedValueTokens = useMemo(() => {
        if (isFallback) return [];
        return simplifyValueTokens(groupValueTokens(derivedValueTokens, derivedVariations[variationIndex]));
    }, [isFallback, derivedValueTokens, derivedVariations, variationIndex]
    );

    // Derive schema for the active variation — memoized on grouped tokens + simplified variations.
    const derivedSchema = useMemo(() => {
        if (isFallback) return [];
        return deriveSchema(groupedValueTokens, simplifiedVariations);
    }, [isFallback, groupedValueTokens, simplifiedVariations]
    );

    return (
        isFallback
            // If the value is malformed, render a freeform input instead of the slots editor. 
            ? <GenericInput
                className={CSS.Fallback}
                value={value}
                onChange={onChange}
            />
            // Otherwise, render the slots editor with the derived schema and value tokens.
            : <StyleValueSlots
                styleKey={styleKey}
                valueTokens={groupedValueTokens}
                derivedSchema={derivedSchema}
                terminalDefinitions={terminalDefinitions}
                onChange={handleChange}
                inline={inline}
            />
    )
};

StyleValue.displayName = "StyleValue";
export default memo(StyleValue);
