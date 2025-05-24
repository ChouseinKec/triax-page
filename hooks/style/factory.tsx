import { useCallback, ReactElement, useRef, useEffect } from 'react';

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
import VariantInput, { VariantInputRef } from '@/components/Input/Variant/component';

// Types
import { POSITION_SELECT_CORNER, POSITION_SELECT_SIDE } from '@/components/Select/Position/types';

// Utilities
import { getStyleOptions } from '@/utilities/style'
import { devLog } from '@/utilities/dev';

// Constants
import { STYLES_CONSTANTS_KEY } from '@/editors/style/constants/styles';

// Store
import { useStyleManager } from '@/hooks/style/manager';
import { useToolbar } from '@/contexts/ToolbarContext';

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

	renderURLInput: (style: STYLES_CONSTANTS_KEY, prefix?: string, suffix?: string) => ReactElement;
	renderVariantInput: (style: STYLES_CONSTANTS_KEY, separator: string) => ReactElement;
}

/**
 * A custom hook that provides helper functions for rendering style-related components.
 * These helpers prevent duplication and provide a consistent way to render inputs, selects, and dynamic groups.
 * 
 * @returns {Object} An object containing helper functions for rendering style inputs (renderInputGroup, renderNumberInput, etc.)
 * 
 * @example
 * const { renderLengthInput, getStyle } = useStyleFactory();
 * 
 * // In your component:
 * renderLengthInput('width');
 */
export const useStyleFactory = (): STYLE_RENDER => {
	const { getStyle, setStyle } = useStyleManager();

	const getOptions = useCallback((style: STYLES_CONSTANTS_KEY) => {
		return getStyleOptions(style)
	}, [getStyleOptions]
	)

	const renderFlexView = useCallback<STYLE_RENDER['renderFlexView']>(() => {
		return (
			<FlexView
				styles={{
					display: 'flex',
					flexDirection: getStyle('flexDirection'),
					flexWrap: getStyle('flexWrap'),
					justifyContent: getStyle('justifyContent'),
					alignItems: getStyle('alignItems'),
					alignContent: getStyle('alignContent'),
				}}
			/>
		);
	},
		[getStyle]
	);

	const renderGridView = useCallback<STYLE_RENDER['renderGridView']>(() => {
		return (
			<FlexView
				styles={{
					display: 'grid',
					flexDirection: getStyle('flexDirection'),
					justifyContent: getStyle('justifyContent'),
					justifyItems: getStyle('justifyItems'),
					alignItems: getStyle('alignItems'),
					alignContent: getStyle('alignContent'),
					gridAutoFlow: getStyle('gridAutoFlow'),
					gridTemplateColumns: getStyle('gridTemplateColumns'),
					gridTemplateRows: getStyle('gridTemplateRows'),
					gridAutoColumns: getStyle('gridAutoColumns'),
					gridAutoRows: getStyle('gridAutoRows'),
				}}
			/>
		);
	},
		[getStyle]
	);

	/**
	 * Renders a length input for a given style property
	 * @param {STYLES_CONSTANTS_KEY} style - The style property to render
	 * @returns {React.ReactElement} The rendered length input
	 */
	const renderLengthInput = useCallback<STYLE_RENDER['renderLengthInput']>((style) => {
		const options = getOptions(style);
		if (!options) {
			devLog.error(`No options available for style '${style}'`);
			return <></>
		}

		const handleChange = useCallback((value: string) => {
			setStyle(style, value);
		}, [style, setStyle])


		return (
			<LengthInput
				value={getStyle(style)}
				onChange={handleChange}
				options={options}
			/>
		);
	},
		[getStyle, setStyle, getOptions]
	);

	/**
	 * Renders a dynamic value group for a given style property
	 * @param {STYLES_CONSTANTS_KEY} style - The style property to render
	 * @param {string} separator - The separator used to split multi-values
	 * @returns {React.ReactElement} The rendered input group or error fallback
	 */
	const renderInputGroup = useCallback<STYLE_RENDER['renderInputGroup']>((style, separator) => {
		const options = getOptions(style);
		if (!options) {
			devLog.error(`No options available for style '${style}'`);
			return <></>
		}

		const handleChange = useCallback((value: string) => {
			setStyle(style, value);
		}, [style, setStyle])



		return (
			<InputGroup
				value={getStyle(style)}
				separator={separator}
				onChange={handleChange}
				options={options}
			/>
		);
	},
		[getStyle, setStyle, getOptions]
	);

	/**
	 * Renders a number input for a given style property
	 * @param {STYLES_CONSTANTS_KEY} style - The style property to render
	 * @returns {React.ReactElement} The rendered number input
	 */
	const renderNumberInput = useCallback<STYLE_RENDER['renderNumberInput']>((style) => {
		const handleChange = useCallback((value: string) => {
			setStyle(style, value);
		}, [style, setStyle])

		return (
			<NumberInput
				value={getStyle(style)}
				onChange={handleChange}
			/>
		);
	},
		[getStyle, setStyle]
	);

	/**
	 * Renders a dropdown select for a given style property
	 * @param {STYLES_CONSTANTS_KEY} style - The style property to render
	 * @returns {React.ReactElement} The rendered dropdown select
	 */
	const renderDropdownSelect = useCallback<STYLE_RENDER['renderDropdownSelect']>((style) => {
		const options = getOptions(style);
		if (!options) {
			devLog.error(`No options available for style '${style}'`);
			return <></>
		}
		const handleChange = useCallback((value: string) => {
			setStyle(style, value);
		}, [style, setStyle])

		return (
			<DropdownSelect
				value={getStyle(style)}
				onChange={handleChange}
				options={options}
			/>
		);
	},
		[getStyle, setStyle, getOptions]
	);

	/**
	 * Renders a color select input for a given style property
	 * @param {STYLES_CONSTANTS_KEY} style - The style property to render
	 * @returns {React.ReactElement} The rendered color select
	 */
	const renderColorSelect = useCallback<STYLE_RENDER['renderColorSelect']>((style) => {
		const handleChange = useCallback((value: string) => {
			setStyle(style, value);
		}, [style, setStyle])

		return (
			<ColorSelect
				placeholder="Color"
				value={getStyle(style)}
				onChange={handleChange}
			/>
		);
	},
		[setStyle, getStyle]
	);

	/**
	 * Renders a radio select input for a given style property
	 * @param {STYLES_CONSTANTS_KEY} style - The style property to render
	 * @returns {React.ReactElement} The rendered radio select
	 */
	const renderRadioSelect = useCallback<STYLE_RENDER['renderRadioSelect']>((style) => {
		const options = getOptions(style);
		if (!options) {
			devLog.error(`No options available for style '${style}'`);
			return <></>
		}

		const handleChange = useCallback((value: string) => {
			setStyle(style, value);
		}, [style, setStyle])


		return (
			<RadioSelect
				options={options}
				value={getStyle(style)}
				onChange={handleChange}
			/>
		);
	},
		[setStyle, getStyle, getOptions]
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

	const renderURLInput = useCallback<STYLE_RENDER['renderURLInput']>((style, prefix = '', suffix = '') => {
		let value = getStyle(style);
		value = value.replace(prefix, '').replace(suffix, '');

		const handleChange = useCallback((value: string) => {
			const _value = value.length === 0 ? '' : `${prefix}${value}${suffix}`;
			setStyle(style, _value)
		}, [style, setStyle, prefix, suffix])

		return (
			<StringInput
				value={value}
				onChange={handleChange}
				pattern={'url'}
			/>
		);
	},
		[setStyle, getStyle]
	);


	// ! Find a better solution for the internal useRef and useEffect.
	// ! Works for now,but not best practice.Create a wrapper component or custom hook
	const renderVariantInput = useCallback<STYLE_RENDER['renderVariantInput']>((style, separator) => {
		const options = getOptions(style);

		if (!options) {
			devLog.error(`No options available for style '${style}'`);
			return <></>
		}

		const variantInputRef = useRef<VariantInputRef>(null);
		const { addButton } = useToolbar();

		useEffect(() => {
			addButton(
				<button
					key={`${style}-variant-cycle`}
					onClick={() => variantInputRef.current?.cycleVariant()}
					title="Change Syntax"
				>
					⟳
				</button>
			);
		}, []);


		const handleChange = useCallback((value: string) => {
			return setStyle(style, value);
		}, [style, setStyle])


		return (
			<VariantInput
				ref={variantInputRef}
				value={getStyle(style)}
				onChange={handleChange}
				separator={separator}
				option={options[0]}
			/>

		);
	},
		[setStyle, getStyle]
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
		renderURLInput,
		renderVariantInput
	};


};