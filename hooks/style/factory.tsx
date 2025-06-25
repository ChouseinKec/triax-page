import { useCallback, ReactElement } from 'react';

// Constantss
import { CSSPropertyDefs } from '@/constants/style/property'

// Types
import type { CSSProperties } from '@/types/style/property';
import type { Side, Corner } from '@/components/select/position/types';

// Components
import Value from '@/editors/style/components/value/component';
import FlexView from '@/components/view/flex/component';
import BackgroundView from '@/components/view/background/component';
import PositionSelect from '@/components/select/position/component';
import TextView from '@/components/view/text/component';
import PositionView from '@/components/view/position/component';

// Store
import { useStyleManager } from '@/hooks/style/manager';

interface StyleFactoryProps {
	renderValue: (propertyName: CSSProperties) => ReactElement | null;
	renderFlexView: () => ReactElement;
	renderGridView: () => ReactElement;
	renderBackgroundView: () => ReactElement;
	renderTextView: () => ReactElement;
	renderPositionView: () => ReactElement;
	renderPositionSelect: (setCurrentSide: (side: Side) => void, setCurrentCorner: (corner: Corner) => void, areCornersVisible: boolean) => ReactElement;
}


export const useStyleFactory = (): StyleFactoryProps => {
	const { getStyle, setStyle } = useStyleManager();


	const handleValueChange = useCallback(
		(propertyName: CSSProperties, value: string) => {
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

	const renderValue = useCallback<StyleFactoryProps['renderValue']>((propertyName) => {
		const value = getStyle(propertyName);
		const property = CSSPropertyDefs[propertyName];

		if (!property) {
			console.warn(`Property ${propertyName} is not defined in CSSPropertyDefs`);
			return null;
		}

		const onChange = (val: string) => handleValueChange(propertyName, val);

		return <Value value={value} property={property} onChange={onChange} />;
	},
		[getStyle, handleValueChange]
	);

	const renderFlexView = useCallback<StyleFactoryProps['renderFlexView']>(() => {
		return <FlexView

			styles={{
				display: 'flex',
				flexDirection: getStyle('flex-direction'),
				flexWrap: getStyle('flex-wrap'),
				justifyContent: getStyle('justify-content'),
				alignItems: getStyle('align-items'),
				alignContent: getStyle('align-content'),
				direction: getStyle('direction'),
			}}

		/>;
	}, [getStyle]
	);

	const renderGridView = useCallback<StyleFactoryProps['renderGridView']>(() => {
		return <FlexView
			styles={{
				display: 'grid',
				flexDirection: getStyle('flex-direction'),
				justifyContent: getStyle('justify-content'),
				justifyItems: getStyle('justify-items'),
				alignItems: getStyle('align-items'),
				alignContent: getStyle('align-content'),
				gridAutoFlow: getStyle('grid-auto-flow'),
				gridTemplateColumns: getStyle('grid-template-columns'),
				gridTemplateRows: getStyle('grid-template-rows'),
				gridAutoColumns: getStyle('grid-auto-columns'),
				gridAutoRows: getStyle('grid-auto-rows'),
				direction: getStyle('direction'),
			}}
		/>;
	}, [getStyle]
	);

	const renderBackgroundView = useCallback<StyleFactoryProps['renderBackgroundView']>(() => {
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
				outline: getStyle('outline'),
			}} />
	}, [getStyle]
	);

	const renderTextView = useCallback<StyleFactoryProps['renderTextView']>(() => {
		return <TextView
			styles={{
				fontSize: getStyle('font-size'),
				fontWeight: getStyle('font-weight'),
				lineHeight: getStyle('line-height'),
				fontFamily: getStyle('font-family'),
				color: getStyle('color'),
				textAlign: getStyle('text-align'),
				fontStyle: getStyle('font-style'),
				textTransform: getStyle('text-transform'),
				textDecoration: getStyle('text-decoration'),

				letterSpacing: getStyle('letter-spacing'),
				textIndent: getStyle('text-indent'),
				wordBreak: getStyle('word-break'),
				lineBreak: getStyle('line-break'),
				whiteSpace: getStyle('white-space'),
				textOverflow: getStyle('text-overflow'),
				writingMode: getStyle('writing-mode'),
				textOrientation: getStyle('text-orientation'),

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

	const renderPositionView = useCallback<StyleFactoryProps['renderPositionView']>(() => {
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

	const renderPositionSelect = useCallback<StyleFactoryProps['renderPositionSelect']>((setCurrentSide, setCurrentCorner, areCornersVisible) => {
		return (
			<PositionSelect
				onChangeSide={setCurrentSide}
				onChangeCorner={setCurrentCorner}
				areCornersVisible={areCornersVisible}
			/>
		);
	},
		[handleValueChange]
	);



	return {
		renderValue,
		renderFlexView,
		renderGridView,
		renderBackgroundView,
		renderTextView,
		renderPositionView,
		renderPositionSelect,
	};


};