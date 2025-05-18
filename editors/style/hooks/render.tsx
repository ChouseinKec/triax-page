import { useCallback, ReactElement } from 'react';

// Components
import LengthInput from '@/components/Input/Length/component';
import InputGroup from '@/components/Group/Input/component';
import NumberInput from '@/components/Input/Number/component';
import ColorSelect from '@/components/Select/Color/component';
import RadioSelect from '@/components/Select/Radio/component';
import DropdownSelect from '@/components/Select/Dropdown/component';
import PositionSelect from '@/components/Select/Position/component';
import FlexView from '@/components/View/Flex/component';
import StringInput from '@/components/Input/String/component';

// Types
import { POSITION_SELECT_CORNER, POSITION_SELECT_SIDE } from '@/components/Select/Position/types';

// Utilities
import { getStyleOptions } from '@/editors/style/utilities/style'

// Constants
import { STYLES_CONSTANTS_KEY } from '@/editors/style/constants/styles';

// Store
import { useStyleState } from '@/editors/style/hooks/state';

interface STYLE_RENDER {
	renderFlexView: () => ReactElement;
	renderGridView: () => ReactElement;

	renderLengthInput: (style: STYLES_CONSTANTS_KEY) => ReactElement;
	renderInputGroup: (style: STYLES_CONSTANTS_KEY, separator: string) => ReactElement;
	renderNumberInput: (style: STYLES_CONSTANTS_KEY) => ReactElement;
	renderDropdownSelect: (style: STYLES_CONSTANTS_KEY) => ReactElement;
	renderColorSelect: (style: STYLES_CONSTANTS_KEY) => ReactElement;
	renderRadioSelect: (style: STYLES_CONSTANTS_KEY) => ReactElement;
	renderPositionSelect: (onChangeSide: (value: POSITION_SELECT_SIDE) => void, onChangeCorner: (value: POSITION_SELECT_CORNER) => void, areCornersVisible?: boolean,) => ReactElement;
}

/**
 * A custom hook that provides helper functions for rendering style-related components.
 * These helpers prevent duplication and provide a consistent way to render inputs, selects, and dynamic groups.
 * 
 * @returns {Object} An object containing helper functions for rendering style inputs (renderInputGroup, renderNumberInput, etc.)
 * 
 * @example
 * const { renderLengthInput, getSingleStyle } = useStyleRender();
 * 
 * // In your component:
 * renderLengthInput('width');
 */
export const useStyleRender = (): STYLE_RENDER => {
	const { getSingleStyle, setSingleStyle, getMultiStyle, setMultiStyle } = useStyleState();



	const renderFlexView = useCallback<STYLE_RENDER['renderFlexView']>(() => {
		return (
			<FlexView
				styles={{
					display: 'flex',
					flexDirection: getSingleStyle('flexDirection'),
					flexWrap: getSingleStyle('flexWrap'),
					justifyContent: getSingleStyle('justifyContent'),
					alignItems: getSingleStyle('alignItems'),
					alignContent: getSingleStyle('alignContent'),
				}}
			/>
		);
	},
		[getSingleStyle]
	);

	const renderGridView = useCallback<STYLE_RENDER['renderGridView']>(() => {
		return (
			<FlexView
				styles={{
					display: 'grid',
					flexDirection: getSingleStyle('flexDirection'),
					justifyContent: getSingleStyle('justifyContent'),
					justifyItems: getSingleStyle('justifyItems'),
					alignItems: getSingleStyle('alignItems'),
					alignContent: getSingleStyle('alignContent'),
					gridAutoFlow: getSingleStyle('gridAutoFlow'),
					gridTemplateColumns: getSingleStyle('gridTemplateColumns'),
					gridTemplateRows: getSingleStyle('gridTemplateRows'),
					gridAutoColumns: getSingleStyle('gridAutoColumns'),
					gridAutoRows: getSingleStyle('gridAutoRows'),
				}}
			/>
		);
	},
		[getSingleStyle]
	);

	/**
	 * Renders a length input for a given style property
	 * @param {STYLES_CONSTANTS_KEY} style - The style property to render
	 * @returns {React.ReactElement} The rendered length input
	 */
	const renderLengthInput = useCallback<STYLE_RENDER['renderLengthInput']>((style) => {
		const options = getStyleOptions(style);
		if (!options) { throw new Error(`No options available for style '${style}'`); }

		return (
			<LengthInput
				value={getSingleStyle(style)}
				onChange={(value) => setSingleStyle(style, value)}
				options={options}
			/>
		);
	},
		[getSingleStyle, setSingleStyle]
	);

	/**
	 * Renders a dynamic value group for a given style property
	 * @param {STYLES_CONSTANTS_KEY} style - The style property to render
	 * @param {string} separator - The separator used to split multi-values
	 * @returns {React.ReactElement} The rendered input group or error fallback
	 */
	const renderInputGroup = useCallback<STYLE_RENDER['renderInputGroup']>((style, separator) => {
		const options = getStyleOptions(style);
		if (!options) {
			throw new Error(`Style '${style}' is not supported for input groups`);
		}

		return (
			<InputGroup
				values={getMultiStyle(style, separator)}
				onChange={(value, index) => setMultiStyle(style, value, index, separator)}
				options={options}
			/>
		);
	},
		[getMultiStyle, setMultiStyle]
	);

	/**
	 * Renders a number input for a given style property
	 * @param {STYLES_CONSTANTS_KEY} style - The style property to render
	 * @returns {React.ReactElement} The rendered number input
	 */
	const renderNumberInput = useCallback<STYLE_RENDER['renderNumberInput']>((style) => {
		return (
			<NumberInput
				value={getSingleStyle(style)}
				onChange={(value) => setSingleStyle(style, value)}
			/>
		);
	},
		[getSingleStyle, setSingleStyle]
	);

	/**
	 * Renders a dropdown select for a given style property
	 * @param {STYLES_CONSTANTS_KEY} style - The style property to render
	 * @returns {React.ReactElement} The rendered dropdown select
	 */
	const renderDropdownSelect = useCallback<STYLE_RENDER['renderDropdownSelect']>((style) => {
		const options = getStyleOptions(style);
		if (!options) {
			throw new Error(`No options available for style '${style}'`);
		}

		return (
			<DropdownSelect
				value={getSingleStyle(style)}
				onChange={(value) => setSingleStyle(style, value)}
				options={options}
			/>
		);
	},
		[getSingleStyle, setSingleStyle]
	);

	/**
	 * Renders a color select input for a given style property
	 * @param {STYLES_CONSTANTS_KEY} style - The style property to render
	 * @returns {React.ReactElement} The rendered color select
	 */
	const renderColorSelect = useCallback<STYLE_RENDER['renderColorSelect']>((style) => {
		return (
			<ColorSelect
				placeholder="Color"
				value={getSingleStyle(style)}
				onChange={(value) => setSingleStyle(style, value)}
			/>
		);
	},
		[getSingleStyle, setSingleStyle]
	);

	/**
	 * Renders a radio select input for a given style property
	 * @param {STYLES_CONSTANTS_KEY} style - The style property to render
	 * @returns {React.ReactElement} The rendered radio select
	 */
	const renderRadioSelect = useCallback<STYLE_RENDER['renderRadioSelect']>((style) => {
		const options = getStyleOptions(style);
		if (!options) { throw new Error(`No options available for style '${style}'`); }

		return (
			<RadioSelect
				options={options}
				value={getSingleStyle(style)}
				onChange={(value) => setSingleStyle(style, value)}
			/>
		);
	},
		[getSingleStyle, setSingleStyle]
	);

	/**
	 * Renders a position select component for choosing layout positions
	 * @param {boolean} [areCornersVisible=false] - Whether to show corner positions (top-left, top-right, etc.)
	 * @returns {React.ReactElement} The rendered position select component or error fallback UI
	 */
	const renderPositionSelect = useCallback<STYLE_RENDER['renderPositionSelect']>((onChangeSide, onChangeCorner, areCornersVisible = false,) => {
		return (
			<PositionSelect
				onChangeSide={onChangeSide}
				onChangeCorner={onChangeCorner}
				areCornersVisible={areCornersVisible}
			/>
		);
	},
		[]
	);



	return {
		renderFlexView,
		renderGridView,
		renderInputGroup,
		renderNumberInput,
		renderDropdownSelect,
		renderColorSelect,
		renderRadioSelect,
		renderLengthInput,
		renderPositionSelect,
	};
};