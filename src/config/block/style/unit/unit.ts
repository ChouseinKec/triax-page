// Types
import type { UnitDefinition } from '@/src/core/block/style/types';

/**
 * A lookup table of all supported CSS units and their metadata.
 * Each entry is a UnitDefinition object describing the unit's key, category, and support status.
 */
export const UNIT_DEFINITIONS: UnitDefinition[] = [
	{
		key: 'fr',
		default: '0fr',
		type: 'flex',
	},
	{
		key: 'px',
		default: '0px',
		type: 'length',
	},
	{
		key: 'em',
		default: '0em',
		type: 'length',
	},
	{
		key: 'rem',
		default: '0rem',
		type: 'length',
	},
	{
		key: 'vh',
		default: '0vh',
		type: 'length',
	},
	{
		key: 'vw',
		default: '0vw',
		type: 'length',
	},
	{
		key: 'vmax',
		default: '0vmax',
		type: 'length',
	},
	{
		key: 'vmin',
		default: '0vmin',
		type: 'length',
	},
	{
		key: 'deg',
		default: '0deg',
		type: 'angle',
	},
	{
		key: 'grad',
		default: '0grad',
		type: 'angle',
	},
	{
		key: 'rad',
		default: '0rad',
		type: 'angle',
	},
	{
		key: 'turn',
		default: '0turn',
		type: 'angle',
	},
	{
		key: '%',
		default: '0%',
		type: 'percentage',
	},
];
