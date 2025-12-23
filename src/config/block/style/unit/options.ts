// Types
import type { UnitKey, UnitType, OptionDimensionDefinition } from '@/src/core/block/style/types';

// Definitions
import { STYLE_UNITS } from '@/src/config/block/style/unit/unit';

/**
 * UNIT_OPTIONS: Maps each UnitType value to an array of OptionDimensionDefinition objects for UI selection.
 *
 * This is used to group units by their dimension group (e.g., 'length', 'angle', 'percentage', 'flex').
 * Each key is a UnitType value, and the value is an array of OptionDimensionDefinition objects for that group.
 */
export const STYLE_UNIT_OPTIONS: Record<UnitType, OptionDimensionDefinition[]> = Object.entries(STYLE_UNITS).reduce((acc, [unit, def]) => {
	if (def?.type) {
		if (!acc[def.type]) acc[def.type] = [];
		acc[def.type].push({
			name: unit as UnitKey,
			value: def.value,
			category: 'dimension',
			type: 'dimension',
		});
	}
	return acc;
}, {} as Record<UnitType, OptionDimensionDefinition[]>);
