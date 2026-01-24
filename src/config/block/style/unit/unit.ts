// Types
import type { UnitDefinition } from '@/core/block/style/types';

/**
 * A lookup table of all supported CSS units and their metadata.
 * Each entry is a UnitDefinition object describing the unit's key, category, and support status.
 */
export const UNIT_DEFINITIONS: UnitDefinition[] = [
	{
		key: 'fr',
		type: 'flex',
	},
	{
		key: 'px',
		type: 'length',
	},
	{
		key: 'em',
		type: 'length',
	},
	{
		key: 'rem',
		type: 'length',
	},
	{
		key: 'vh',
		type: 'length',
	},
	{
		key: 'vw',
		type: 'length',
	},
	{
		key: 'vmax',
		type: 'length',
	},
	{
		key: 'vmin',
		type: 'length',
	},
	{
		key: 'deg',
		type: 'angle',
	},
	{
		key: 'grad',
		type: 'angle',
	},
	{
		key: 'rad',
		type: 'angle',
	},
	{
		key: 'turn',
		type: 'angle',
	},
	{
		key: '%',
		type: 'percentage',
	},
];
