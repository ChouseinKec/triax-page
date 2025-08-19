"use client";

import React, { memo, useCallback } from "react";

// Styles
import CSS from "./style.module.scss";

// Types
import { InputToggleProps } from "./type";

/**
 * InputToggle Component
 *
 * Controlled toggle that emits mapped string values
 *
 * @component
 * @param  props.value - Current value string (matches `options.true` when active)
 * @param  props.onChange - Callback invoked with the next mapped value
 * @param  props.options - Optional map: { true: 'On', false: 'Off' }
 * @returns The rendered InputToggle element
 */
const InputToggle: React.FC<InputToggleProps> = (props) => {
    const {
        value,
        onChange,
        options
    } = props;

    // default mapping for labels/values
    const defaultMap = { true: "true", false: "false" };

    // effective mapping (defaults overridden by props)
    const map = { ...defaultMap, ...(options ?? {}) } as Record<string, string>;

    // boolean active state derived from the incoming `value`
    const isActive = value === map.true;

    // Toggle: compute next key and call parent with its mapped string
    const handleToggle = useCallback(() => {
        const nextKey = isActive ? 'false' : 'true';
        onChange(map[nextKey]);
    }, [isActive, map, onChange]);

    // CSS variables used by styles (labels quoted for use in `content:`)
    const cssVars = {
        ['--label--true']: `"${map.true}"`,
        ['--label--false']: `"${map.false}"`,
    } as React.CSSProperties & Record<string, string>;

    return (
        <div className={CSS.InputToggle}>
            <button
                type="button"
                className={CSS.Button}
                onClick={handleToggle}
                data-is-active={String(isActive)}
                style={cssVars}
            >
                <span
                    className={CSS.Indicator}
                    data-is-selected={String(isActive)}
                />
            </button>
        </div>
    );
};

export default memo(InputToggle);