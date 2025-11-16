// Types
import type { UnitKeys, UnitDefinition, UnitTypes, OptionDimensionDefinition } from '@/src/core/block/style/types';

/**
 * A lookup table of all supported CSS units and their metadata.
 * Each entry is a UnitDefinition object describing the unit's name, category, and support status.
 */
export const UNIT_DEFINITIONS: Partial<Record<UnitKeys, UnitDefinition>> = {
	fr: { type: 'flex', name: 'fr', value: '0fr' },
	px: { type: 'length', name: 'px', value: '0px' },
	em: { type: 'length', name: 'em', value: '0em' },
	rem: { type: 'length', name: 'rem', value: '0rem' },
	vh: { type: 'length', name: 'vh', value: '0vh' },
	vw: { type: 'length', name: 'vw', value: '0vw' },
	vmax: { type: 'length', name: 'vmax', value: '0vmax' },
	vmin: { type: 'length', name: 'vmin', value: '0vmin' },
	deg: { type: 'angle', name: 'deg', value: '0deg' },
	grad: { type: 'angle', name: 'grad', value: '0grad' },
	rad: { type: 'angle', name: 'rad', value: '0rad' },
	turn: { type: 'angle', name: 'turn', value: '0turn' },
	'%': { type: 'percentage', name: '%', value: '0%' },
} as Partial<Record<UnitKeys, UnitDefinition>>;

/**
 * UNIT_OPTIONS: Maps each UnitTypes value to an array of OptionDimensionDefinition objects for UI selection.
 *
 * This is used to group units by their dimension group (e.g., 'length', 'angle', 'percentage', 'flex').
 * Each key is a UnitTypes value, and the value is an array of OptionDimensionDefinition objects for that group.
 */
export const UNIT_OPTIONS: Record<UnitTypes, OptionDimensionDefinition[]> = Object.entries(UNIT_DEFINITIONS).reduce((acc, [unit, def]) => {
	if (def?.type) {
		if (!acc[def.type]) acc[def.type] = [];
		acc[def.type].push({
			name: unit as UnitKeys,
			value: def.value,
			category: 'dimension',
			type: 'dimension',
		});
	}
	return acc;
}, {} as Record<UnitTypes, OptionDimensionDefinition[]>);
