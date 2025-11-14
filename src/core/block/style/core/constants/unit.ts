// Types
import type { UnitKeys, UnitDefinition, UnitTypes, OptionDimensionDefinition } from '@/src/core/block/style/core/types';
import unitsData from './units.json';

/**
 * A lookup table of all supported CSS units and their metadata.
 * Each entry is a UnitDefinition object describing the unit's name, category, and support status.
 */
export const UNIT_DEFINITIONS: Partial<Record<UnitKeys, UnitDefinition>> = unitsData as Partial<Record<UnitKeys, UnitDefinition>>;

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
