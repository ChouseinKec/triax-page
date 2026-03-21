"use client";

import React, { memo, ReactElement } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { GradientSelectProps } from "./types";

// Hooks
import { useDebouncedCallback } from "@/shared/hooks/utility/useCallback";

// Components
import ColorPicker from 'react-best-gradient-color-picker';
import DropdownReveal from "@/shared/components/reveal/dropdown/component";


/**
 * GradientSelect Component
 *
 * A controlled gradient picker that wraps `react-best-gradient-color-picker`
 * with gradient mode enabled. Unlike ColorSelect, the solid/gradient toggle and
 * gradient-specific controls (type, angle, stops) are kept visible so the user
 * can freely switch between `linear-gradient`, `radial-gradient`, and
 * `conic-gradient` variants.
 *
 * @param props.value    - Current CSS gradient string.
 * @param props.onChange - Callback fired when the gradient changes.
 */
const GradientSelect: React.FC<GradientSelectProps> = ({
    value,
    onChange,
}): ReactElement => {
    const debouncedOnChange = useDebouncedCallback(onChange, 100);

    return (
        <DropdownReveal
            className={`${CSS.GradientSelect} GradientSelect`}
            placeholder={value}
            title="Edit Gradient Value"
            closeOnChange={false}
            toggleColor={value}
        >
            <ColorPicker
                hidePresets={true}
                hideColorGuide={true}
                hideAdvancedSliders={true}
                hideEyeDrop={true}
                value={value}
                onChange={(gradient) => debouncedOnChange(gradient)}
            />
        </DropdownReveal>
    );
};

GradientSelect.displayName = "GradientSelect";
export default memo(GradientSelect);
