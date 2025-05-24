import { STYLE_VALUE } from '@/editors/style/constants/types';

/* --------------- LENGTH --------------- */
const createUnit = (name: string, value: string = name): STYLE_VALUE => ({
	name,
	value,
	syntax: 'length',
	category: 'length',
});

// Linear
const unit_px: STYLE_VALUE = createUnit('px');
const unit_perce: STYLE_VALUE = createUnit('%');
const unit_em: STYLE_VALUE = createUnit('em');
const unit_rem: STYLE_VALUE = createUnit('rem');
const unit_ch: STYLE_VALUE = createUnit('ch');
const unit_vw: STYLE_VALUE = createUnit('vw');
const unit_vh: STYLE_VALUE = createUnit('vh');
const unit_vmin: STYLE_VALUE = createUnit('vmin');
const unit_vmax: STYLE_VALUE = createUnit('vmax');
const unit_fr: STYLE_VALUE = createUnit('fr');

// Angle
const unit_deg: STYLE_VALUE = createUnit('deg');
const unit_rad: STYLE_VALUE = createUnit('rad');
const unit_turn: STYLE_VALUE = createUnit('turn');
const unit_grad: STYLE_VALUE = createUnit('grad');

// Variable
const variable: STYLE_VALUE = {
	name: 'var()',
	value: 'var(--placeholder)',
	syntax: 'variable',
	category: 'function',
};

/* --------------- KEYWORD --------------- */
const createKeyword = (name: string, value: string = name): STYLE_VALUE => ({
	name,
	value,
	syntax: 'keyword',
	category: 'keyword',
});

// Layout Keywords
const keyword_auto: STYLE_VALUE = createKeyword('auto');
const keyword_mincontent: STYLE_VALUE = createKeyword('min-content');
const keyword_maxcontent: STYLE_VALUE = createKeyword('max-content');
const keyword_fitcontent: STYLE_VALUE = createKeyword('fit-content');

// Special Keywords
const keyword_subgrid: STYLE_VALUE = createKeyword('subgrid');
const keyword_masonry: STYLE_VALUE = createKeyword('masonry');
const keyword_eachline: STYLE_VALUE = createKeyword('each-line');
const keyword_hanging: STYLE_VALUE = createKeyword('hanging');
const keyword_normal: STYLE_VALUE = createKeyword('normal');

const keyword_top: STYLE_VALUE = createKeyword('top');
const keyword_right: STYLE_VALUE = createKeyword('right');
const keyword_bottom: STYLE_VALUE = createKeyword('bottom');
const keyword_left: STYLE_VALUE = createKeyword('left');
const keyword_center: STYLE_VALUE = createKeyword('center');

// Global Keywords
const keyword_initial: STYLE_VALUE = createKeyword('initial');
const keyword_inherit: STYLE_VALUE = createKeyword('inherit');
const keyword_unset: STYLE_VALUE = createKeyword('unset');
const keyword_revert: STYLE_VALUE = createKeyword('revert');
const keyword_revertlayer: STYLE_VALUE = createKeyword('revert-layer');

/* --------------- FUNCTION --------------- */
// Math Functions
const function_min: STYLE_VALUE = {
	name: 'min()',
	value: 'min(0px,0px)',
	syntax: 'function(length,length)',
	category: 'function',
	lengths: [
		// HACK TO KEEP THE LINES
		unit_px,
		unit_perce,
		unit_em,
		unit_rem,
		unit_ch,
		unit_vw,
		unit_vh,
		unit_vmin,
		unit_vmax,

		variable,
	],
};
const function_max: STYLE_VALUE = {
	name: 'max()',
	value: 'max(0px,0px)',
	syntax: 'function(length,length)',
	category: 'function',
	lengths: [
		// HACK TO KEEP THE LINES
		unit_px,
		unit_perce,
		unit_em,
		unit_rem,
		unit_ch,
		unit_vw,
		unit_vh,
		unit_vmin,
		unit_vmax,

		variable,
	],
};
const function_clamp: STYLE_VALUE = {
	name: 'clamp()',
	value: 'clamp(0px,0px,0px)',
	syntax: 'function(length,length,length)',
	category: 'function',
	lengths: [
		// HACK TO KEEP THE LINES
		unit_px,
		unit_perce,
		unit_em,
		unit_rem,
		unit_ch,
		unit_vw,
		unit_vh,
		unit_vmin,
		unit_vmax,
		function_min,
		function_max,

		variable,
	],
};
const function_calc: STYLE_VALUE = {
	name: 'calc()',
	value: 'calc(0px + 0px)',
	syntax: 'expression',
	category: 'function',
};

// Grid Functions
const function_minmax: STYLE_VALUE = {
	name: 'minmax()',
	value: 'minmax(0px,0px)',
	syntax: 'function(length,length)',
	category: 'function',
	lengths: [
		// HACK TO KEEP THE LINES
		unit_fr,
		unit_px,
		unit_perce,
		unit_em,
		unit_rem,
		unit_ch,
		unit_vw,
		unit_vh,
		unit_vmin,
		unit_vmax,

		keyword_auto,
		keyword_mincontent,
		keyword_maxcontent,

		function_min,
		function_max,
		function_clamp,
		function_calc,

		variable,
	],
};
const function_fitcontent: STYLE_VALUE = {
	name: 'fit-content()',
	value: 'fit-content(0px)',
	syntax: 'function(length)',
	category: 'function',
	lengths: [
		// HACK TO KEEP THE LINES
		unit_px,
		unit_perce,
		unit_em,
		unit_rem,
		unit_ch,
		unit_vw,
		unit_vh,
		unit_vmin,
		unit_vmax,
	],
};
const function_repeat: STYLE_VALUE = {
	name: 'repeat()',
	value: 'repeat(1,0px)',
	syntax: 'function(number,length)',
	category: 'function',
	lengths: [
		// HACK TO KEEP THE LINES
		unit_fr,
		unit_px,
		unit_perce,
		unit_em,
		unit_rem,
		unit_ch,
		unit_vw,
		unit_vh,
		unit_vmin,
		unit_vmax,

		keyword_mincontent,
		keyword_maxcontent,

		function_minmax,
		function_fitcontent,

		variable,
	],
};

// Transform Functions
const function_translatex: STYLE_VALUE = {
	name: 'translateX()',
	value: 'translateX(0px)',
	syntax: 'function(length)',
	category: 'function',
	lengths: [
		// HACK TO KEEP THE LINES
		unit_px,
		unit_perce,
		unit_em,
		unit_rem,
		unit_ch,
		unit_vw,
		unit_vh,
		unit_vmin,
		unit_vmax,
		variable,
	],
};
const function_translatey: STYLE_VALUE = {
	name: 'translateY()',
	value: 'translateY(0px)',
	syntax: 'function(length)',
	category: 'function',
	lengths: [
		// HACK TO KEEP THE LINES
		unit_px,
		unit_perce,
		unit_em,
		unit_rem,
		unit_ch,
		unit_vw,
		unit_vh,
		unit_vmin,
		unit_vmax,
		variable,
	],
};
const function_translatez: STYLE_VALUE = {
	name: 'translateZ()',
	value: 'translateZ(0px)',
	syntax: 'function(length)',
	category: 'function',
	lengths: [
		// HACK TO KEEP THE LINES
		unit_px,
		unit_perce,
		unit_em,
		unit_rem,
		unit_ch,
		unit_vw,
		unit_vh,
		unit_vmin,
		unit_vmax,
		variable,
	],
};
const function_rotatex: STYLE_VALUE = {
	name: 'rotateX()',
	value: 'rotateX(0deg)',
	syntax: 'function(length)',
	category: 'function',
	lengths: [
		// HACK TO KEEP THE LINES
		unit_deg,
		unit_rad,
		variable,
	],
};
const function_rotatey: STYLE_VALUE = {
	name: 'rotateY()',
	value: 'rotateY(0deg)',
	syntax: 'function(length)',
	category: 'function',
	lengths: [
		// HACK TO KEEP THE LINES
		unit_deg,
		unit_rad,
		variable,
	],
};
const function_rotatez: STYLE_VALUE = {
	name: 'rotateZ()',
	value: 'rotateZ(0deg)',
	syntax: 'function(length)',
	category: 'function',
	lengths: [
		// HACK TO KEEP THE LINES
		unit_deg,
		unit_rad,
		variable,
	],
};
const function_scalex: STYLE_VALUE = {
	name: 'scaleX()',
	value: 'scaleX(1)',
	syntax: 'function(number)',
	category: 'function',
};
const function_scaley: STYLE_VALUE = {
	name: 'scaleY()',
	value: 'scaleY(1)',
	syntax: 'function(number)',
	category: 'function',
};
const function_scalez: STYLE_VALUE = {
	name: 'scaleZ()',
	value: 'scaleZ(1)',
	syntax: 'function(number)',
	category: 'function',
};

const LENGTH: Record<string, Record<string, STYLE_VALUE>> = {
	linear: {
		px: unit_px,
		perce: unit_perce,
		em: unit_em,
		rem: unit_rem,
		ch: unit_ch,
		vw: unit_vw,
		vh: unit_vh,
		vmin: unit_vmin,
		vmax: unit_vmax,
		fr: unit_fr,
		var: variable,
	},

	angle: {
		deg: unit_deg,
		rad: unit_rad,
		turn: unit_turn,
		grad: unit_grad,
	},
};

const KEYWORDS: Record<string, Record<string, STYLE_VALUE>> = {
	special: {
		auto: keyword_auto,
		minContent: keyword_mincontent,
		maxContent: keyword_maxcontent,
		fitContent: keyword_fitcontent,

		subgrid: keyword_subgrid,
		masonry: keyword_masonry,
		eachLine: keyword_eachline,
		hanging: keyword_hanging,
		normal: keyword_normal,

		top: keyword_top,
		right: keyword_right,
		bottom: keyword_bottom,
		left: keyword_left,
		center: keyword_center,
	},

	global: {
		initial: keyword_initial,
		inherit: keyword_inherit,
		unset: keyword_unset,
		revert: keyword_revert,
		revertLayer: keyword_revertlayer,
	},
};

const FUNCTIONS: Record<string, Record<string, STYLE_VALUE>> = {
	math: {
		min: function_min,
		max: function_max,
		clamp: function_clamp,
		calc: function_calc,
	},

	grid: {
		minmax: function_minmax,
		fitContent: function_fitcontent,
		repeat: function_repeat,
	},

	transform: {
		translateX: function_translatex,
		translateY: function_translatey,
		translateZ: function_translatez,
		rotateX: function_rotatex,
		rotateY: function_rotatey,
		rotateZ: function_rotatez,
		scaleX: function_scalex,
		scaleY: function_scaley,
		scaleZ: function_scalez,
	},
};

export const LENGTHS = {
	scalable: LENGTH,
	keywords: KEYWORDS,
	functions: FUNCTIONS,
} as const;
