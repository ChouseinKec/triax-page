"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import GradientSelect from "@/shared/components/select/gradient/component";
import SelectDropdown from "@/shared/components/select/dropdown/component";

// Types
import type { TerminalComponentProps } from "@/core/block/style/types";


/**
 * TokenGradient Component
 *
 * Terminal editor for CSS `<gradient>` values. Renders a `GradientSelect`
 * picker that lets the user visually build `linear-gradient`, `radial-gradient`,
 * and `conic-gradient` values. An optional type-switch dropdown is shown when
 * multiple terminal options are available for the current slot.
 *
 * @param props.value          - Current CSS gradient string.
 * @param props.options        - Available terminal options (for type switching).
 * @param props.onChangeValue  - Callback fired when the gradient value changes.
 * @param props.onChangeOption - Callback fired when the user switches terminal type.
 */
const TokenGradient: React.FC<TerminalComponentProps> = ({ value, options, onChangeValue, onChangeOption }) => {
	const hasOptions = options && options.length > 1;

	return (
		<div className={CSS.GradientValue}>
			<GradientSelect
				value={value}
				onChange={onChangeValue}
			/>

			{hasOptions && (
				<SelectDropdown
					options={options}
					value={"."}
					onChange={onChangeOption}
					searchable={true}
					groupable={true}
					title="Change Value Type"
				/>
			)}
		</div>
	);
};

TokenGradient.displayName = "TokenGradient";
export default memo(TokenGradient);
