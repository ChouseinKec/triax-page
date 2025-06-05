import { useCallback, ReactElement } from 'react';

import { CSSPropertyDefs, PropertyKeys } from '@/constants/style/property'
import { Property } from '@/types/style/property';


interface STYLE_FACTORY {
	// renderFlexView: () => ReactElement;
	// renderGridView: () => ReactElement;

	// LengthInput: (property: STYLE_PROPERTIES) => ReactElement;
	// InputGroup: (property: STYLE_PROPERTIES, separator: string) => ReactElement;
	// NumberInput: (property: STYLE_PROPERTIES) => ReactElement;
	// DropdownSelect: (property: STYLE_PROPERTIES) => ReactElement;
	// ColorSelect: (property: STYLE_PROPERTIES) => ReactElement;
	// RadioSelect: (property: STYLE_PROPERTIES) => ReactElement;
	// renderPositionSelect: (onChangeSide: (value: POSITION_SELECT_SIDE) => void, onChangeCorner: (value: POSITION_SELECT_CORNER) => void, areCornersVisible?: boolean,) => ReactElement;

	// UrlInput: (property: STYLE_PROPERTIES, prefix?: string, suffix?: string) => ReactElement;
	// VariantInput: (property: STYLE_PROPERTIES, separator: string) => ReactElement;

	Syntax: (property: PropertyKeys) => ReactElement;
}


/**
 * A custom hook that provides helper functions for rendering property-related components.
 * These helpers prevent duplication and provide a consistent way to render inputs, selects, and dynamic groups.
 * 
 * @returns {Object} An object containing helper functions for rendering property inputs (InputGroup, NumberInput, etc.)
 * 
 * @example
 * const { LengthInput, getStyle } = useStyleFactory();
 * 
 * // In your component:
 * LengthInput('width');
 */
export const useStyleFactory = (): STYLE_FACTORY => {

	const Syntax = useCallback<STYLE_FACTORY['Syntax']>((property) => {

		console.log("HOLA");
		// console.log(splitTopLevel(syntax || '', '|'));

		return <p>asdasd</p>;


	}, [])




	return {
		// renderFlexView,
		// renderGridView,
		// InputGroup,
		// NumberInput,
		// DropdownSelect,
		// ColorSelect,
		// RadioSelect,
		// LengthInput,
		// renderPositionSelect,
		// UrlInput,
		// VariantInput,
		Syntax
	};


};