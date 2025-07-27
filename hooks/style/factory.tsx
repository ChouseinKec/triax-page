import { useCallback, ReactElement } from "react";

// Constants
import { StylePropertyDefinitions } from '@/constants/style/property';

// Types
import type { StylePropertyKeys } from '@/types/style/property';
import type { Side, Corner } from '@/components/select/position/types';

// Components
import Value from '@/editors/style/components/value/component';
import PositionSelect from '@/components/select/position/component';

// Store
import { useStyleManager } from '@/hooks/style/manager';

interface StyleFactory {
	/**
	 * Renders a Value component for a given style property.
	 * @param propertyName - The key of the style property to render.
	 * @returns The Value ReactElement or null if property is not defined.
	 */
	renderValue: (propertyName: StylePropertyKeys) => ReactElement | null;

	/**
	 * Renders a PositionSelect component for selecting sides/corners.
	 * @param setCurrentSide - Callback to set the current side.
	 * @param setCurrentCorner - Callback to set the current corner.
	 * @param isCornerSelectable - Whether corners are selectable.
	 * @param isCenterSelectable - Whether center is selectable.
	 * @returns The PositionSelect ReactElement.
	 */
	renderPositionSelect: (
		setCurrentSide: (side: Side) => void,
		setCurrentCorner: (corner: Corner) => void,
		isCornerSelectable: boolean,
		isCenterSelectable: boolean
	) => ReactElement;
}

/**
 * Custom hook providing factory functions to render style-related UI components.
 * Handles value changes and property lookups for style editing.
 *
 * @returns {StyleFactory} Object with renderValue and renderPositionSelect methods.
 */
export const useStyleFactory = (): StyleFactory => {
	const { getStyle, setStyle } = useStyleManager();

	/**
	 * Handles changes to a style property's value.
	 * @param propertyName - The style property key.
	 * @param value - The new value for the property.
	 */
	const handleValueChange = useCallback(
		(propertyName: StylePropertyKeys, value: string) => {
			if (typeof value !== 'string') {
				console.error(`Invalid value for property ${propertyName}:`, value);
				return;
			}
			// Reset style if value is empty string
			if (value === '') {
				setStyle(propertyName, '');
				return;
			}
			setStyle(propertyName, value);
		},
		[setStyle]
	);

	/**
	 * Renders a Value component for the given style property.
	 * @param propertyName - The style property key.
	 * @returns {ReactElement|null} The Value component or null if property is not defined.
	 */
	const renderValue = useCallback<StyleFactory['renderValue']>(
		(propertyName) => {
			const value = getStyle(propertyName);
			const property = StylePropertyDefinitions[propertyName];

			if (!property) {
				console.warn(`Property ${propertyName} is not defined in StylePropertyDefinitions`);
				return null;
			}

			const onChange = (val: string) => handleValueChange(propertyName, val);

			return <Value value={value} property={property} onChange={onChange} />;
		},
		[getStyle, handleValueChange]
	);

	/**
	 * Renders a PositionSelect component for selecting side/corner.
	 * @param setCurrentSide - Callback for side selection.
	 * @param setCurrentCorner - Callback for corner selection.
	 * @param isCornerSelectable - Whether corners are selectable.
	 * @param isCenterSelectable - Whether center is selectable.
	 * @returns {ReactElement} The PositionSelect component.
	 */
	const renderPositionSelect = useCallback<StyleFactory['renderPositionSelect']>(
		(setCurrentSide, setCurrentCorner, isCornerSelectable, isCenterSelectable) => (
			<PositionSelect
				onChangeSide={setCurrentSide}
				onChangeCorner={setCurrentCorner}
				isCornerSelectable={isCornerSelectable}
				isCenterSelectable={isCenterSelectable}
			/>
		),
		[]
	);

	return {
		renderValue,
		renderPositionSelect,
	};
};