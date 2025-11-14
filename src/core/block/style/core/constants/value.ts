// Types
import type { StyleValueSeparator } from '@/src/core/block/style/core/types';

/**
 * Default function value mappings for CSS style properties.
 */
export const DEFAULT_VALUE_FUNCTIONS: Record<string, string> = {
	minmax: 'minmax(0px,0px)',
	'fit-content': 'fit-content(0px)',
	repeat: 'repeat(1,1fr)',
	translate3d: 'translate3d(0px,0px,0px)',
	rotate3d: 'rotate3d(0,0,0,0deg)',
	scale3d: 'scale3d(1.0,1.0,1.0)',
	skew: 'skew(0deg,0deg)',
	perspective: 'perspective(0px)',

	blur: 'blur(0px)',
	brightness: 'brightness(1.0)',
	contrast: 'contrast(1.0)',
	'drop-shadow': 'drop-shadow(0px 0px 0px #ffffff)',
	grayscale: 'grayscale(0.0)',
	'hue-rotate': 'hue-rotate(0deg)',
	invert: 'invert(0.0)',
	opacity: 'opacity(1.0)',
	saturate: 'saturate(1.0)',
	sepia: 'sepia(0.0)',

	url: 'url("https://example.com")',
};

/**
 * Default value separators for CSS style properties that accept multiple values.
 */
export const DEFAULT_VALUE_SEPARATORS: StyleValueSeparator[] = [' ', ',', '/'];
