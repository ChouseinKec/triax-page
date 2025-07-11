import { StyleUnitKeys, StyleUnitData } from '@/types/style/unit';
import { StyleUnitType } from '@/types/style/unit';
import { DimensionOptionData } from '@/types/option';

/**
 * Helper function to create a StyleUnitData object.
 * @param name - The canonical name of the unit (e.g. 'px', 'em').
 * @param category - The category of the unit (e.g.  'absolute').
 * @param supported - The support status of the unit (e.g. 'widely', 'not widely').
 * @returns A StyleUnitData object with all metadata fields populated.
 */
function createUnit(name: StyleUnitKeys, type: StyleUnitType): StyleUnitData {
	return {
		type,
		name,
		value: `0${name}`,
	};
}

/**
 * Helper function to create an DimensionOptionData object for a CSS unit.
 * Used for populating dropdowns, radio selects, etc. with dimension options.
 *
 * @param name - The canonical name of the unit (e.g. 'px', 'em').
 * @returns An DimensionOptionData object with name, value, and category: 'dimension'.
 */
function createUnitOption(name: StyleUnitKeys): DimensionOptionData {
	return {
		name,
		value: `0${name}`,
		category: 'dimension',
		type: 'dimension',
	};
}

/**
 * A lookup table of all supported CSS units and their metadata.
 * Each entry is a StyleUnitData object describing the unit's name, category, and support status.
 * Used for unit validation, UI dropdowns, and documentation.
 */
export const StyleUnitDefinitions: Partial<Record<string, StyleUnitData>> = {
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
};

/**
 * StyleUnitOptions: Maps each StyleUnitType value to an array of DimensionOptionData objects for UI selection.
 *
 * This is used to group units by their dimension group (e.g., 'length', 'angle', 'percentage', 'flex').
 * Each key is a StyleUnitType value, and the value is an array of DimensionOptionData objects for that group.
 */
export const StyleUnitOptions: Record<StyleUnitType, DimensionOptionData[]> = Object.entries(StyleUnitDefinitions).reduce((acc, [unit, def]) => {
	if (def?.type) {
		if (!acc[def.type]) acc[def.type] = [];
		acc[def.type].push(createUnitOption(unit as StyleUnitKeys));
	}
	return acc;
}, {} as Record<StyleUnitType, DimensionOptionData[]>);
