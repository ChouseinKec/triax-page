import { useCallback, ReactElement } from 'react';

// Constantss
import { CSSPropertyDefs } from '@/constants/style/property'

// Types
import type { CSSProperties } from '@/types/style/property';

// Components
import Value from '@/editors/style/components/value/component';
import FlexView from '@/components/View/Flex/component';

// Store
import { useStyleManager } from '@/hooks/style/manager';

interface StyleFactoryProps {
	renderValue: (propertyName: CSSProperties) => ReactElement | null;
	renderFlexView: () => ReactElement;
	renderGridView: () => ReactElement;
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
			}}
		/>;
	}, [getStyle]);

	return {
		renderValue,
		renderFlexView,
		renderGridView,
	};


};