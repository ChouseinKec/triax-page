"use client";

import { memo, useCallback } from "react";

// Types
import type { BlockAttributesValueProps } from "@/src/page-builder/ui/inspectors/block/types";

// Constants
import { ATTRIBUTE_DEFINITIONS } from "@/src/page-builder/core/block/attribute/constants";

// Managers
import { useBlockAttribute, setBlockAttribute } from "@/src/page-builder/services/managers/block/attribute";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

// Components
import InputGeneric from "@/src/shared/components/input/generic/component";
import DropdownSelect from "@/src/shared/components/select/dropdown/component";
import RadioSelect from "@/src/shared/components/select/radio/component";

/**
 * BlockAttributesValue Component
 * Main entry for rendering a HTML property value editor.
 *
 * @param blockID - The ID of the block
 * @param propertyName - The HTML property key
 * @returns ReactElement - The rendered value editor UI for the property.
 */
const BlockAttributesValue: React.FC<BlockAttributesValueProps> = ({ blockID, attribute }) => {
    if (!blockID) return devRender.error("[BlockAttributesValue] No block ID provided", { blockID });
    if (!attribute) return devRender.error("[BlockAttributesValue] No attribute provided", { attribute });

    const value = useBlockAttribute(blockID, attribute) || "";

    const handleChange = useCallback((newValue: string) => {
        setBlockAttribute(blockID, attribute, newValue);
    }, [blockID, attribute]
    );

    const definition = ATTRIBUTE_DEFINITIONS[attribute];

    if (!definition) return devRender.error(`[BlockAttributesValue] No definition found for ${attribute}`, { definition });

    const renderValue = () => {
        const type = definition.syntax.type;
        if (!type) return devRender.error(`[BlockAttributesValue] No type defined for ${attribute}`, { definition });

        switch (type) {
            case "string":
                return <InputGeneric value={value} onChange={handleChange} type="text" />;
            case "number":
                return <InputGeneric value={value} onChange={handleChange} type="number" />;
            case "list":
                const listOptions = definition.syntax.options;
                if (!listOptions) return devRender.error(`[BlockAttributesValue] No options defined for list type of ${attribute}`, { definition });
                return <DropdownSelect value={value} onChange={handleChange} options={listOptions} />;
            case "radio":
                const radioOptions = definition.syntax.options;
                if (!radioOptions) return devRender.error(`[BlockAttributesValue] No options defined for radio type of ${attribute}`, { definition });
                return <RadioSelect prioritizeIcons={false} value={value} onChange={handleChange} options={radioOptions} />;
            default:
                return devRender.error(`[BlockAttributesValue] Unsupported type "${type}" for ${attribute}`, { definition });
        }
    };


    return renderValue();

};

export default memo(BlockAttributesValue);

