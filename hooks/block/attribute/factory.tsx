import { useCallback, ReactElement } from 'react';

// Constants
import { HTMLPropertyDefinitions } from '@/constants/block/attribute';
// Types
import type { HTMLPropertyKey } from '@/types/block/attribute/property';

// Components
import Value from '@/editors/block/components/attribute/value/component';

// Store
import { useAttributeManager } from '@/hooks/block/attribute/manager';

interface StyleFactory {
	/**
	 * Renders a Value component for a given style property.
	 * @param propertyName - The key of the style property to render.
	 * @returns The Value ReactElement or null if property is not defined.
	 */
	renderValue: (propertyName: HTMLPropertyKey) => ReactElement | null;
}

/**
 * Custom hook providing factory functions to render style-related UI components.
 * Handles value changes and property lookups for style editing.
 *
 * @returns {StyleFactory} Object with renderValue and renderPositionSelect methods.
 */
export const useAttributeFactory = (): StyleFactory => {
	const { getAttribute, setAttribute } = useAttributeManager();

	/**
	 * Handles changes to a style property's value.
	 * @param propertyName - The style property key.
	 * @param value - The new value for the property.
	 */
	const handleValueChange = useCallback(
		(propertyName: HTMLPropertyKey, value: string) => {
			if (typeof value !== 'string') {
				console.error(`Invalid value for property ${propertyName}:`, value);
				return;
			}
			// Reset attribute if value is empty string
			if (value === '') {
				setAttribute(propertyName, '');
				return;
			}
			setAttribute(propertyName, value);
		},
		[setAttribute]
	);

	/**
	 * Renders a Value component for the given style property.
	 * @param propertyName - The style property key.
	 * @returns {ReactElement|null} The Value component or null if property is not defined.
	 */
	const renderValue = useCallback<StyleFactory['renderValue']>(
		(propertyName) => {
			const value = getAttribute(propertyName);
			const property = HTMLPropertyDefinitions[propertyName];

			if (!property) {
				console.error(`Property ${propertyName} is not defined in HTMLPropertyDefinitions`);
				return null;
			}

			const onChange = (val: string) => handleValueChange(propertyName, val);

			return <Value value={value} property={property} onChange={onChange} />;
		},
		[getAttribute, handleValueChange]
	);

	return {
		renderValue,
	};
};