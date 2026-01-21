"use client";
import { memo, useCallback } from "react";

// Types
import type { BlockAttributesValueProps } from "./types";

// Managers
import { useBlockAttribute, setBlockAttribute } from "@/core/block/attribute/managers";

// Utilities
import { devRender } from "@/shared/utilities/dev";

// Registry
import { getRegisteredAttribute } from "@/core/block/attribute/registries";

// Styles
import CSS from "./styles.module.scss";

// Components
import GenericInput from "@/shared/components/input/generic/component";
import DropdownSelect from "@/shared/components/select/dropdown/component";
import RadioSelect from "@/shared/components/select/radio/component";

/**
 * BlockAttributeValue Component
 * Main entry for rendering a HTML property value editor.
 *
 * @param blockID - The ID of the block
 * @param propertyName - The HTML property key
 * @returns ReactElement - The rendered value editor UI for the property.
 */
const BlockAttributeValue: React.FC<BlockAttributesValueProps> = ({ blockID, attribute }) => {
    const value = useBlockAttribute(blockID, attribute) || "";

    const handleChange = useCallback((newValue: string) => {
        setBlockAttribute(blockID, attribute, newValue);
    }, [blockID, attribute]
    );

    const attributeDefinition = getRegisteredAttribute(attribute);
    if (!attributeDefinition) return devRender.error(`[BlockAttributeValue] No attributeDefinition found for ${attribute}`, { attributeDefinition });

    const renderValue = () => {
        const { type } = attributeDefinition.syntax;
        if (!type) return devRender.error(`[BlockAttributeValue] No type defined for ${attribute}`, { attributeDefinition });

        switch (type) {
            case "string":
                return <GenericInput value={value} onChange={handleChange} type="text" />;
            case "number":
                return <GenericInput value={value} onChange={handleChange} type="number" />;
            case "list":
                return <DropdownSelect value={value} onChange={handleChange} options={attributeDefinition.syntax.options} />;
            case "radio":
                return <RadioSelect prioritizeIcons={false} value={value} onChange={(value) => handleChange(value as string)} options={attributeDefinition.syntax.options} />;
            default:
                return <span className={CSS.Unsupported}>Unsupported value type</span>;
        }
    };

    return renderValue();
};

BlockAttributeValue.displayName = "BlockAttributeValue";
export default memo(BlockAttributeValue);

