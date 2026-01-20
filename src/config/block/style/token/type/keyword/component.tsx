"use client";
import React, { memo, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import { TokenKeywordProps } from "./types";

// Components
import DropdownSelect from "@/src/shared/components/select/dropdown/component";
import RadioSelect from "@/src/shared/components/select/radio/component";


/**
 * TokenKeyword Component
 *
 * An adaptive keyword selector for CSS values that intelligently chooses between radio buttons and dropdown based on option characteristics.
 * Displays as a compact radio group when all options have icons, otherwise uses a searchable dropdown.
 * Provides a user-friendly interface for selecting predefined CSS keyword values.
 *
 * @param  props - Component properties
 * @param  props.value - Currently selected keyword value
 * @param  props.options - Array of keyword options with optional icons
 * @param  props.onChange - Callback triggered when selection changes
 * @returns Rendered keyword selector (radio or dropdown based on icon availability)
 *
 * @note Automatically switches to radio layout when all options have icons for better UX
 */
const TokenKeyword: React.FC<TokenKeywordProps> = ({ value, options, onChange }) => {

    // Determine if all options have an icon for radio rendering
    const hasIcon = useMemo(() => options.every(option => !!option.icon), [options]);

    return (
        <div
            className={`${CSS.TokenKeyword} TokenKeyword`}
            data-type={hasIcon ? "radio" : "dropdown"}
            role="presentation"
        >
            {hasIcon
                ? <RadioSelect
                    value={value}
                    options={options}
                    onChange={(newValue) => onChange(newValue as string)}
                />
                : <DropdownSelect
                    value={value}
                    options={options}
                    placeholder="N/A"
                    searchable={false}
                    groupable={true}
                    onChange={onChange}
                    title="Change Value Type"
                />
            }
        </div>
    )
};

TokenKeyword.displayName = "TokenKeyword";
export default memo(TokenKeyword);
