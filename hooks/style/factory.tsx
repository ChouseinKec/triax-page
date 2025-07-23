import { useCallback, ReactElement } from "react";

// Constantss
import { StylePropertyDefinitions } from '@/constants/style/property'

// Types
import type { StylePropertyKeys } from '@/types/style/property';
import type { Side, Corner } from '@/components/select/position/types';

// Components
import Value from '@/editors/style/components/value/component';
import DisplayView from '@/editors/style/components/view/flex/component';
import BackgroundView from '@/editors/style/components/view/background/component';
import PositionSelect from '@/components/select/position/component';
import TextView from '@/editors/style/components/view/text/component';
import PositionView from '@/editors/style/components/view/position/component';
import SizeView from '@/editors/style/components/view/size/component';

// Store
import { useStyleManager } from '@/hooks/style/manager';
import { useBlockManager } from "@/hooks/block/manager";

interface StyleFactory {
	renderValue: (propertyName: StylePropertyKeys) => ReactElement | null;
	renderDisplayView: () => ReactElement;
	renderBackgroundView: () => ReactElement;
	renderBorderView: () => ReactElement;
	renderTextView: () => ReactElement;
	renderPositionView: () => ReactElement;
	renderSizeView: () => ReactElement;
	renderPositionSelect: (setCurrentSide: (side: Side) => void, setCurrentCorner: (corner: Corner) => void, isCornerSelectable: boolean, isCenterSelectable: boolean) => ReactElement;
}

export const useStyleFactory = (): StyleFactory => {
	const { getStyle, setStyle } = useStyleManager();
	const { getSelectedBlock } = useBlockManager();

	const selectedBlock = getSelectedBlock();



	const handleValueChange = useCallback((propertyName: StylePropertyKeys, value: string) => {
		// If the value is not a string, log an error
		if (typeof value !== 'string') {
			console.error(`Invalid value for property ${propertyName}:`, value);
			return;
		}

		// If the value is an empty string, reset the style
		if (value === '') {
			setStyle(propertyName, '');
			return;
		}

		// Set the style with the new value
		setStyle(propertyName, value);
	},
		[setStyle]
	);

	const renderValue = useCallback<StyleFactory['renderValue']>((propertyName) => {
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

	const renderDisplayView = useCallback<StyleFactory['renderDisplayView']>(() => {
		const display = getStyle('display');

		return <DisplayView
			styles={{
				display: display === 'none' ? 'block' : display,
				flexDirection: getStyle('flex-direction'),
				flexWrap: getStyle('flex-wrap'),
				justifyContent: getStyle('justify-content'),
				alignItems: getStyle('align-items'),
				alignContent: getStyle('align-content'),

				justifyItems: getStyle('justify-items'),
				gridAutoFlow: getStyle('grid-auto-flow'),
				gridTemplateColumns: getStyle('grid-template-columns'),
				gridTemplateRows: getStyle('grid-template-rows'),
				gridAutoColumns: getStyle('grid-auto-columns'),
				gridAutoRows: getStyle('grid-auto-rows'),

				direction: getStyle('direction'),
				objectFit: getStyle('object-fit'),
				objectPosition: getStyle('object-position'),
				clear: getStyle('clear'),
				float: getStyle('float'),
			}}

		/>;
	}, [getStyle]
	);

	const renderBackgroundView = useCallback<StyleFactory['renderBackgroundView']>(() => {
		return <BackgroundView
			styles={{
				backgroundColor: getStyle('background-color'),
				backgroundImage: getStyle('background-image'),
				backgroundSize: getStyle('background-size'),
				backgroundPosition: getStyle('background-position'),
				backgroundRepeat: getStyle('background-repeat'),
				backgroundAttachment: getStyle('background-attachment'),
				backgroundClip: getStyle('background-clip'),
				backgroundOrigin: getStyle('background-origin'),
				backgroundBlendMode: getStyle('background-blend-mode'),

				maskImage: getStyle('mask-image'),
				maskPosition: getStyle('mask-position'),
				maskSize: getStyle('mask-size'),
				maskRepeat: getStyle('mask-repeat'),
				maskClip: getStyle('mask-clip'),
				maskOrigin: getStyle('mask-origin'),
				maskMode: getStyle('mask-mode'),
				maskType: getStyle('mask-type'),
				maskComposite: getStyle('mask-composite'),

			}} />
	}, [getStyle]
	);

	const renderBorderView = useCallback<StyleFactory['renderBorderView']>(() => {
		return <BackgroundView
			styles={{
				borderTopLeftRadius: getStyle('border-top-left-radius'),
				borderTopRightRadius: getStyle('border-top-right-radius'),
				borderBottomLeftRadius: getStyle('border-bottom-left-radius'),
				borderBottomRightRadius: getStyle('border-bottom-right-radius'),
				borderTopStyle: getStyle('border-top-style'),
				borderTopWidth: getStyle('border-top-width'),
				borderTopColor: getStyle('border-top-color'),
				borderRightStyle: getStyle('border-right-style'),
				borderRightWidth: getStyle('border-right-width'),
				borderRightColor: getStyle('border-right-color'),
				borderBottomStyle: getStyle('border-bottom-style'),
				borderBottomWidth: getStyle('border-bottom-width'),
				borderBottomColor: getStyle('border-bottom-color'),
				borderLeftStyle: getStyle('border-left-style'),
				borderLeftWidth: getStyle('border-left-width'),
				borderLeftColor: getStyle('border-left-color'),
				outlineStyle: getStyle('outline-style'),
				outlineWidth: getStyle('outline-width'),
				outlineColor: getStyle('outline-color'),
				outlineOffset: getStyle('outline-offset'),
			}} />
	}, [getStyle]
	);

	const renderTextView = useCallback<StyleFactory['renderTextView']>(() => {
		return <TextView
			styles={{
				fontSize: getStyle('font-size'),
				fontWeight: getStyle('font-weight'),
				fontFamily: getStyle('font-family'),
				fontStyle: getStyle('font-style'),
				lineHeight: getStyle('line-height'),

				color: getStyle('color'),
				textAlign: getStyle('text-align'),
				textTransform: getStyle('text-transform'),
				textIndent: getStyle('text-indent'),
				textDecoration: getStyle('text-decoration'),
				textOrientation: getStyle('text-orientation'),
				textOverflow: getStyle('text-overflow'),
				textShadow: getStyle('text-shadow'),
				textAlignLast: getStyle('text-align-last'),
				textCombineUpright: getStyle('text-combine-upright'),

				letterSpacing: getStyle('letter-spacing'),
				wordBreak: getStyle('word-break'),
				lineBreak: getStyle('line-break'),
				whiteSpace: getStyle('white-space'),
				writingMode: getStyle('writing-mode'),
				wordSpacing: getStyle('word-spacing'),

				columnCount: getStyle('column-count'),
				columnWidth: getStyle('column-width'),
				columnGap: getStyle('column-gap'),
				columnRuleWidth: getStyle('column-rule-width'),
				columnRuleStyle: getStyle('column-rule-style'),
				columnRuleColor: getStyle('column-rule-color'),
				breakBefore: getStyle('break-before'),
				breakInside: getStyle('break-inside'),
				breakAfter: getStyle('break-after'),
				columnSpan: getStyle('column-span'),
				columnFill: getStyle('column-fill'),
			}}
		/>;
	}, [getStyle]
	);

	const renderPositionView = useCallback<StyleFactory['renderPositionView']>(() => {
		return <PositionView
			styles={{
				position: getStyle('position'),
				top: getStyle('top'),
				right: getStyle('right'),
				bottom: getStyle('bottom'),
				left: getStyle('left'),

				paddingTop: getStyle('padding-top'),
				paddingRight: getStyle('padding-right'),
				paddingBottom: getStyle('padding-bottom'),
				paddingLeft: getStyle('padding-left'),

				marginTop: getStyle('margin-top'),
				marginRight: getStyle('margin-right'),
				marginBottom: getStyle('margin-bottom'),
				marginLeft: getStyle('margin-left'),

				zIndex: getStyle('z-index'),
			}}
		/>;
	}, [getStyle]
	);

	const renderPositionSelect = useCallback<StyleFactory['renderPositionSelect']>((setCurrentSide, setCurrentCorner, isCornerSelectable, isCenterSelectable) => {
		return (
			<PositionSelect
				onChangeSide={setCurrentSide}
				onChangeCorner={setCurrentCorner}
				isCornerSelectable={isCornerSelectable}
				isCenterSelectable={isCenterSelectable}
			/>
		);
	},
		[handleValueChange]
	);

	const renderSizeView = useCallback<StyleFactory['renderSizeView']>(() => {
		return <SizeView
			styles={{
				width: getStyle('width'),
				minWidth: getStyle('min-width'),
				maxWidth: getStyle('max-width'),

				height: getStyle('height'),
				minHeight: getStyle('min-height'),
				maxHeight: getStyle('max-height'),

				aspectRatio: getStyle('aspect-ratio'),
				overflow: getStyle('overflow'),
				objectFit: getStyle('object-fit'),
			}} />;

	}, [getStyle]
	);

	return {
		renderValue,
		renderDisplayView,
		renderBackgroundView,
		renderBorderView,
		renderTextView,
		renderPositionView,
		renderPositionSelect,
		renderSizeView,
	};


};