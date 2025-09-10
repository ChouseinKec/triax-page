"use client";

import { memo, useCallback } from "react";

// Types
import type { AttributesEditorValueProps } from "@/editors/block/types/component";

// Constants
import { AttributeDefinitions } from "@/constants/block/attribute";

// Managers
import { useAttribute, setAttribute } from "@/editors/block/managers/attribute";

// Utilities
import { devRender } from "@/utilities/dev";

// Components
import InputGeneric from "@/components/input/generic/component";
import DropdownSelect from "@/components/select/dropdown/component";
import RadioSelect from "@/components/select/radio/component";

/**
 * AttributesEditorValue Component
 * Main entry for rendering a HTML property value editor.
 *
 * @param blockID - The ID of the block
 * @param propertyName - The HTML property key
 * @returns ReactElement - The rendered value editor UI for the property.
 */
const AttributesEditorValue: React.FC<AttributesEditorValueProps> = ({ blockID, attribute }) => {
    if (!blockID) return devRender.error("[AttributesEditorValue] No block ID provided", { blockID });
    if (!attribute) return devRender.error("[AttributesEditorValue] No attribute provided", { attribute });

    const value = useAttribute(blockID, attribute) || "";

    const handleChange = useCallback((newValue: string) => {
        setAttribute(blockID, attribute, newValue);
    }, [blockID, attribute]
    );

    const definition = AttributeDefinitions[attribute];

    if (!definition) return devRender.error(`[AttributesEditorValue] No definition found for ${attribute}`, { definition });

    const renderValue = () => {
        const type = definition.syntax.type;
        if (!type) return devRender.error(`[AttributesEditorValue] No type defined for ${attribute}`, { definition });

        switch (type) {
            case "string":
                return <InputGeneric value={value} onChange={handleChange} type="text" />;
            case "number":
                return <InputGeneric value={value} onChange={handleChange} type="number" />;
            case "list":
                const listOptions = definition.syntax.options;
                if (!listOptions) return devRender.error(`[AttributesEditorValue] No options defined for list type of ${attribute}`, { definition });
                return <DropdownSelect value={value} onChange={handleChange} options={listOptions} />;
            case "radio":
                const radioOptions = definition.syntax.options;
                if (!radioOptions) return devRender.error(`[AttributesEditorValue] No options defined for radio type of ${attribute}`, { definition });
                return <RadioSelect prioritizeIcons={false} value={value} onChange={handleChange} options={radioOptions} />;
            default:
                return devRender.error(`[AttributesEditorValue] Unsupported type "${type}" for ${attribute}`, { definition });
        }
    };


    return renderValue();

};

export default memo(AttributesEditorValue);

