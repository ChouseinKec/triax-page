"use client";
import React, { memo, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import DropdownSelect from "@/src/shared/components/select/dropdown/component";
import RadioSelect from "@/src/shared/components/select/radio/component";

// Types
import { BlockStylesValueKeywordProps } from "@/src/page-builder/ui/inspectors/block/types";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

/**
 * BlockStylesValueKeyword Component
 * Renders a keyword value selector using either a radio group (with icons)
 * or a dropdown select (without icons), based on the provided options.
 *
 * @param value - The current selected value
 * @param options - Array of available options for selection
 * @param onChange - Callback function to handle value changes
 * @returns The rendered selector component
 */
const BlockStylesValueKeyword: React.FC<BlockStylesValueKeywordProps> = ({ value, options, onChange }) => {
    if (typeof value !== "string") return devRender.error("[BlockStylesValueKeyword] No value provided", { value });
    if (!options || !Array.isArray(options) || options.length === 0) return devRender.error("[BlockStylesValueKeyword] No options provided", { options });
    if (!onChange || typeof onChange !== "function") return devRender.error("[BlockStylesValueKeyword] Invalid onChange callback", { onChange });

    // Determine if all options have an icon for radio rendering
    const hasIcon = useMemo(() =>
        options.every(option => !!option.icon),
        [options]
    );

    return (
        <div
            className={CSS.BlockStylesValueKeyword}
            data-type={hasIcon ? "radio" : "dropdown"}
            role="presentation"
        >
            {hasIcon ? (
                <RadioSelect
                    value={value}
                    options={options}
                    onChange={onChange}
                    className="KeywordRadioSelect"
                />
            ) : (
                <DropdownSelect
                    value={value}
                    options={options}
                    placeholder="N/A"
                    searchable={false}
                    groupable={true}
                    onChange={onChange}
                    title="Change Value Type"
                    className="KeywordDropdownSelect"
                />
            )}
        </div>
    )
};

export default memo(BlockStylesValueKeyword);
