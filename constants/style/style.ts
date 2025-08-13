import { StylePropertyKeys } from '@/types/style/property';

export const CSSShorthandsDefs: Partial<Record<StylePropertyKeys, StylePropertyKeys[]>> = {
	'border-width': ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],
	'border-color': ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'],
	'border-style': ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'],
	margin: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
	padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
	// Add more as needed
};
