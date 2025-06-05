import { useCallback, ReactElement } from 'react';

// Components
// import PositionSelect from '@/components/Select/Position/component';
// import FlexView from '@/components/View/Flex/component';

// Types
// import { POSITION_SELECT_CORNER, POSITION_SELECT_SIDE } from '@/components/Select/Position/types';

// Utilities
// import { getStyleOptions } from '@/utilities/style'

// Constants
// import { STYLE_PROPERTIES } from '@/editors/style/constants/styles';

// Store
import { useStyleManager } from '@/hooks/style/manager';

// Helpers
import Input from '@/hooks/style/hoc';


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

	Syntax: (property: STYLE_PROPERTIES) => ReactElement;
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
	// const { getStyle, setStyle, resetStyle, copyStyle, pasteStyle } = useStyleManager();

	// const actions = {
	// 	onChange: setStyle,
	// 	onReset: resetStyle,
	// 	onCopy: copyStyle,
	// 	onPaste: pasteStyle
	// };

	// const getOptions = useCallback((property: STYLE_PROPERTIES) => {
	// 	return getStyleOptions(property)
	// }, [getStyleOptions]
	// )

	// const renderFlexView = useCallback<STYLE_FACTORY['renderFlexView']>(() => {
	// 	return (
	// 		<FlexView
	// 			styles={{
	// 				display: 'flex',
	// 				flexDirection: getStyle('flexDirection'),
	// 				flexWrap: getStyle('flexWrap'),
	// 				justifyContent: getStyle('justifyContent'),
	// 				alignItems: getStyle('alignItems'),
	// 				alignContent: getStyle('alignContent'),
	// 			}}
	// 		/>
	// 	);
	// },
	// 	[getStyle]
	// );

	// const renderGridView = useCallback<STYLE_FACTORY['renderGridView']>(() => {
	// 	return (
	// 		<FlexView
	// 			styles={{
	// 				display: 'grid',
	// 				flexDirection: getStyle('flexDirection'),
	// 				justifyContent: getStyle('justifyContent'),
	// 				justifyItems: getStyle('justifyItems'),
	// 				alignItems: getStyle('alignItems'),
	// 				alignContent: getStyle('alignContent'),
	// 				gridAutoFlow: getStyle('gridAutoFlow'),
	// 				gridTemplateColumns: getStyle('gridTemplateColumns'),
	// 				gridTemplateRows: getStyle('gridTemplateRows'),
	// 				gridAutoColumns: getStyle('gridAutoColumns'),
	// 				gridAutoRows: getStyle('gridAutoRows'),
	// 			}}
	// 		/>
	// 	);
	// },
	// 	[getStyle]
	// );

	// /**
	//  * Renders a position select component for choosing layout positions
	//  * @param {boolean} [areCornersVisible=false] - Whether to show corner positions (top-left, top-right, etc.)
	//  * @returns {React.ReactElement} The rendered position select component or error fallback UI
	//  */
	// const renderPositionSelect = useCallback<STYLE_FACTORY['renderPositionSelect']>((onChangeSide, onChangeCorner, areCornersVisible = false,) => {
	// 	return (
	// 		<PositionSelect
	// 			onChangeSide={onChangeSide}
	// 			onChangeCorner={onChangeCorner}
	// 			areCornersVisible={areCornersVisible}
	// 		/>
	// 	);
	// },
	// 	[]
	// );

	// /**
	//  * Renders a length input for a given style property
	//  * @param {STYLE_PROPERTIES} property - The style property to render
	//  * @returns {React.ReactElement} The rendered length input
	//  */
	// const LengthInput = useCallback<STYLE_FACTORY['LengthInput']>((property) => {
	// 	return <Input actions={actions} type="length" property={property} value={getStyle(property)} />;
	// }, [getStyle, setStyle, copyStyle, resetStyle, pasteStyle]
	// );

	// /**
	//  * Renders a dynamic value group for a given style property
	//  * @param {STYLE_PROPERTIES} property - The style property to render
	//  * @param {string} separator - The separator used to split multi-values
	//  * @returns {React.ReactElement} The rendered input group or error fallback
	//  */
	// const InputGroup = useCallback<STYLE_FACTORY['InputGroup']>((property, separator) => {
	// 	return <Input actions={actions} type="group" property={property} value={getStyle(property)} separator={separator} />;
	// },
	// 	[getStyle, setStyle, getOptions]
	// );

	// /**
	//  * Renders a number input for a given style property
	//  * @param {STYLE_PROPERTIES} property - The style property to render
	//  * @returns {React.ReactElement} The rendered number input
	//  */
	// const NumberInput = useCallback<STYLE_FACTORY['NumberInput']>((property) => {
	// 	return <Input
	// 		actions={actions}
	// 		type="number"
	// 		property={property}
	// 		value={getStyle(property)}
	// 	/>;
	// },
	// 	[getStyle, setStyle, copyStyle, resetStyle, pasteStyle]
	// );

	// /**
	//  * Renders a dropdown select for a given style property
	//  * @param {STYLE_PROPERTIES} property - The style property to render
	//  * @returns {React.ReactElement} The rendered dropdown select
	//  */
	// const DropdownSelect = useCallback<STYLE_FACTORY['DropdownSelect']>((property) => {
	// 	return <Input actions={actions} type="dropdown" property={property} value={getStyle(property)} />;
	// },
	// 	[getStyle, setStyle]
	// );

	// /**
	//  * Renders a color select input for a given style property
	//  * @param {STYLE_PROPERTIES} property - The style property to render
	//  * @returns {React.ReactElement} The rendered color select
	//  */
	// const ColorSelect = useCallback<STYLE_FACTORY['ColorSelect']>((property) => {
	// 	return <Input actions={actions} type="color" property={property} value={getStyle(property)} />;
	// },
	// 	[setStyle, getStyle]
	// );

	// /**
	//  * Renders a radio select input for a given style property
	//  * @param {STYLE_PROPERTIES} property - The style property to render
	//  * @returns {React.ReactElement} The rendered radio select
	//  */
	// const RadioSelect = useCallback<STYLE_FACTORY['RadioSelect']>((property) => {
	// 	return <Input actions={actions} type="radio" property={property} value={getStyle(property)} />;
	// },
	// 	[setStyle, getStyle]
	// );

	// const UrlInput = useCallback<STYLE_FACTORY['UrlInput']>((property, prefix = '', suffix = '') => {
	// 	return <Input actions={actions} type="url" property={property} value={getStyle(property)} prefix={prefix} suffix={suffix} />;
	// },
	// 	[setStyle, getStyle]
	// );

	// /**
	//  * Renders a variant input for a given style property
	//  * @param {STYLE_PROPERTIES} property - The style property to render
	//  * @param {string} separator - The separator used for multi-value variants
	//  * @returns {React.ReactElement} The rendered variant input
	// */
	// const VariantInput = useCallback<STYLE_FACTORY['VariantInput']>((property, separator) => {
	// 	return <Input actions={actions} type="variant" property={property} value={getStyle(property)} separator={separator} />;
	// },
	// 	[setStyle, getStyle]
	// );


	const Syntax = useCallback<STYLE_FACTORY['Syntax']>((property) => {
		const options = getOptions(property);
		if (!options) {
			return <div>Error: No options available for property '{property}'</div>;
		}


		return <p>HOLA</p>

		// return (
		// 	<div>
		// 		{options.map((option, index) => (
		// 			<div key={index}>
		// 				<strong>{option.label}:</strong> {getStyle(property)}
		// 			</div>
		// 		))}
		// 	</div>
		// );

	},[])




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