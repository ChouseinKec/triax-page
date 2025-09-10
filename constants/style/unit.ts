import { UnitKeys, UnitDefinition } from '@/editors/block/types/core/style/unit';
import { UnitTypes } from '@/editors/block/types/core/style/unit';
import { OptionDimensionDefinition } from '@/editors/block/types/core/style/option';

/**
 * Helper function to create a UnitDefinition object.
 * @param name - The canonical name of the unit (e.g. 'px', 'em').
 * @param category - The category of the unit (e.g.  'absolute').
 * @param supported - The support status of the unit (e.g. 'widely', 'not widely').
 * @returns A UnitDefinition object with all metadata fields populated.
 */
export function createUnit(name: UnitKeys, type: UnitTypes): UnitDefinition {
	return {
		type,
		name,
		value: `0${name}`,
	};
}

/**
 * Helper function to create an OptionDimensionDefinition object for a CSS unit.
 * Used for populating dropdowns, radio selects, etc. with dimension options.
 *
 * @param name - The canonical name of the unit (e.g. 'px', 'em').
 * @returns An OptionDimensionDefinition object with name, value, and category: 'dimension'.
 */
export function createUnitOption(name: UnitKeys): OptionDimensionDefinition {
	return {
		name,
		value: `0${name}`,
		category: 'dimension',
		type: 'dimension',
	};
}

/**
 * A lookup table of all supported CSS units and their metadata.
 * Each entry is a UnitDefinition object describing the unit's name, category, and support status.
 */
export const UnitDefinitions: Partial<Record<UnitKeys, UnitDefinition>> = {
	fr: createUnit('fr', 'flex'),
	px: createUnit('px', 'length'),
	em: createUnit('em', 'length'),
	rem: createUnit('rem', 'length'),
	vh: createUnit('vh', 'length'),
	vw: createUnit('vw', 'length'),
	vmax: createUnit('vmax', 'length'),
	vmin: createUnit('vmin', 'length'),

	deg: createUnit('deg', 'angle'),
	grad: createUnit('grad', 'angle'),
	rad: createUnit('rad', 'angle'),
	turn: createUnit('turn', 'angle'),

	'%': createUnit('%', 'percentage'),
} as const;

/**
 * UnitOptionsByType: Maps each UnitTypes value to an array of OptionDimensionDefinition objects for UI selection.
 *
 * This is used to group units by their dimension group (e.g., 'length', 'angle', 'percentage', 'flex').
 * Each key is a UnitTypes value, and the value is an array of OptionDimensionDefinition objects for that group.
 */
export const UnitOptionsByType: Record<UnitTypes, OptionDimensionDefinition[]> = Object.entries(UnitDefinitions).reduce((acc, [unit, def]) => {
	if (def?.type) {
		if (!acc[def.type]) acc[def.type] = [];
		acc[def.type].push(createUnitOption(unit as UnitKeys));
	}
	return acc;
}, {} as Record<UnitTypes, OptionDimensionDefinition[]>);
