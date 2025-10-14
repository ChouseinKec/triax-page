"use client";
import { memo, useCallback } from "react";

// Types
import type { BlockAttributesValueProps } from "./types";

// Constants
import { ATTRIBUTE_DEFINITIONS } from "@/src/page-builder/core/block/attribute/constants";

// Managers
import { useBlockAttribute, setBlockAttribute } from "@/src/page-builder/services/managers/block/attribute";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

// Styles
import CSS from "./styles.module.scss";

// Components
import GenericInput from "@/src/shared/components/input/generic/component";
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
                return <GenericInput value={value} onChange={handleChange} type="text" />;
            case "number":
                return <GenericInput value={value} onChange={handleChange} type="number" />;
            case "list":
                const listOptions = definition.syntax.options;
                return <DropdownSelect value={value} onChange={handleChange} options={listOptions} />;
            case "radio":
                const radioOptions = definition.syntax.options;
                return <RadioSelect prioritizeIcons={false} value={value} onChange={handleChange} options={radioOptions} />;
            default:
                return <span className={CSS.Unsupported}>Unsupported value type</span>;
        }
    };

    return renderValue();
};

BlockAttributesValue.displayName = "BlockAttributesValue";
export default memo(BlockAttributesValue);

